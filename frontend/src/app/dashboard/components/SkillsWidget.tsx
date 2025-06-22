'use client'

import { motion } from 'framer-motion'
import {
  Code,
  Zap,
  Award,
  Star,
  Database,
  Smartphone,
  Palette,
  GitBranch,
  Cloud,
  Shield,
  Terminal,
  FileCode,
  Globe,
  Cpu,
  Monitor,
  Gamepad2,
  Brain,
  Server,
  Lock,
  BarChart3
} from 'lucide-react'

interface SkillsWidgetProps {
  skills: string[]
}

export default function SkillsWidget({ skills }: SkillsWidgetProps) {
  const getSkillIcon = (skill: string) => {
    const skillLower = skill.toLowerCase()

    // Linguagens de Programação
    if (skillLower.includes('javascript') || skillLower.includes('typescript')) return Code
    if (skillLower.includes('python')) return FileCode
    if (skillLower.includes('java') && !skillLower.includes('javascript')) return Cpu
    if (skillLower.includes('c++') || skillLower.includes('c#') || skillLower.includes('c ')) return Terminal
    if (skillLower.includes('php')) return Globe
    if (skillLower.includes('go') || skillLower.includes('golang')) return Zap
    if (skillLower.includes('rust')) return Shield
    if (skillLower.includes('swift')) return Smartphone
    if (skillLower.includes('kotlin')) return Smartphone

    // Frameworks e Libraries
    if (skillLower.includes('react') || skillLower.includes('vue') || skillLower.includes('angular')) return Zap
    if (skillLower.includes('node') || skillLower.includes('express')) return Server
    if (skillLower.includes('django') || skillLower.includes('flask')) return Globe
    if (skillLower.includes('spring')) return Award
    if (skillLower.includes('laravel')) return Globe

    // Banco de Dados
    if (skillLower.includes('sql') || skillLower.includes('mysql') || skillLower.includes('postgresql') ||
      skillLower.includes('mongodb') || skillLower.includes('database') || skillLower.includes('bd')) return Database

    // Mobile
    if (skillLower.includes('android') || skillLower.includes('ios') || skillLower.includes('mobile') ||
      skillLower.includes('flutter') || skillLower.includes('react native')) return Smartphone

    // Frontend/Design
    if (skillLower.includes('css') || skillLower.includes('html') || skillLower.includes('sass') ||
      skillLower.includes('design') || skillLower.includes('ui/ux') || skillLower.includes('figma')) return Palette

    // DevOps e Cloud
    if (skillLower.includes('docker') || skillLower.includes('kubernetes') || skillLower.includes('aws') ||
      skillLower.includes('azure') || skillLower.includes('gcp') || skillLower.includes('cloud')) return Cloud
    if (skillLower.includes('git') || skillLower.includes('github') || skillLower.includes('gitlab')) return GitBranch

    // Backend/Servidor
    if (skillLower.includes('backend') || skillLower.includes('api') || skillLower.includes('microservices')) return Award

    // Segurança
    if (skillLower.includes('security') || skillLower.includes('cybersecurity') || skillLower.includes('auth')) return Lock

    // Data Science/AI
    if (skillLower.includes('machine learning') || skillLower.includes('ai') || skillLower.includes('data science') ||
      skillLower.includes('tensorflow') || skillLower.includes('pytorch')) return Brain
    if (skillLower.includes('analytics') || skillLower.includes('data') || skillLower.includes('visualization')) return BarChart3

    // Sistemas/Infraestrutura
    if (skillLower.includes('linux') || skillLower.includes('unix') || skillLower.includes('system')) return Terminal
    if (skillLower.includes('web') || skillLower.includes('frontend')) return Monitor

    // Gaming
    if (skillLower.includes('game') || skillLower.includes('unity') || skillLower.includes('unreal')) return Gamepad2

    // Default
    return Star
  }

  const getSkillColor = (skill: string) => {
    if (skill.includes(': Avançado')) return 'text-red-400 bg-red-500/10 border-red-500/20'
    if (skill.includes(': Intermediário')) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">

      {skills.length > 0 ? (
        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
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
                        (level === 'Avançado' && i < 3) ||
                        (level === 'Intermediário' && i < 2) ||
                        (level === 'Iniciante' && i < 1)
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
