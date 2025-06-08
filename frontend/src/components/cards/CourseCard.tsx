'use client'

import { motion } from 'framer-motion'
import {
  Play,
  Star,
  Users,
  Clock,
  Trophy,
  Zap,
  Award,
  ArrowRight,
  Heart,
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
  variants,
  size = 'medium',
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

  const sizeClasses = {
    small: {
      container: 'p-4',
      thumbnail: 'h-32',
      title: 'text-md',
      icon: 'w-8 h-8',
    },
    medium: {
      container: 'p-6',
      thumbnail: 'h-48',
      title: 'text-lg',
      icon: 'w-12 h-12',
    },
    large: {
      container: 'p-8',
      thumbnail: 'h-56',
      title: 'text-xl',
      icon: 'w-16 h-16',
    }
  }

  const classes = sizeClasses[size]

  if (layout === 'list') {
    return (
      <motion.div
        variants={variants}
        className="card-glow card p-6 group cursor-pointer"
        whileHover={{ y: -2 }}
      >
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
                <motion.button
                  className="btn-secondary p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="w-4 h-4" />
                </motion.button>
                <motion.button
                  className="btn-primary px-4 py-2 flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Acessar</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={variants}
      className={`card-glow card ${classes.container} group cursor-pointer relative overflow-hidden`}
      whileHover={{ y: -8 }}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        {course.isPopular && (
          <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 border border-orange-500/30">
            <Trophy className="w-3 h-3" />
            <span>Popular</span>
          </span>
        )}
        {course.isNew && (
          <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 border border-green-500/30">
            <Zap className="w-3 h-3" />
            <span>Novo</span>
          </span>
        )}
        {course.isBestseller && (
          <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 border border-purple-500/30">
            <Award className="w-3 h-3" />
            <span>Bestseller</span>
          </span>
        )}
      </div>

      {/* Thumbnail */}
      <div className={`${classes.thumbnail} bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center`}>
        <Play className={`${classes.icon} text-white opacity-80 group-hover:opacity-100 transition-opacity`} />
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

        <h3 className={`${classes.title} font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2`}>
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
            <div className="flex gap-2 justify-between flex-1">
              <motion.button
                className="btn-secondary p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="btn-primary px-4 py-2 flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-4 h-4" />
                <span>Acessar</span>
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
