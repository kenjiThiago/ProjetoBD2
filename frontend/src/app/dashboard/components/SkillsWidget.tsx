'use client'

import { motion } from 'framer-motion'
import { Star, Award, Code, Zap } from 'lucide-react'

interface SkillsWidgetProps {
  skills: string[]
}

export default function SkillsWidget({ skills }: SkillsWidgetProps) {
  const getSkillIcon = (skill: string) => {
    const skillLower = skill.toLowerCase()
    if (skillLower.includes('javascript') || skillLower.includes('typescript')) return Code
    if (skillLower.includes('react') || skillLower.includes('vue')) return Zap
    if (skillLower.includes('node') || skillLower.includes('backend')) return Award
    return Star
  }

  const getSkillColor = (skill: string) => {
    if (skill.includes(': avançado')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    if (skill.includes(': intermediário')) return 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 card-glow">

      {skills.length > 0 ? (
        <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
          {skills.map((skill, index) => {
            const [skillName, level] = skill.split(': ')
            const Icon = getSkillIcon(skill)
            const colorClass = getSkillColor(skill)

            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg border ${colorClass} hover:scale-105 transition-transform duration-200`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <div>
                    <p className="font-medium text-white capitalize">{skillName}</p>
                    <p className="text-xs opacity-70 capitalize">{level}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full mx-0.5 ${
                        (level === 'avançado' && i < 3) ||
                        (level === 'intermediário' && i < 2) ||
                        (level === 'iniciante' && i < 1)
                          ? 'bg-current'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-2">Nenhuma habilidade ainda</p>
          <p className="text-sm text-gray-500">Complete cursos para ganhar habilidades</p>
        </div>
      )}
    </div>
  )
}
