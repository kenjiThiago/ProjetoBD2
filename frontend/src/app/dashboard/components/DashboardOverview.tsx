'use client'

import { motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  Target,
  ArrowRight,
  Trophy
} from 'lucide-react'
import { InProgressCourse } from '@/data/mockData'
import SkillsWidget from './SkillsWidget'
import ContinueLearning from './ContinueLearning'
import Link from 'next/link'

interface DashboardOverviewProps {
  coursesInProgress?: InProgressCourse[]
  skills?: string[]
}

// Componente compacto para quando não há habilidades
const NoSkillsState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/20 rounded-xl p-6 text-center"
    >
      {/* Ícone e título */}
      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Target className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-lg font-bold text-white mb-2">
        Comece sua jornada!
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Desenvolva suas primeiras habilidades fazendo um curso
      </p>

      {/* Call to action */}
      <Link href="/cursos">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-purple-600 hover:to-orange-600 transition-all duration-200 flex items-center gap-2 mx-auto text-sm"
        >
          <BookOpen className="w-4 h-4" />
          Explorar Cursos
          <ArrowRight className="w-3 h-3" />
        </motion.button>
      </Link>

      {/* Estatística compacta */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Trophy className="w-3 h-3 text-yellow-400" />
            <span>1000+ alunos</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3 text-purple-400" />
            <span>50+ cursos</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DashboardOverview({
  coursesInProgress,
  skills = []
}: DashboardOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Continue Aprendendo</h2>
          <ContinueLearning coursesInProgress={coursesInProgress} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-6 mt-12 lg:mt-0">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Minhas Habilidades
            </h2>
            {skills && (
              <span className="text-sm text-gray-400">
                {skills.length} habilidade{skills.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {skills ? (
            <SkillsWidget skills={skills} />
          ) : (
            <NoSkillsState />
          )}
        </div>
      </div>
    </motion.div>
  )
}
