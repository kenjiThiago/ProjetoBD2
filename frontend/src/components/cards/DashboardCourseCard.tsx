'use client'

import { motion } from 'framer-motion'
import {
  Play,
  Clock,
  Star,
  CheckCircle,
  Eye,
  Download,
} from 'lucide-react'
import { Course } from '@/data/mockData'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <motion.div
      className="card-glow card p-6 group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-40 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
        <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        {course.progress === 100 && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}
        {course.isPopular && (
          <div className="absolute top-2 left-2 bg-orange-500/90 text-white text-xs font-bold px-2 py-1 rounded">
            Popular
          </div>
        )}
        {course.isNew && (
          <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded">
            Novo
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
          <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
            {course.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <div className="flex items-center text-gray-400 text-sm">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
            {course.instructorAvatar}
          </div>
          <span>Por {course.instructor}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-semibold">{course.rating}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progresso</span>
            <span className="text-white font-semibold">{course.progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress || 0}%` }}
            />
          </div>
          <div className="text-xs text-gray-400">
            {course.completedLessons || 0}/{course.lessons} aulas concluídas
          </div>
        </div>

        <div className="flex gap-2">
          {course.progress === 100 ? (
            <>
              <button className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>Revisar</span>
              </button>
              {course.certificate && (
                <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>Certificado</span>
                </button>
              )}
            </>
          ) : (
            <button className="w-full btn-primary py-2 text-sm flex items-center justify-center space-x-1">
              <Play className="w-4 h-4" />
              <span>{course.progress && course.progress > 0 ? 'Continuar' : 'Iniciar'}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
