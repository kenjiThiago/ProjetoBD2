'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Zap, BookOpen } from 'lucide-react'
import CourseCard from '@/components/CourseCard'
import type { Course } from '@/data/mockData'

interface PopularVsNewProps {
  popularCourses: Course[]
  newCourses: Course[]
}

export default function PopularVsNew({ popularCourses, newCourses }: PopularVsNewProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Popular Courses */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Mais Populares</h3>
            </div>

            <div className="space-y-6">
              {popularCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variants={cardVariants}
                  layout="list"
                  showActions={false}
                />
              ))}
            </div>
          </motion.div>

          {/* New Courses */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Lançamentos</h3>
            </div>

            <div className="space-y-6">
              {newCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="card-glow card p-6 group cursor-pointer"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                      <BookOpen className="w-8 h-8 text-white" />
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-1 py-0.5 rounded">
                        NEW
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <motion.div className="w-4 h-4 text-yellow-400 fill-current mr-1">⭐</motion.div>
                            <span className="text-white font-semibold">{course.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <motion.div className="w-4 h-4 mr-1">🕒</motion.div>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-green-400">
                          R$ {course.price.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
