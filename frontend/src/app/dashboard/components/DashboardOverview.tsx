'use client'

import { motion } from 'framer-motion'
import {
  Award,
} from 'lucide-react'
import { Course } from '@/data/mockData'
import SkillsWidget from './SkillsWidget'
import ContinueLearning from './ContinueLearning'

interface DashboardOverviewProps {
  coursesInProgress?: Course[]
  skills?: string[]
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
      {/* Continue Learning */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Continue Aprendendo</h2>
          <ContinueLearning
            coursesInProgress={coursesInProgress}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-6 mt-6 md:mt-0">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Minhas Habilidades
            </h2>
            <span className="text-sm text-gray-400">{skills.length} habilidade{skills.length !== 1 ? 's' : ''}</span>
          </div>
          <SkillsWidget skills={skills} />
        </div>
      </div>
    </motion.div>
  )
}
