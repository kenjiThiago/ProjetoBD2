import { useState, useEffect, useCallback, useRef } from 'react'
import type { DashboardCourse, InProgressCourse } from '@/data/mockData'
import { useUrlParams } from './useUrlParams'
import { getDashboardInfo } from '@/services/dashboardService'

export function useDashboardInfo(coursesPerPage: number = 6, cpf: string) {
  const [dashboardCourses, setDashboardCourses] = useState<DashboardCourse[]>([])
  const [name, setName] = useState<string>('');
  const [certificateCount, setCertificateCount] = useState<number>(0);
  const [inProgressCoursesCount, setInProgressCoursesCount] = useState<number>(0);
  const [studyHours, setStudyHours] = useState<number>(0);
  const [applicationCount, setApplicationCount] = useState<number>(0); // "Vagas inscritas" as job/vacancy applications
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>('');
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalCoursesGlobal, setTotalCoursesGlobal] = useState<number>(0);
  const [overview, setOverview] = useState<InProgressCourse[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Refs para controle de requisições
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoad = useRef(true)
  const isUpdatingFromUrl = useRef(false)

  // Hook para gerenciar URL params e search global
  const { updateDashboardUrlParams, getUrlParam } = useUrlParams()

  // Inicializar filtros a partir da URL
  const [searchTerm, setSearchTerm] = useState(() =>
    getUrlParam('search', '')
  )

  // Inicializar filtros a partir da URL
  const [selectedCategory, setSelectedCategory] = useState(() =>
    getUrlParam('category', 'Categorias')
  )
  const [selectedLevel, setSelectedLevel] = useState(() =>
    getUrlParam('level', 'Níveis')
  )
  const [selectedStatus, setSelectedStatus] = useState(() =>
    getUrlParam('status', 'Status')
  )

  // Função para buscar cursos
  const fetchDashboardInfo = useCallback(async (signal?: AbortSignal) => {
    setError(null)

    try {
      const data = await getDashboardInfo({
        search: searchTerm,
        category: selectedCategory,
        level: selectedLevel,
        status: selectedStatus,
      }, cpf, signal)
      const aluno = data.alunos[0]

      if (!signal?.aborted) {
        setDashboardCourses(aluno.card_cursos)
        setName(aluno.nome);
        setCertificateCount(aluno.num_certificados);
        setInProgressCoursesCount(aluno.num_cursos_andamento);
        setStudyHours(aluno.num_horas_estudo);
        setApplicationCount(aluno.num_vagas_inscritas);
        setSubscriptionPlan(aluno.plano);
        setTotalCourses(aluno.total_cursos);
        setOverview(aluno.visao_geral);
        setSkills(aluno.habilidades_aluno)
        setTotalCoursesGlobal(data.total_cursos)
        if (!isUpdatingFromUrl.current) {
          setCurrentPage(1)
        }
      }
    } catch (err: any) {
      if (!signal?.aborted && err.name !== 'AbortError') {
        console.error('Erro ao buscar informações do dashboard:', err)
        setError(err.message || 'Erro ao carregar dashboard')
        setDashboardCourses([])
        setName("");
        setCertificateCount(0);
        setInProgressCoursesCount(0);
        setStudyHours(0);
        setApplicationCount(0);
        setSubscriptionPlan("");
        setTotalCourses(0);
        setOverview([]);
        setSkills([])
      }
    }
  }, [searchTerm, selectedCategory, selectedLevel, selectedStatus])

  // Effect para sincronizar com URL sempre que filtros mudarem
  useEffect(() => {
    if (!isInitialLoad.current && !isUpdatingFromUrl.current) {
      updateDashboardUrlParams({
        search: searchTerm,
        category: selectedCategory,
        level: selectedLevel,
        status: selectedStatus,
        page: currentPage > 1 ? currentPage.toString() : null
      })
    }
  }, [searchTerm, selectedCategory, selectedLevel, selectedStatus, currentPage, updateDashboardUrlParams])

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

      fetchDashboardInfo(abortController.signal)

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
  }, [fetchDashboardInfo])

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
  const paginatedCourses = dashboardCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(dashboardCourses.length / coursesPerPage)

  // Funções de atualização dos filtros
  const handleSetSearchTerm = useCallback((value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }, [])

  const handleSetSelectedCategory = useCallback((value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }, [])

  const handleSetSelectedLevel = useCallback((value: string) => {
    setSelectedLevel(value)
    setCurrentPage(1)
  }, [])

  const handleSetSelectedStatus = useCallback((value: string) => {
    setSelectedStatus(value)
    setCurrentPage(1)
  }, [])

  const clearAllFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategory("Categorias")
    setSelectedLevel("Níveis")
    setSelectedStatus("Status")
    setCurrentPage(1)

    updateDashboardUrlParams({
      search: null,
      category: null,
      level: null,
      status: null,
      page: null
    })
  }, [updateDashboardUrlParams])

  return {
    courses: paginatedCourses,
    totalSearchCourses: dashboardCourses.length,
    error,
    totalCoursesGlobal,
    totalPages,
    currentPage,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedStatus: selectedStatus,
    setSearchTerm: handleSetSearchTerm,
    setSelectedCategory: handleSetSelectedCategory,
    setSelectedLevel: handleSetSelectedLevel,
    setSelectedStatus: handleSetSelectedStatus,
    setCurrentPage,
    name,
    skills,
    certificateCount,
    inProgressCoursesCount,
    studyHours,
    applicationCount,
    subscriptionPlan,
    totalCourses,
    overview,
    clearAllFilters
  }
}
