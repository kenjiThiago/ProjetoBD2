import { useState, useEffect } from 'react'
import { courses } from '@/data/mockData'
import type { Course } from '@/data/mockData'
import { calculatePopularityScore, getCoursesByAccess, getCoursesByCategory, getCoursesByLevel, isCourseNew, isPopular } from '@/utils/courseUtils'

export function useCourseFilters(initialSearchTerm: string = '') {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
  const [selectedCategory, setSelectedCategory] = useState("Categoria")
  const [selectedLevel, setSelectedLevel] = useState("Nível")
  const [selectedAccess, setSelectedAccess] = useState("Acesso")
  const [sortBy, setSortBy] = useState("Mais Relevantes")
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  // Limpa o input da página de cursos ao entrar
  useEffect(() => {
    setSearchTerm("")
  }, [])

  // Filtrar cursos
  useEffect(() => {
    let filtered = [...courses]

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro de categoria
    if (selectedCategory !== "Categoria") {
      filtered = getCoursesByCategory(filtered, selectedCategory)
    }

    // Filtro de nível
    if (selectedLevel !== "Nível") {
      filtered = getCoursesByLevel(filtered, selectedLevel)
    }

    if (selectedAccess !== "Acesso") {
      filtered = getCoursesByAccess(filtered, selectedAccess)
    }

    // Ordenação
    switch (sortBy) {
      case "Mais Populares":
        filtered.sort((a, b) => calculatePopularityScore(b) - calculatePopularityScore(a))
        break
      case "Melhor Avaliados":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "Mais Recentes":
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      default:
        // Mais Relevantes - prioriza populares, bestsellers e novos
        filtered.sort((a, b) => {
          const aScore = (isPopular(a) ? 3 : 0) + (isCourseNew(a) ? 1 : 0)
          const bScore = (isPopular(b) ? 3 : 0) + (isCourseNew(b) ? 1 : 0)
          return bScore - aScore
        })
    }

    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, selectedLevel, selectedAccess, sortBy])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Categoria")
    setSelectedLevel("Nível")
    setSelectedAccess("Acesso")
    setSortBy("Mais Relevantes")
  }

  return {
    filteredCourses,
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
    clearAllFilters
  }
}
