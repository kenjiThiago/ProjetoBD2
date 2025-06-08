'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import CourseCard from '@/app/dashboard/components/CourseCard'
import DashboardCourseFilters from '@/app/dashboard/components/DashboardCourseFilters'
import { useDashboardCourseFilters } from '@/hooks/useDashboardCourseFilters'
import { Course } from '@/data/mockData'
import {
  BookOpen,
} from 'lucide-react'

interface DashboardCoursesProps {
  courses: Course[]
  coursesInProgress: Course[]
  completedCourses: Course[]
}

export default function DashboardCourses({
  courses,
  coursesInProgress,
  completedCourses
}: DashboardCoursesProps) {
  const {
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
  } = useDashboardCourseFilters({ courses })

  // Event listeners para comunicação entre componentes
  useEffect(() => {
    const handleSearchChange = (e: CustomEvent) => {
      setSearchTerm(e.detail)
    }

    const handleCategoryChange = (e: CustomEvent) => {
      setSelectedCategory(e.detail)
    }

    const handleLevelChange = (e: CustomEvent) => {
      setSelectedLevel(e.detail)
    }

    const handleStatusChange = (e: CustomEvent) => {
      setSelectedStatus(e.detail)
    }

    const handleClearFilters = () => {
      clearAllFilters()
    }

    // Add event listeners
    window.addEventListener('dashboardCourseSearchChange', handleSearchChange as EventListener)
    window.addEventListener('dashboardCourseCategoryChange', handleCategoryChange as EventListener)
    window.addEventListener('dashboardCourseLevelChange', handleLevelChange as EventListener)
    window.addEventListener('dashboardCourseStatusChange', handleStatusChange as EventListener)
    window.addEventListener('dashboardCourseClearFilters', handleClearFilters)

    // Cleanup
    return () => {
      window.removeEventListener('dashboardCourseSearchChange', handleSearchChange as EventListener)
      window.removeEventListener('dashboardCourseCategoryChange', handleCategoryChange as EventListener)
      window.removeEventListener('dashboardCourseLevelChange', handleLevelChange as EventListener)
      window.removeEventListener('dashboardCourseStatusChange', handleStatusChange as EventListener)
      window.removeEventListener('dashboardCourseClearFilters', handleClearFilters)
    }
  }, [setSearchTerm, setSelectedCategory, setSelectedLevel, setSelectedStatus, clearAllFilters])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-white">Meus Cursos</h2>

        {/* Quick Stats */}
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Em andamento: {coursesInProgress.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Concluídos: {completedCourses.length}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <DashboardCourseFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        selectedStatus={selectedStatus}
        filteredCount={filteredCourses.length}
      />

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={`courses-${searchTerm}-${selectedCategory}-${selectedLevel}-${selectedStatus}`}
        >
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhum curso encontrado
          </h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || selectedCategory !== "Categorias" || selectedLevel !== "Níveis" || selectedStatus !== "Status"
              ? "Tente ajustar os filtros para encontrar seus cursos"
              : "Você ainda não possui cursos cadastrados"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {(searchTerm || selectedCategory !== "Categorias" || selectedLevel !== "Níveis" || selectedStatus !== "Status") && (
              <button
                className="btn-secondary px-6 py-3"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('dashboardCourseClearFilters'))
                }}
              >
                Limpar Filtros
              </button>
            )}
            <button
              className="btn-primary px-6 py-3"
              onClick={() => window.location.href = '/cursos'}
            >
              Explorar Cursos
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
