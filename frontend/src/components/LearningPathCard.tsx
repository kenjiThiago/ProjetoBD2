'use client'

import { motion } from 'framer-motion'
import {
  Target,
  Star,
  BookOpen,
  Clock,
  Trophy,
  Zap
} from 'lucide-react'
import type { LearningPath } from '@/data/mockData'

interface LearningPathCardProps {
  path: LearningPath
  variants?: any
  size?: 'small' | 'medium' | 'large'
  showActions?: boolean
}

export default function LearningPathCard({
  path,
  variants,
  size = 'medium',
  showActions = true
}: LearningPathCardProps) {
  const sizeClasses = {
    small: {
      container: 'p-4',
      thumbnail: 'h-32',
      title: 'text-md',
      icon: 'w-8 h-8',
      price: 'text-lg'
    },
    medium: {
      container: 'p-6',
      thumbnail: 'h-48',
      title: 'text-lg',
      icon: 'w-12 h-12',
      price: 'text-2xl'
    },
    large: {
      container: 'p-8',
      thumbnail: 'h-56',
      title: 'text-xl',
      icon: 'w-16 h-16',
      price: 'text-3xl'
    }
  }

  const classes = sizeClasses[size]

  return (
    <motion.div
      variants={variants}
      className={`card-glow card ${classes.container} group cursor-pointer relative overflow-hidden`}
      whileHover={{ y: -8 }}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        {path.isPopular && (
          <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 border border-orange-500/30">
            <Trophy className="w-3 h-3" />
            <span>Popular</span>
          </span>
        )}
        {path.isNew && (
          <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 border border-green-500/30">
            <Zap className="w-3 h-3" />
            <span>Nova</span>
          </span>
        )}
      </div>

      {/* Thumbnail */}
      <div className={`${classes.thumbnail} bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center`}>
        <Target className={`${classes.icon} text-white opacity-80 group-hover:opacity-100 transition-opacity`} />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30">
            {path.level}
          </span>
          <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
            {path.category}
          </span>
        </div>

        <h3 className={`${classes.title} font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2`}>
          {path.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {path.description}
        </p>

        <div className="flex items-center text-gray-400 text-sm">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
            {path.instructorAvatar}
          </div>
          <span>{path.instructor}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{path.courses} cursos</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{path.duration}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-semibold">{path.rating}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Taxa de Conclusão</span>
            <span>{path.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${path.completionRate}%` }}
            ></div>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className={`${classes.price} font-bold text-blue-400`}>
                R$ {path.price.toFixed(2).replace('.', ',')}
              </div>
              <div className="text-sm text-gray-500 line-through">
                R$ {path.originalPrice.toFixed(2).replace('.', ',')}
              </div>
            </div>
            <motion.button
              className="btn-primary px-4 py-2 flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className="w-4 h-4" />
              <span>Iniciar</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
