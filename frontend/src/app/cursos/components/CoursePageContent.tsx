'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CoursesHero from '@/app/cursos/components/CoursesHero'
import FilterBar from '@/components/filters/CourseFilterBar'
import CourseCard from '@/components/cards/CourseCard'
import Pagination from '@/components/pagination/Pagination'
import EmptyState from '@/components/states/CourseEmptyState'
import { useSearch } from '@/hooks/useSearch'
import { useCourseFilters } from '@/hooks/useCourseFilters'
import { courses } from '@/data/mockData'

export default function CursosPageContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 3

  const searchParams = useSearchParams()
  const urlSearchTerm = searchParams.get('search') || ''
  const { globalSearchTerm, setGlobalSearchTerm } = useSearch()

  // Custom hook para filtros
  const {
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
  } = useCourseFilters(urlSearchTerm || globalSearchTerm || '')

  // Aplicar termo de busca da URL ao carregar
  useEffect(() => {
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm)
      setGlobalSearchTerm(urlSearchTerm)
    }
  }, [urlSearchTerm, setGlobalSearchTerm, setSearchTerm])

  // Reset página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredCourses])

  // Event listeners para comunicação entre componentes
  useEffect(() => {
    const handleSearchChange = (e: CustomEvent) => {
      setSearchTerm(e.detail)
      setGlobalSearchTerm(e.detail)
    }

    const handleCategoryChange = (e: CustomEvent) => {
      setSelectedCategory(e.detail)
    }

    const handleLevelChange = (e: CustomEvent) => {
      setSelectedLevel(e.detail)
    }

    const handleDurationChange = (e: CustomEvent) => {
      setSelectedDuration(e.detail)
    }

    const handleSortChange = (e: CustomEvent) => {
      setSortBy(e.detail)
    }

    const handleViewModeChange = (e: CustomEvent) => {
      setViewMode(e.detail)
    }

    const handleToggleFilters = () => {
      setShowFilters(!showFilters)
    }

    const handlePageChange = (e: CustomEvent) => {
      setCurrentPage(e.detail)
    }

    const handleClearFilters = () => {
      clearAllFilters()
      setGlobalSearchTerm("")
    }

    // Add event listeners
    window.addEventListener('searchChange', handleSearchChange as EventListener)
    window.addEventListener('categoryChange', handleCategoryChange as EventListener)
    window.addEventListener('levelChange', handleLevelChange as EventListener)
    window.addEventListener('durationChange', handleDurationChange as EventListener)
    window.addEventListener('sortChange', handleSortChange as EventListener)
    window.addEventListener('viewModeChange', handleViewModeChange as EventListener)
    window.addEventListener('toggleFilters', handleToggleFilters)
    window.addEventListener('pageChange', handlePageChange as EventListener)
    window.addEventListener('clearFilters', handleClearFilters)

    // Cleanup
    return () => {
      window.removeEventListener('searchChange', handleSearchChange as EventListener)
      window.removeEventListener('categoryChange', handleCategoryChange as EventListener)
      window.removeEventListener('levelChange', handleLevelChange as EventListener)
      window.removeEventListener('durationChange', handleDurationChange as EventListener)
      window.removeEventListener('sortChange', handleSortChange as EventListener)
      window.removeEventListener('viewModeChange', handleViewModeChange as EventListener)
      window.removeEventListener('toggleFilters', handleToggleFilters)
      window.removeEventListener('pageChange', handlePageChange as EventListener)
      window.removeEventListener('clearFilters', handleClearFilters)
    }
  })

  // Paginação
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main>
        {/* Hero Section */}
        <CoursesHero
          searchTerm={searchTerm}
          totalCourses={courses.length}
        />

        {/* Filters and Controls */}
        <FilterBar
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          selectedDuration={selectedDuration}
          sortBy={sortBy}
          viewMode={viewMode}
          showFilters={showFilters}
          filteredCount={filteredCourses.length}
        />

        {/* Content - Simplified animation */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCourses.length > 0 ? (
              <>
                <motion.div
                  className={viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  key={`${viewMode}-${currentPage}`}
                >
                  {currentCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      layout={viewMode}
                      size={"small"}
                    />
                  ))}
                </motion.div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
                /* Empty State */
                <EmptyState
                  searchTerm={searchTerm}
                />
              )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
