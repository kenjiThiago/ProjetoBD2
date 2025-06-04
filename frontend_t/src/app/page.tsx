'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedCourses from '@/components/FeaturedCourses'
import Categories from '@/components/Categories'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <motion.main
      className="min-h-screen bg-dark-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header />
      <Hero />
      <FeaturedCourses />
      <Categories />
      <Stats />
      <Footer />
    </motion.main>
  )
}
