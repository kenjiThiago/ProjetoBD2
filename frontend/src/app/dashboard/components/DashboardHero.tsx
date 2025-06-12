'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Award,
  Briefcase,
} from 'lucide-react'
import DonutChart from './DonutChart'

interface User {
  name: string
  avatar: string
  level: string
  joinDate: string
  completedCourses: number
  inProgressCourses: number
  studyTime: string
  certificates: number
  totalCourses: number
}

interface DashboardHeroProps {
  user: User
  totalPoints: number
}

export default function DashboardHero({
  user,
  totalPoints,
}: DashboardHeroProps) {

  return (
    <section className="bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900 py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start justify-between items-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Message */}
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-20 gap-y-20 flex-1 w-full px-32 lg:px-0">
            <div className="flex flex-col justify-end gap-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{user.avatar}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Olá, <span className="gradient-text">{user.name}</span>! 👋
                  </h1>
                  <p className="text-gray-400">Pronto para continuar sua jornada de aprendizado?</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 h-full">
                  <div className="flex items-center space-x-2 mb-2">
                    <Briefcase className="w-5 h-5 text-orange-400" />
                    <span className="text-sm text-gray-400">Vagas</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{totalPoints.toLocaleString()}</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-gray-400">Horas de Estudo</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{user.studyTime}</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 h-full">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-400">Certificados</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{user.certificates}</div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <DonutChart
                completedCourses={user.completedCourses}
                inProgressCourses={user.inProgressCourses}
                totalCourses={user.totalCourses}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
