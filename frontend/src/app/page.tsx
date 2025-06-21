'use client'
import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/app/components/Hero'
import FeaturedCourses from '@/app/components/FeaturedCourses'
import Features from './components/Features'
import { useHomepageData } from '@/hooks/useHomepageData'

function HomePageContent() {
  const smartRound = (num: number): number => {
    if (num < 10) return num; // Números menores que 10 não arredondam

    const digits = num.toString().length;
    const base = Math.pow(10, digits - 1); // 10^(dígitos-1)

    return Math.floor(num / base) * base;
  }

  const {
    courses,
    numStudents,
    numCourses,
    numCompanies,
    numTeachers,
  } = useHomepageData()

  const roundedStats = {
    students: smartRound(numStudents),
    courses: smartRound(numCourses),
    companies: smartRound(numCompanies),
    teachers: smartRound(numTeachers),
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <Hero
        numStudents={roundedStats.students}
      />

      <Features
        numTeachers={roundedStats.teachers}
        numCompanies={roundedStats.companies}
        numStudents={roundedStats.students}
        numCourses={roundedStats.courses}
      />

      <FeaturedCourses courses={courses} />

      <Footer />
    </div>
  )
}

// Loading fallback
function HomeLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomePageContent />
    </Suspense>
  )
}

