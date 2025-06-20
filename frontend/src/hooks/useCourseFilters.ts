import { useState, useEffect, useCallback, useRef } from 'react'
import type { Course } from '@/data/mockData'
import { getCourses, type CourseFilters } from '@/services/courseService'

export function useCourseFilters(initialSearchTerm: string = '', coursesPerPage: number = 6) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Refs para controle de requisições
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoad = useRef(true)

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState("Categoria")
  const [selectedLevel, setSelectedLevel] = useState("Nível")
  const [selectedAccess, setSelectedAccess] = useState("Acesso")
  const [sortBy, setSortBy] = useState("Ordenação")
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  // Função para buscar cursos
  const fetchCourses = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)

    try {
      const data = await getCourses({
        search: searchTerm,
        category: selectedCategory,
        level: selectedLevel,
        access: selectedAccess,
        sortBy,
      }, signal)

      // Só atualizar se a requisição não foi cancelada
      if (!signal?.aborted) {
        setCourses(data.cursos)
        setCurrentPage(1) // Reset para primeira página
      }
    } catch (err: any) {
      // Só mostrar erro se não foi cancelamento
      if (!signal?.aborted && err.name !== 'AbortError') {
        console.error('Erro ao buscar cursos:', err)
        setError(err.message || 'Erro ao carregar cursos')
        setCourses([])
      }
    } finally {
      // Só parar loading se não foi cancelada
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }, [searchTerm, selectedCategory, selectedLevel, selectedAccess, sortBy])

  // Effect com debounce e controle de cancelamento
  useEffect(() => {
    // Cancelar requisição anterior se existir
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Cancelar timeout anterior se existir
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Para o carregamento inicial, fazer requisição imediatamente
    const delay = isInitialLoad.current ? 0 : 500

    debounceTimeoutRef.current = setTimeout(() => {
      const abortController = new AbortController()
      abortControllerRef.current = abortController

      fetchCourses(abortController.signal)
      isInitialLoad.current = false
    }, delay)

    // Cleanup
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchCourses])

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

  // Paginação apenas no frontend
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const paginatedCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(courses.length / coursesPerPage)

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Categoria")
    setSelectedLevel("Nível")
    setSelectedAccess("Acesso")
    setSortBy("Ordenação")
    setCurrentPage(1)
  }

  return {
    courses: paginatedCourses,
    loading,
    error,
    totalCount: courses.length,
    totalPages,
    currentPage,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedAccess,
    sortBy,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLevel,
    setSelectedAccess,
    setSortBy,
    setCurrentPage,
    clearAllFilters
  }
}
