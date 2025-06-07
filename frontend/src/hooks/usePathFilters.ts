import { useState, useEffect } from 'react'
import { learningPaths } from '@/data/mockData'
import type { LearningPath } from '@/data/mockData'

export function usePathFilters(initialSearchTerm: string = '') {
  const [filteredPaths, setFilteredPaths] = useState<LearningPath[]>(learningPaths)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [selectedDuration, setSelectedDuration] = useState("Todas")
  const [sortBy, setSortBy] = useState("Mais Populares")

  // Filtrar trilhas
  useEffect(() => {
    let filtered = [...learningPaths]

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(path =>
        path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        path.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filtro de categoria
    if (selectedCategory !== "Todas") {
      filtered = filtered.filter(path => path.category === selectedCategory)
    }

    // Filtro de nível
    if (selectedLevel !== "Todos") {
      filtered = filtered.filter(path => path.level === selectedLevel)
    }

    // Filtro de duração
    if (selectedDuration !== "Todas") {
      filtered = filtered.filter(path => {
        const duration = parseInt(path.duration)
        switch (selectedDuration) {
          case "1-2 meses": return duration <= 2
          case "3-4 meses": return duration >= 3 && duration <= 4
          case "5-6 meses": return duration >= 5 && duration <= 6
          case "6+ meses": return duration > 6
          default: return true
        }
      })
    }

    // Ordenação
    switch (sortBy) {
      case "Melhor Avaliadas":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "Mais Novas":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "Menor Duração":
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
        break
      case "Menor Preço":
        filtered.sort((a, b) => a.price - b.price)
        break
      default: // Mais Populares
        filtered.sort((a, b) => b.students - a.students)
        break
    }

    setFilteredPaths(filtered)
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration, sortBy])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Todas")
    setSelectedLevel("Todos")
    setSelectedDuration("Todas")
    setSortBy("Mais Populares")
  }

  const hasActiveFilters = searchTerm || selectedCategory !== "Todas" || selectedLevel !== "Todos" || selectedDuration !== "Todas" || sortBy !== "Mais Populares"

  return {
    filteredPaths,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedDuration,
    sortBy,
    hasActiveFilters,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLevel,
    setSelectedDuration,
    setSortBy,
    clearAllFilters
  }
}
