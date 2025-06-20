import { useState, useEffect, useCallback, useRef } from 'react'
import type { Course } from '@/data/mockData'
import { getCourses } from '@/services/courseService'
import { useUrlParams } from './useUrlParams'
import { useSearch } from './useSearch'

export function useCourseFilters(coursesPerPage: number = 6) {
  const [courses, setCourses] = useState<Course[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Refs para controle de requisições
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoad = useRef(true)
  const isUpdatingFromUrl = useRef(false)

  // Hook para gerenciar URL params e search global
  const { updateUrlParams, getUrlParam } = useUrlParams()
  const { globalSearchTerm, setGlobalSearchTerm } = useSearch()

  // Inicializar filtros a partir da URL
  const [selectedCategory, setSelectedCategory] = useState(() =>
    getUrlParam('category', 'Categoria')
  )
  const [selectedLevel, setSelectedLevel] = useState(() =>
    getUrlParam('level', 'Nível')
  )
  const [selectedAccess, setSelectedAccess] = useState(() =>
    getUrlParam('access', 'Acesso')
  )
  const [sortBy, setSortBy] = useState(() =>
    getUrlParam('sortBy', 'Ordenação')
  )

  // O searchTerm vem sempre da URL/globalSearchTerm
  const searchTerm = globalSearchTerm

  // Sincronizar globalSearchTerm com URL quando componente carrega
  useEffect(() => {
    const urlSearchTerm = getUrlParam('search', '')
    if (urlSearchTerm !== globalSearchTerm) {
      setGlobalSearchTerm(urlSearchTerm)
    }
  }, []) // Executar apenas uma vez

  // Função para buscar cursos
  const fetchCourses = useCallback(async (signal?: AbortSignal) => {
    setError(null)

    try {
      const data = await getCourses({
        search: searchTerm,
        category: selectedCategory,
        level: selectedLevel,
        access: selectedAccess,
        sortBy,
      }, signal)

      if (!signal?.aborted) {
        setCourses(data.cursos)
        if (!isUpdatingFromUrl.current) {
          setCurrentPage(1)
        }
      }
    } catch (err: any) {
      if (!signal?.aborted && err.name !== 'AbortError') {
        console.error('Erro ao buscar cursos:', err)
        setError(err.message || 'Erro ao carregar cursos')
        setCourses([])
      }
    }
  }, [searchTerm, selectedCategory, selectedLevel, selectedAccess, sortBy])

  // Effect para sincronizar com URL sempre que filtros mudarem
  useEffect(() => {
    if (!isInitialLoad.current && !isUpdatingFromUrl.current) {
      updateUrlParams({
        search: searchTerm,
        category: selectedCategory,
        level: selectedLevel,
        access: selectedAccess,
        sortBy: sortBy,
        page: currentPage > 1 ? currentPage.toString() : null
      })
    }
  }, [searchTerm, selectedCategory, selectedLevel, selectedAccess, sortBy, currentPage, updateUrlParams])

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

      fetchCourses(abortController.signal)

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
  }, [fetchCourses])

  // Effect para sincronizar página da URL
  useEffect(() => {
    const pageFromUrl = parseInt(getUrlParam('page', '1'))
    if (pageFromUrl !== currentPage && pageFromUrl > 0) {
      setCurrentPage(pageFromUrl)
    }
  }, [getUrlParam])

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

  // Paginação
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const paginatedCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(courses.length / coursesPerPage)

  // Funções de atualização dos filtros
  const handleSetSearchTerm = useCallback((value: string) => {
    setGlobalSearchTerm(value)
    setCurrentPage(1)
  }, [setGlobalSearchTerm])

  const handleSetSelectedCategory = useCallback((value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }, [])

  const handleSetSelectedLevel = useCallback((value: string) => {
    setSelectedLevel(value)
    setCurrentPage(1)
  }, [])

  const handleSetSelectedAccess = useCallback((value: string) => {
    setSelectedAccess(value)
    setCurrentPage(1)
  }, [])

  const handleSetSortBy = useCallback((value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }, [])

  const clearAllFilters = useCallback(() => {
    setGlobalSearchTerm("")
    setSelectedCategory("Categoria")
    setSelectedLevel("Nível")
    setSelectedAccess("Acesso")
    setSortBy("Ordenação")
    setCurrentPage(1)

    updateUrlParams({
      search: null,
      category: null,
      level: null,
      access: null,
      sortBy: null,
      page: null
    })
  }, [setGlobalSearchTerm, updateUrlParams])

  return {
    courses: paginatedCourses,
    error,
    totalCount: courses.length,
    totalPages,
    currentPage,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedAccess,
    sortBy,
    setSearchTerm: handleSetSearchTerm,
    setSelectedCategory: handleSetSelectedCategory,
    setSelectedLevel: handleSetSelectedLevel,
    setSelectedAccess: handleSetSelectedAccess,
    setSortBy: handleSetSortBy,
    setCurrentPage,
    clearAllFilters
  }
}
