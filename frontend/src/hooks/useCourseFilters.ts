import { useState, useEffect } from 'react'
import { courses } from '@/data/mockData'
import type { Course } from '@/data/mockData'

export function useCourseFilters(initialSearchTerm: string = '') {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
  const [selectedCategory, setSelectedCategory] = useState("Categoria")
  const [selectedLevel, setSelectedLevel] = useState("Nível")
  const [selectedDuration, setSelectedDuration] = useState("Duração")
  const [sortBy, setSortBy] = useState("Mais Relevantes")
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

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
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Filtro de nível
    if (selectedLevel !== "Nível") {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Filtro de duração
    if (selectedDuration !== "Duração") {
      filtered = filtered.filter(course => {
        const duration = parseInt(course.duration.split('h')[0])
        switch (selectedDuration) {
          case "0-10h": return duration <= 10
          case "10-20h": return duration > 10 && duration <= 20
          case "20-30h": return duration > 20 && duration <= 30
          case "30h+": return duration > 30
          default: return true
        }
      })
    }

    // Ordenação
    switch (sortBy) {
      case "Mais Populares":
        filtered.sort((a, b) => b.students - a.students)
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
          const aScore = (a.isPopular ? 3 : 0) + (a.isBestseller ? 2 : 0) + (a.isNew ? 1 : 0)
          const bScore = (b.isPopular ? 3 : 0) + (b.isBestseller ? 2 : 0) + (b.isNew ? 1 : 0)
          return bScore - aScore
        })
    }

    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration, sortBy])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Categoria")
    setSelectedLevel("Nível")
    setSelectedDuration("Duração")
    setSortBy("Mais Relevantes")
  }

  return {
    filteredCourses,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedDuration,
    sortBy,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLevel,
    setSelectedDuration,
    setSortBy,
    clearAllFilters
  }
}
