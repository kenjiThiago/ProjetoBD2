'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/app/components/Hero'
import FeaturedCourses from '@/app/components/FeaturedCourses'
import {
  getFeaturedCourses,
} from '@/data/mockData'
import Features from './components/Features'

export default function HomePage() {
  const featuredCourses = getFeaturedCourses().slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <Hero />

      <Features />

      <FeaturedCourses courses={featuredCourses} />

      <Footer />
    </div>
  )
}
