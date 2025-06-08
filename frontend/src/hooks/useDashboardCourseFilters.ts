import { useState, useMemo } from 'react'
import { Course } from '@/data/mockData'

interface UseDashboardCourseFiltersProps {
  courses: Course[]
}

export function useDashboardCourseFilters({ courses }: UseDashboardCourseFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Categorias")
  const [selectedLevel, setSelectedLevel] = useState("Níveis")
  const [selectedStatus, setSelectedStatus] = useState("Status")

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

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Categorias")
    setSelectedLevel("Níveis")
    setSelectedStatus("Status")
  }

  return {
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedStatus,
    filteredCourses,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLevel,
    setSelectedStatus,
    clearAllFilters
  }
}
