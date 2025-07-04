'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DashboardHero from '@/app/dashboard/components/DashboardHero'
import DashboardTabs from '@/app/dashboard/components/DashboardTabs'
import DashboardOverview from '@/app/dashboard/components/DashboardOverview'
import DashboardCourses from '@/app/dashboard/components/DashboardCourses'
import WelcomeModal from './WelcomeModal'
import { useDashboardInfo } from '@/hooks/useDashboardInfo'
import { User } from '@/data/mockData'

export default function DashboardPage({ cpf }) {
  const generateAvatarInitials = (name: string): string => {
    if (!name) return 'U'

    const words = name.trim().split(' ')
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase()
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }

  const {
    courses,
    error,
    totalPages,
    currentPage,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedStatus,
    setSearchTerm,
    setSelectedCategory,
    setSelectedStatus,
    setSelectedLevel,
    setCurrentPage,
    name,
    skills,
    certificateCount,
    inProgressCoursesCount,
    studyHours,
    applicationCount,
    subscriptionPlan,
    totalCourses,
    totalCoursesGlobal,
    overview,
    clearAllFilters
  } = useDashboardInfo(6, cpf)
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

    const handlePageChange = (e: any) => setCurrentPage(e.detail)

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
  }, [setSearchTerm, setSelectedCategory, setSelectedLevel, setSelectedStatus, clearAllFilters, setCurrentPage])


  // Searchparams
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')

  // Tab inicial baseado na url
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'achievements' | 'paths'>(
    (tabFromUrl as 'overview' | 'courses' | 'achievements' | 'paths') || 'overview'
  )

  // Tab quando url mudar
  useEffect(() => {
    if (tabFromUrl && ['overview', 'courses', 'achievements', 'paths'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl as 'overview' | 'courses' | 'achievements' | 'paths')
    }
  }, [tabFromUrl])

  // Event listeners para comunicação entre componentes
  useEffect(() => {
    const handleTabChange = (e: CustomEvent) => {
      setActiveTab(e.detail)
    }

    // Add event listener
    window.addEventListener('dashboardTabChange', handleTabChange as EventListener)

    // Cleanup
    return () => {
      window.removeEventListener('dashboardTabChange', handleTabChange as EventListener)
    }
  }, [])

  const user: User  = {
    name: name,
    avatar: generateAvatarInitials(name),
    completedCourses: totalCourses - inProgressCoursesCount,
    inProgressCourses: inProgressCoursesCount,
    certificates: certificateCount,
    studyTime: studyHours,
    planStatus: subscriptionPlan,
    skills: skills,
    totalCourses: totalCourses,
    appliedJobs: applicationCount,
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <WelcomeModal />

      <main className="pb-16">
        {/* Hero/Welcome Section */}
        <DashboardHero
          user={user}
          totalCoursesGlobal={totalCoursesGlobal}
        />

        {/* Navigation Tabs */}
        <DashboardTabs
          activeTab={activeTab}
        />

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'overview' && (
              <DashboardOverview
                coursesInProgress={overview}
                skills={user.skills}
              />
            )}

            {activeTab === 'courses' && (
              <DashboardCourses
                courses={courses}
                totalPages={totalPages}
                currentPage={currentPage}
                searchTerm={searchTerm}
                selectedStatus={selectedStatus}
                selectedLevel={selectedLevel}
                selectedCategory={selectedCategory}
                totalItems={totalCourses}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
