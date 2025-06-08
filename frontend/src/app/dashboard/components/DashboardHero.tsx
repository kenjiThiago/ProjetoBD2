'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Star,
  Target,
  Award,
  Flame,
} from 'lucide-react'

interface User {
  name: string
  avatar: string
  level: string
  joinDate: string
  completedCourses: number
  inProgressCourses: number
  certificates: number
  totalCourses: number
}

interface WeeklyGoal {
  target: number
  completed: number
}

interface DashboardHeroProps {
  user: User
  studyStreak: number
  totalPoints: number
  weeklyGoal: WeeklyGoal
}

export default function DashboardHero({
  user,
  studyStreak,
  totalPoints,
  weeklyGoal
}: DashboardHeroProps) {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900 py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-start justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Message */}
          <div className="flex-1">
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-sm text-gray-400">Sequência</span>
                </div>
                <div className="text-2xl font-bold text-white">{studyStreak}</div>
                <div className="text-xs text-gray-400">dias consecutivos</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Pontos</span>
                </div>
                <div className="text-2xl font-bold text-white">{totalPoints.toLocaleString()}</div>
                <div className="text-xs text-gray-400">total acumulado</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-400">Cursos</span>
                </div>
                <div className="text-2xl font-bold text-white">{user.completedCourses}</div>
                <div className="text-xs text-gray-400">concluídos</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-400">Certificados</span>
                </div>
                <div className="text-2xl font-bold text-white">{user.certificates}</div>
                <div className="text-xs text-gray-400">conquistados</div>
              </div>
            </div>
          </div>

          {/* Weekly Goal Progress */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 lg:w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Meta Semanal</h3>
              <Target className="w-5 h-5 text-green-400" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progresso</span>
                  <span className="text-white font-semibold">
                    {weeklyGoal.completed}/{weeklyGoal.target} horas
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(weeklyGoal.completed / weeklyGoal.target) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              <div className="text-sm text-gray-400">
                Faltam <span className="text-white font-semibold">{weeklyGoal.target - weeklyGoal.completed}h</span> para completar sua meta!
              </div>

              <button className="w-full btn-primary py-2 text-sm">
                Continuar Estudos
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
