'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import CourseCard from '@/components/cards/CourseCard'
import type { Course } from '@/data/mockData'

interface FeaturedCoursesProps {
  courses: Course[]
  title?: string
  subtitle?: string
}

export default function FeaturedCourses({
  courses,
  title = "Cursos em Destaque",
  subtitle = "Os cursos mais procurados pelos nossos alunos, com as tecnologias mais relevantes do mercado"
}: FeaturedCoursesProps) {
  return (
    <section className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {courses.map((course, index) => (
            <CourseCard
              key={course.nome}
              index={index}
              course={course}
            />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/cursos">
            <button className="btn-secondary px-8 py-3 flex items-center space-x-2 mx-auto">
              <span>Ver Todos os Cursos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
