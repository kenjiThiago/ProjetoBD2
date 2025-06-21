import { useState, useEffect, useCallback, useRef } from 'react'
import type { Company } from '@/data/mockData'
import { useUrlParams } from './useUrlParams'
import { getCompanies } from '@/services/companyService'

export function useCompanyFilters(companiesPerPage: number = 6) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isActive, setIsActive] = useState(false) // Controla se deve fazer requests

  // Refs para controle de requisições
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoad = useRef(true)
  const isUpdatingFromUrl = useRef(false)

  // Hook para gerenciar URL params
  const { updateCompanyUrlParams, getUrlParam } = useUrlParams()

  // Inicializar filtros a partir da URL
  const [searchTerm, setSearchTerm] = useState(() =>
    getUrlParam('search', '')
  )
  const [selectedLocation, setSelectedLocation] = useState(() =>
    getUrlParam('location', 'Localização')
  )
  const [selectedIndustry, setSelectedIndustry] = useState(() =>
    getUrlParam('industry', 'Setores')
  )
  const [selectedSize, setSelectedSize] = useState(() =>
    getUrlParam('size', 'Porte')
  )

  // Função para buscar empresas
  const fetchCompanies = useCallback(async (signal?: AbortSignal) => {
    if (!isActive) return // Não faz request se não estiver ativo
    setError(null)

    try {
      const data = await getCompanies({
        search: searchTerm,
        location: selectedLocation,
        industry: selectedIndustry,
        size: selectedSize,
      }, signal)

      if (!signal?.aborted) {
        setCompanies(data.empresas)
        if (!isUpdatingFromUrl.current) {
          setCurrentPage(1)
        }
      }
    } catch (err: any) {
      if (!signal?.aborted && err.name !== 'AbortError') {
        console.error('Erro ao buscar empresas:', err)
        setError(err.message || 'Erro ao carregar empresas')
        setCompanies([])
      }
    }
  }, [searchTerm, selectedLocation, selectedIndustry, selectedSize, isActive])

  // Effect para sincronizar com URL sempre que filtros mudarem
  useEffect(() => {
    if (!isInitialLoad.current && !isUpdatingFromUrl.current) {
      updateCompanyUrlParams({
        search: searchTerm,
        location: selectedLocation,
        industry: selectedIndustry,
        size: selectedSize,
        page: currentPage > 1 ? currentPage.toString() : null
      })
    }
  }, [searchTerm, selectedLocation, selectedIndustry, selectedSize, currentPage, updateCompanyUrlParams])

  // Effect para buscar empresas com debounce
  useEffect(() => {
    if (!isActive) return

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

      fetchCompanies(abortController.signal)

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
  }, [fetchCompanies])

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
  const indexOfLastCompany = currentPage * companiesPerPage
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage
  const paginatedCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany)
  const totalPages = Math.ceil(companies.length / companiesPerPage)

  const activate = useCallback(() => {
    setIsActive(true)
  }, [])

  const deactivate = useCallback(() => {
    setIsActive(false)
  }, [])

  // Funções de atualização dos filtros
  const handleSetSearchTerm = useCallback((value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }, [])

  const handleSetSelectedLocation = useCallback((value: string) => {
    setSelectedLocation(value)
    setCurrentPage(1)
  }, [])

  const handleSetSelectedIndustry = useCallback((value: string) => {
    setSelectedIndustry(value)
    setCurrentPage(1)
  }, [])

  const handleSetSelectedSize = useCallback((value: string) => {
    setSelectedSize(value)
    setCurrentPage(1)
  }, [])

  const clearAllFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedLocation("Localização")
    setSelectedIndustry("Setores")
    setSelectedSize("Porte")
    setCurrentPage(1)

    updateCompanyUrlParams({
      search: null,
      location: null,
      industry: null,
      size: null,
      page: null
    })
  }, [updateCompanyUrlParams])

  return {
    companies: paginatedCompanies,
    error,
    totalCount: companies.length,
    totalPages,
    currentPage,
    searchTerm,
    selectedLocation: selectedLocation,
    selectedIndustry: selectedIndustry,
    selectedSize: selectedSize,
    setSearchTerm: handleSetSearchTerm,
    setSelectedLocation: handleSetSelectedLocation,
    setSelectedIndustry: handleSetSelectedIndustry,
    setSelectedSize: handleSetSelectedSize,
    setCurrentPage,
    clearAllFilters,
    activate,
    deactivate,
    isActive
  }
}
