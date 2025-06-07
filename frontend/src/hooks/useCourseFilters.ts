import { useState, useEffect } from 'react'
import { courses } from '@/data/mockData'
import type { Course } from '@/data/mockData'

export function useCourseFilters(initialSearchTerm: string = '') {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [selectedDuration, setSelectedDuration] = useState("Todas")
  const [selectedPrice, setSelectedPrice] = useState("Todos")
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
    if (selectedCategory !== "Todas") {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Filtro de nível
    if (selectedLevel !== "Todos") {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Filtro de duração
    if (selectedDuration !== "Todas") {
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

    // Filtro de preço
    if (selectedPrice !== "Todos") {
      filtered = filtered.filter(course => {
        switch (selectedPrice) {
          case "Gratuito": return course.price === 0
          case "R$ 0-200": return course.price >= 0 && course.price <= 200
          case "R$ 200-400": return course.price > 200 && course.price <= 400
          case "R$ 400+": return course.price > 400
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
      case "Menor Preço":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "Maior Preço":
        filtered.sort((a, b) => b.price - a.price)
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
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration, selectedPrice, sortBy])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Todas")
    setSelectedLevel("Todos")
    setSelectedDuration("Todas")
    setSelectedPrice("Todos")
    setSortBy("Mais Relevantes")
  }

  return {
    filteredCourses,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedDuration,
    selectedPrice,
    sortBy,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLevel,
    setSelectedDuration,
    setSelectedPrice,
    setSortBy,
    clearAllFilters
  }
}
