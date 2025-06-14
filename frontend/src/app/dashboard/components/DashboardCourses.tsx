'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import CourseCard from '@/components/cards/DashboardCourseCard'
import DashboardCourseFilters from '@/components/filters/DashboardCourseFilters'
import DashboardPagination from '@/components/pagination/DashboardPagination'
import { useDashboardCourseFilters } from '@/hooks/useDashboardCourseFilters'
import { Course } from '@/data/mockData'
import {
  BookOpen,
} from 'lucide-react'

interface DashboardCoursesProps {
  courses: Course[]
}

export default function DashboardCourses({
  courses,
}: DashboardCoursesProps) {
  const {
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedStatus,
    currentPage,
    totalPages,
    paginatedCourses,
    totalItems,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLevel,
    setSelectedStatus,
    clearAllFilters,
    goToPage
  } = useDashboardCourseFilters({ courses, itemsPerPage: 6 })

  // Event listeners for dashboard events
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

    const handlePageChange = (e: CustomEvent) => {
      goToPage(e.detail)
    }

    // Add event listeners
    window.addEventListener('dashboardSearchChange', handleSearchChange as EventListener)
    window.addEventListener('dashboardCategoryChange', handleCategoryChange as EventListener)
    window.addEventListener('dashboardLevelChange', handleLevelChange as EventListener)
    window.addEventListener('dashboardStatusChange', handleStatusChange as EventListener)
    window.addEventListener('dashboardClearFilters', handleClearFilters)
    window.addEventListener('dashboardPageChange', handlePageChange as EventListener)

    // Cleanup
    return () => {
      window.removeEventListener('dashboardSearchChange', handleSearchChange as EventListener)
      window.removeEventListener('dashboardCategoryChange', handleCategoryChange as EventListener)
      window.removeEventListener('dashboardLevelChange', handleLevelChange as EventListener)
      window.removeEventListener('dashboardStatusChange', handleStatusChange as EventListener)
      window.removeEventListener('dashboardClearFilters', handleClearFilters)
      window.removeEventListener('dashboardPageChange', handlePageChange as EventListener)
    }
  }, [setSearchTerm, setSelectedCategory, setSelectedLevel, setSelectedStatus, clearAllFilters, goToPage])

  return (
    <motion.div
      id="content-area"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-8 ">Meus Cursos</h2>

      {/* Filters */}
      <DashboardCourseFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        selectedStatus={selectedStatus}
        filteredCount={totalItems}
      />

      {/* Courses Grid */}
      {paginatedCourses.length > 0 ? (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            key={`courses-${currentPage}-${searchTerm}-${selectedCategory}-${selectedLevel}-${selectedStatus}`}
          >
            {paginatedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </motion.div>

          {/* Pagination */}
          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={6}
          />
        </>
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
                onClick={clearAllFilters}
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
