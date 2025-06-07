'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface CoursesHeroProps {
  searchTerm: string
  totalCourses: number
}

export default function CoursesHero({
  searchTerm,
  totalCourses
}: CoursesHeroProps) {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-blue-950/20 to-gray-900 py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Todos os <span className="gradient-text">Cursos</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Descubra mais de {totalCourses} cursos das tecnologias mais demandadas do mercado
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por curso, tecnologia ou instrutor..."
                value={searchTerm}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('searchChange', {
                    detail: e.target.value
                  }))
                }}
                className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-200"
              />

              {/* Clear button */}
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('searchChange', {
                        detail: ''
                      }))
                    }}
                    className="absolute right-4 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-700/30"
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 90,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{
                      scale: 0.85,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
