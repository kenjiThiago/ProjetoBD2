import { useState, useEffect, useCallback } from 'react'
import type { Course } from '@/data/mockData'
import { getCourses, type CourseFilters } from '@/services/courseService'

export function useCourseFilters(initialSearchTerm: string = '', coursesPerPage: number = 6) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // filtros
  const [selectedCategory, setSelectedCategory] = useState("Categoria")
  const [selectedLevel, setSelectedLevel] = useState("Nível")
  const [selectedAccess, setSelectedAccess] = useState("Acesso")
  const [sortBy, setSortBy] = useState("Ordenação")
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  // Busca cursos do backend sempre que filtros mudam
  const fetchCourses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCourses({
        search: searchTerm,
        category: selectedCategory,
        level: selectedLevel,
        access: selectedAccess,
        sortBy,
      })
      setCourses(data.cursos)
      setTotalCount(data.total_cursos)
      setCurrentPage(1) // volta para a primeira página sempre que filtra
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar cursos')
      setCourses([])
    } finally {
      setLoading(false)
    }
  }, [searchTerm, selectedCategory, selectedLevel, selectedAccess, sortBy])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  // Paginação apenas no frontend
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const paginatedCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(totalCount / coursesPerPage)

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
    totalCount: totalCount,
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
