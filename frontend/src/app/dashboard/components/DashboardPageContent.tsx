'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DashboardHero from '@/app/dashboard/components/DashboardHero'
import DashboardTabs from '@/app/dashboard/components/DashboardTabs'
import DashboardOverview from '@/app/dashboard/components/DashboardOverview'
import DashboardCourses from '@/app/dashboard/components/DashboardCourses'
import {
  getCoursesInProgress,
  getCompletedCourses,
  getCoursesWithCertificates
} from '@/utils/courseUtils'
import { courses, } from '@/data/mockData'

export default function DashboardPage() {
  // Searchparams
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')

  // Tab inicial baseado na url
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'achievements' | 'paths'>(
    (tabFromUrl as 'overview' | 'courses' | 'achievements' | 'paths') || 'overview'
  )

  const [studyStreak, setStudyStreak] = useState(7)
  const [totalPoints, setTotalPoints] = useState(2450)
  const [weeklyGoal, setWeeklyGoal] = useState({ target: 10, completed: 7 })

  // Dados centralizados
  const coursesInProgress = getCoursesInProgress(courses)
  const completedCourses = getCompletedCourses(courses)
  const coursesWithCertificates = getCoursesWithCertificates(courses)

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

  const user = {
    name: "kenjiThiago",
    avatar: "KT",
    level: "Desenvolvedor Intermediário",
    joinDate: "Janeiro 2025",
    completedCourses: completedCourses.length,
    inProgressCourses: coursesInProgress.length,
    certificates: coursesWithCertificates.length,
    totalCourses: courses.length
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="pb-16">
        {/* Hero/Welcome Section */}
        <DashboardHero
          user={user}
          studyStreak={studyStreak}
          totalPoints={totalPoints}
          weeklyGoal={weeklyGoal}
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
                coursesInProgress={coursesInProgress}
              />
            )}

            {activeTab === 'courses' && (
              <DashboardCourses
                courses={courses}
                coursesInProgress={coursesInProgress}
                completedCourses={completedCourses}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
