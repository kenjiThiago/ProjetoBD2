'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PathsHero from '@/components/sections/PathsHero'
import PathCategories from '@/components/sections/PathCategories'
import PathFilterBar from '@/components/filters/PathFilterBar'
import LearningPathCard from '@/components/LearningPathCard'
import Pagination from '@/components/pagination/Pagination'
import PathEmptyState from '@/components/states/PathEmptyState'
import { usePathFilters } from '@/hooks/usePathFilters'
import { learningPaths } from '@/data/mockData'

export default function TrilhasPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pathsPerPage = 6

  // Custom hook para filtros
  const {
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
  } = usePathFilters()

  // Reset página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredPaths])

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
    }

    // Add event listeners
    window.addEventListener('pathSearchChange', handleSearchChange as EventListener)
    window.addEventListener('pathCategoryChange', handleCategoryChange as EventListener)
    window.addEventListener('pathLevelChange', handleLevelChange as EventListener)
    window.addEventListener('pathDurationChange', handleDurationChange as EventListener)
    window.addEventListener('pathSortChange', handleSortChange as EventListener)
    window.addEventListener('pathViewModeChange', handleViewModeChange as EventListener)
    window.addEventListener('pathToggleFilters', handleToggleFilters)
    window.addEventListener('pageChange', handlePageChange as EventListener)
    window.addEventListener('pathClearFilters', handleClearFilters)

    // Cleanup
    return () => {
      window.removeEventListener('pathSearchChange', handleSearchChange as EventListener)
      window.removeEventListener('pathCategoryChange', handleCategoryChange as EventListener)
      window.removeEventListener('pathLevelChange', handleLevelChange as EventListener)
      window.removeEventListener('pathDurationChange', handleDurationChange as EventListener)
      window.removeEventListener('pathSortChange', handleSortChange as EventListener)
      window.removeEventListener('pathViewModeChange', handleViewModeChange as EventListener)
      window.removeEventListener('pathToggleFilters', handleToggleFilters)
      window.removeEventListener('pageChange', handlePageChange as EventListener)
      window.removeEventListener('pathClearFilters', handleClearFilters)
    }
  })

  // Paginação
  const indexOfLastPath = currentPage * pathsPerPage
  const indexOfFirstPath = indexOfLastPath - pathsPerPage
  const currentPaths = filteredPaths.slice(indexOfFirstPath, indexOfLastPath)
  const totalPages = Math.ceil(filteredPaths.length / pathsPerPage)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <PathsHero
          searchTerm={searchTerm}
          totalPaths={learningPaths.length}
        />

        {/* Categories Section */}
        <PathCategories selectedCategory={selectedCategory} />

        {/* Filters and Controls */}
        <PathFilterBar
          selectedLevel={selectedLevel}
          selectedDuration={selectedDuration}
          sortBy={sortBy}
          viewMode={viewMode}
          showFilters={showFilters}
          filteredCount={filteredPaths.length}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Learning Paths Grid/List */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPaths.length > 0 ? (
              <>
                <motion.div
                  className={viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                  }
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${currentPage}-${viewMode}`}
                >
                  {currentPaths.map((path) => (
                    <LearningPathCard
                      key={path.id}
                      path={path}
                      layout={viewMode}
                      variants={cardVariants}
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
              <PathEmptyState searchTerm={searchTerm} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
