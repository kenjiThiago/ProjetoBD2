'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CompaniesHero from '@/app/empresas/components/CompaniesHero'
import CompanyTabs from '@/app/empresas/components/CompanyTabs'
import CompanyFilterBar from '@/components/filters/CompanyFilterBar'
import CompanyCard from '@/components/cards/CompanyCard'
import JobCard from '@/components/cards/JobCard'
import Pagination from '@/components/pagination/Pagination'
import CompanyEmptyState from '@/components/states/CompanyEmptyState'
import { useCompanyFilters } from '@/hooks/useCompanyFilters'

export default function EmpresasPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Custom hook para filtros
  const {
    companies,
    jobs,
    filteredCompanies,
    filteredJobs,
    searchTerm,
    selectedIndustry,
    selectedSize,
    selectedLocation,
    selectedJobType,
    selectedJobLevel,
    activeTab,
    setSearchTerm,
    setSelectedIndustry,
    setSelectedSize,
    setSelectedLocation,
    setSelectedJobType,
    setSelectedJobLevel,
    setActiveTab,
    clearAllFilters
  } = useCompanyFilters()

  // Reset página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredCompanies, filteredJobs, activeTab])

  // Event listeners para comunicação entre componentes
  useEffect(() => {
    const handleSearchChange = (e: CustomEvent) => {
      setSearchTerm(e.detail)
    }

    const handleTabChange = (e: CustomEvent) => {
      setActiveTab(e.detail)
    }

    const handleIndustryChange = (e: CustomEvent) => {
      setSelectedIndustry(e.detail)
    }

    const handleSizeChange = (e: CustomEvent) => {
      setSelectedSize(e.detail)
    }

    const handleLocationChange = (e: CustomEvent) => {
      setSelectedLocation(e.detail)
    }

    const handleJobTypeChange = (e: CustomEvent) => {
      setSelectedJobType(e.detail)
    }

    const handleJobLevelChange = (e: CustomEvent) => {
      setSelectedJobLevel(e.detail)
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
    window.addEventListener('companySearchChange', handleSearchChange as EventListener)
    window.addEventListener('companyTabChange', handleTabChange as EventListener)
    window.addEventListener('companyIndustryChange', handleIndustryChange as EventListener)
    window.addEventListener('companySizeChange', handleSizeChange as EventListener)
    window.addEventListener('companyLocationChange', handleLocationChange as EventListener)
    window.addEventListener('companyJobTypeChange', handleJobTypeChange as EventListener)
    window.addEventListener('companyJobLevelChange', handleJobLevelChange as EventListener)
    window.addEventListener('companyViewModeChange', handleViewModeChange as EventListener)
    window.addEventListener('companyToggleFilters', handleToggleFilters)
    window.addEventListener('pageChange', handlePageChange as EventListener)
    window.addEventListener('companyClearFilters', handleClearFilters)

    // Cleanup
    return () => {
      window.removeEventListener('companySearchChange', handleSearchChange as EventListener)
      window.removeEventListener('companyTabChange', handleTabChange as EventListener)
      window.removeEventListener('companyIndustryChange', handleIndustryChange as EventListener)
      window.removeEventListener('companySizeChange', handleSizeChange as EventListener)
      window.removeEventListener('companyLocationChange', handleLocationChange as EventListener)
      window.removeEventListener('companyJobTypeChange', handleJobTypeChange as EventListener)
      window.removeEventListener('companyJobLevelChange', handleJobLevelChange as EventListener)
      window.removeEventListener('companyViewModeChange', handleViewModeChange as EventListener)
      window.removeEventListener('companyToggleFilters', handleToggleFilters)
      window.removeEventListener('pageChange', handlePageChange as EventListener)
      window.removeEventListener('companyClearFilters', handleClearFilters)
    }
  })

  // Paginação
  const currentItems = activeTab === 'companies' ? filteredCompanies : filteredJobs
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentPageItems = currentItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(currentItems.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main>
        {/* Hero Section */}
        <CompaniesHero
          searchTerm={searchTerm}
          totalCompanies={companies.length}
          totalJobs={jobs.length}
        />

        {/* Tabs */}
        <CompanyTabs
          activeTab={activeTab}
          totalCompanies={companies.length}
          totalJobs={jobs.length}
        />

        {/* Filters and Controls */}
        <CompanyFilterBar
          activeTab={activeTab}
          selectedIndustry={selectedIndustry}
          selectedSize={selectedSize}
          selectedLocation={selectedLocation}
          selectedJobType={selectedJobType}
          selectedJobLevel={selectedJobLevel}
          viewMode={viewMode}
          showFilters={showFilters}
          filteredCount={currentItems.length}
        />

        {/* Content - Simplified animations */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentItems.length > 0 ? (
              <>
                {activeTab === 'companies' ? (
                  <motion.div
                    className={viewMode === 'grid'
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                      : "space-y-6"
                    }
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    key={`companies-${currentPage}-${viewMode}`}
                  >
                    {currentPageItems.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company as any}
                        viewMode={viewMode}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    key={`jobs-${currentPage}`}
                  >
                    {currentPageItems.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job as any}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              /* Empty State */
              <CompanyEmptyState
                activeTab={activeTab}
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
