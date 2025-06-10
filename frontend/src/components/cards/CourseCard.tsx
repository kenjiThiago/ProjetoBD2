'use client'

import {
  Star,
  Users,
  Clock,
  ArrowRight,
} from 'lucide-react'
import type { Course } from '@/data/mockData'
import Thumbnail from '@/components/Thumbnail'
import { isCourseNew, isPopular } from "@/utils/courseUtils"

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

  const isDynamicallyPopular = isPopular(course)
  const isNew = isCourseNew(course)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const renderBadges = () => {
    if (course.isFree) {
      return (
        <span className="bg-gradient-to-r from-slate-600 to-slate-700 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 border border-slate-500/50">
          Grátis
        </span>
      )
    }

    if (isNew) {
      return (
        <span className="bg-gradient-to-r from-lime-500 to-lime-600 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
          Lançamento
        </span>
      )
    }

    if (isDynamicallyPopular) {
      return (
        <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
          Popular
        </span>
      )
    }

    return null
  }

  if (layout === 'list') {
    return (
      <div className="card-glow card p-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
        <div className="flex space-x-4 items-center">
          <Thumbnail
            course={course}
            type="list"
          />
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                {course.title}
              </h4>
              <div className="flex gap-2 items-center flex-wrap">
                <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>

                {renderBadges()}

                {course.tags.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {course.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-gray-800/50 text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-700/50 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

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
    <div className={`card-glow card group p-4 cursor-pointer relative overflow-hidden hover:-translate-y-2 transition-transform duration-300`}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10">
        {renderBadges()}
      </div>

      {/* Thumbnail */}
      <Thumbnail
        course={course}
        type="grid"
      />

      {/* Content */}
      <div className="space-y-3">
        <div className="flex flex-col justify-center items-start gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
          {course.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {course.tags.slice(0, 3).map(tag => (
                <span key={tag} className="bg-gray-800/50 text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-700/50 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <h3 className={`text-md font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2`}>
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
              <button className="w-full btn-primary px-4 py-2 flex items-center justify-center space-x-1">
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
