import { useState, useEffect, useCallback, useRef } from 'react'
import type { Course } from '@/data/mockData'
import { getHomeData } from '@/services/homepageService'

export function useHomepageData() {
  const [courses, setCourses] = useState<Course[]>([])
  const [numStudents, setNumStudents] = useState<number>(0);
  const [numCourses, setNumCourses] = useState<number>(0);
  const [numCompanies, setNumCompanies] = useState<number>(0);
  const [numTeachers, setNumTeachers] = useState<number>(0);

  // Refs para controle de requisições
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoad = useRef(true)
  const isUpdatingFromUrl = useRef(false)

  // Função para buscar cursos
  const fetchHomeData = useCallback(async (signal?: AbortSignal) => {

    try {
      const data = await getHomeData(signal)

      if (!signal?.aborted) {
        setCourses(data.cursos_recentes)
        setNumStudents(data.num_alunos)
        setNumCourses(data.num_cursos)
        setNumTeachers(data.num_professores)
        setNumCompanies(data.num_empresas)
      }
    } catch (err: any) {
      if (!signal?.aborted && err.name !== 'AbortError') {
        console.error('Erro na Home Page:', err)
        setCourses([])
      }
    }
  }, [])

  // Effect para buscar cursos com debounce
  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    const delay = isInitialLoad.current ? 0 : 500

    debounceTimeoutRef.current = setTimeout(() => {
      const abortController = new AbortController()
      abortControllerRef.current = abortController

      fetchHomeData(abortController.signal)

      if (isInitialLoad.current) {
        isInitialLoad.current = false
        isUpdatingFromUrl.current = false
      }
    }, delay)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchHomeData])

  // Cleanup quando component desmonta
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  return {
    courses: courses,
    numStudents: numStudents,
    numCourses: numCourses,
    numCompanies: numCompanies,
    numTeachers: numTeachers,
  }
}
