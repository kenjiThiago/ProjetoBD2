'use client'

import {
  Play,
  Star,
  Users,
  Clock,
  Zap,
  ArrowRight,
  Gift,
  TrendingUp,
} from 'lucide-react'
import type { Course } from '@/data/mockData'

interface CourseCardProps {
  course: Course
  variants?: any
  size?: 'small' | 'medium' | 'large'
  showActions?: boolean
  layout?: 'grid' | 'list'
}

export default function CourseCard({
  course,
  showActions = true,
  layout = 'grid'
}: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (layout === 'list') {
    return (
      <div className="card-glow card p-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
        <div className="flex space-x-4 items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Play className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {course.title}
            </h4>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {course.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-white font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {showActions && (
            <div className="pt-2">
              <div className="flex gap-2 justify-between flex-1">
                <button className="btn-primary px-4 py-2 flex items-center space-x-1">
                  <ArrowRight className="w-4 h-4" />
                  <span>Acessar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`card-glow card group p-6 cursor-pointer relative overflow-hidden hover:-translate-y-2 transition-transform duration-300`}>
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {course.isPopular && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Popular</span>
            </span>
          )}
          {course.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Novo</span>
            </span>
          )}
        </div>

        <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
          <Gift className="w-3 h-3" />
          <span>Grátis</span>
        </span>
      </div>

      {/* Thumbnail */}
      <div className={`h-48 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center`}>
        <Play className={`w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity`} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
          <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
            {course.category}
          </span>
        </div>

        <h3 className={`text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2`}>
          {course.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center text-gray-400 text-sm">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
            {course.instructorAvatar}
          </div>
          <span>{course.instructor}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-semibold">{course.rating}</span>
          </div>
        </div>

        {showActions && (
          <div className="pt-2">
            <div className="flex gap-2 flex-1">
              <button className="btn-primary px-4 py-2 flex items-center space-x-1">
                <ArrowRight className="w-4 h-4" />
                <span>Acessar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
