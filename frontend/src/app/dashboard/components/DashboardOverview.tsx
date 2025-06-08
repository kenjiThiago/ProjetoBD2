'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Play,
} from 'lucide-react'
import { Course } from '@/data/mockData'

interface DashboardOverviewProps {
  coursesInProgress: Course[]
}

export default function DashboardOverview({
  coursesInProgress
}: DashboardOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Continue Learning */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Continue Aprendendo</h2>
        {coursesInProgress.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {coursesInProgress.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="card-glow card p-6 group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Próxima aula: {course.nextLesson || 'Primeira aula'}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">
                        {course.completedLessons || 0}/{course.lessons} aulas
                      </span>
                      <span className="text-sm font-semibold text-purple-400">
                        {course.progress || 0}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>

                    <button className="btn-primary text-sm px-4 py-2 flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Continuar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Nenhum curso em andamento</h3>
            <p className="text-gray-400 mb-4">Comece um novo curso para aparecer aqui</p>
            <button
              className="btn-primary px-6 py-2"
              onClick={() => window.location.href = '/cursos'}
            >
              Explorar Cursos
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
