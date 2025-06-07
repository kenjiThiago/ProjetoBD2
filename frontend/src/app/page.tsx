'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/app/components/Hero'
import FeaturedCourses from '@/app/components/FeaturedCourses'
import PopularVsNew from '@/app/components/PopularVsNew'
import LearningPaths from '@/app/components/LearningPaths'
import {
  learningPaths,
  getFeaturedCourses,
  getPopularCourses,
  getNewCourses
} from '@/data/mockData'

export default function HomePage() {
  const featuredCourses = getFeaturedCourses().slice(0, 3)
  const popularCourses = getPopularCourses().slice(0, 3)
  const newCourses = getNewCourses().slice(0, 3)
  const featuredPaths = learningPaths.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <Hero />

      <FeaturedCourses courses={featuredCourses} />

      <PopularVsNew
        popularCourses={popularCourses}
        newCourses={newCourses}
      />

      <LearningPaths paths={featuredPaths} />

      <Footer />
    </div>
  )
}
