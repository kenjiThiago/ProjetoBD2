import { useState, useEffect, useMemo } from 'react'
import { Course } from '@/data/mockData'

interface UseDashboardCourseFiltersProps {
  courses: Course[]
  itemsPerPage?: number
}

export function useDashboardCourseFilters({
  courses,
  itemsPerPage = 3
}: UseDashboardCourseFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Categorias")
  const [selectedLevel, setSelectedLevel] = useState("Níveis")
  const [selectedStatus, setSelectedStatus] = useState("Status")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter courses based on all criteria
  const filteredCourses = useMemo(() => {
    let filtered = courses

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== "Categorias") {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Filter by level
    if (selectedLevel !== "Níveis") {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Filter by status
    if (selectedStatus !== "Status") {
      if (selectedStatus === "Em andamento") {
        filtered = filtered.filter(course =>
          course.progress && course.progress > 0 && course.progress < 100
        )
      } else if (selectedStatus === "Concluídos") {
        filtered = filtered.filter(course => course.progress === 100)
      } else if (selectedStatus === "Não iniciados") {
        filtered = filtered.filter(course => !course.progress || course.progress === 0)
      }
    }

    return filtered
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedStatus])

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedLevel, selectedStatus])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Categorias")
    setSelectedLevel("Níveis")
    setSelectedStatus("Status")
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return {
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedStatus,
    currentPage,
    totalPages,
    filteredCourses,
    paginatedCourses,
    totalItems: filteredCourses.length,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLevel,
    setSelectedStatus,
    setCurrentPage,
    clearAllFilters,
    goToPage,
    goToNextPage,
    goToPreviousPage
  }
}
