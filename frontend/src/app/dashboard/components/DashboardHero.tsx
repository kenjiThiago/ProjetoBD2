'use client'

import { motion } from 'framer-motion'
import {
  Award,
  Briefcase,
  Sparkles,
  Crown,
  Star,
  Clock,
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
  status: string
  certificates: number
  totalCourses: number
  appliedJobs: number
  statusPlano?: string
}

interface DashboardHeroProps {
  user: User
}

// Função para formatar o status do plano
const getPlanDisplayInfo = (statusPlano: string) => {
  const planStatus = statusPlano?.toLowerCase()

  if (planStatus === 'pago' || planStatus === 'premium') {
    return {
      text: 'Premium',
      icon: Crown,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-500/30'
    }
  }

  return {
    text: 'Gratuito',
    icon: Star,
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30'
  }
}

// Componente reutilizável para cards de estatísticas
const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
  bgGradient,
  borderColor,
  hasAnimation = false,
  onClick
}: {
  icon: any
  label: string
  value: string | number
  subtitle?: string
  color: string
  bgGradient: string
  borderColor: string
  hasAnimation?: boolean
  onClick?: () => void
}) => (
  <motion.div
    className={`flex flex-col items-center bg-gradient-to-br ${bgGradient} rounded-xl p-5 border ${borderColor} h-full relative overflow-hidden group transition-all duration-300 hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}
    whileHover={{ y: -2 }}
    onClick={onClick}
  >
    {/* Efeito de brilho animado */}
    {hasAnimation && (
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    )}

    <div className="flex gap-2 flex-wrap justify-center items-center">
      {/* Ícone com fundo */}
      <div className={`relative z-10 w-12 h-12 bg-gradient-to-br ${bgGradient} border ${borderColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>

      {/* Label com trend */}
      <div className="flex items-center space-x-1 mb-2 relative z-10">
        <span className="text-sm text-gray-300 text-center">{label}</span>
      </div>
    </div>

    {/* Valor principal */}
    <div className={`text-2xl font-bold ${color} relative z-10 group-hover:scale-110 transition-transform duration-300`}>
      {typeof value === 'number' ? value.toLocaleString() : value}
    </div>

    {/* Indicador de hover */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
  </motion.div>
)

export default function DashboardHero({
  user,
}: DashboardHeroProps) {
  const planInfo = getPlanDisplayInfo(user.statusPlano || 'gratuito')

  // Calcular algumas métricas adicionais
  const completionRate = user.totalCourses > 0 ? Math.round((user.completedCourses / user.totalCourses) * 100) : 0
  const avgStudyHours = user.studyTime ? parseInt(user.studyTime.replace('h', '')) : 0
  const studyLevel = avgStudyHours > 150 ? 'Intensivo' : avgStudyHours > 50 ? 'Regular' : 'Iniciante'

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
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-20 gap-y-20 flex-1 w-full px-10 lg:px-0">
            <div className="flex flex-col justify-end gap-5">
              <div className="flex items-center justify-center space-x-4">
                <div className="hidden w-16 h-16 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full sm:flex items-center justify-center relative">
                  <span className="text-xl font-bold text-white">{user.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <h1 className="text-3xl font-bold text-white">
                      Olá, <span className="gradient-text">{user.name}</span>!
                    </h1>
                    <Sparkles className="text-yellow-400"/>
                  </div>
                  <p className="text-gray-400 text-center sm:text-left">
                    Pronto para continuar sua jornada de aprendizado?
                  </p>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 items-center">
                {/* Card de Vagas Aplicadas */}
                <StatCard
                  icon={Briefcase}
                  label="Vagas Aplicadas"
                  value={user.appliedJobs}
                  subtitle={user.appliedJobs > 0 ? "Oportunidades ativas" : "Comece a aplicar!"}
                  color="text-orange-400"
                  bgGradient="from-orange-500/10 to-red-500/10"
                  borderColor="border-orange-500/30"
                  hasAnimation={true}
                  onClick={() => console.log('Navegar para vagas')}
                />

                {/* Card de Horas de Estudo */}
                <StatCard
                  icon={Clock}
                  label="Tempo de Estudo"
                  value={user.studyTime}
                  subtitle={`Nível: ${studyLevel}`}
                  color="text-blue-400"
                  bgGradient="from-blue-500/10 to-cyan-500/10"
                  borderColor="border-blue-500/30"
                  hasAnimation={true}
                />

                {/* Card de Certificados */}
                <StatCard
                  icon={Award}
                  label="Certificados"
                  value={user.certificates}
                  subtitle={user.certificates > 0 ? `${completionRate}% concluído` : "Finalize um curso"}
                  color="text-purple-400"
                  bgGradient="from-purple-500/10 to-pink-500/10"
                  borderColor="border-purple-500/30"
                  hasAnimation={user.certificates > 0}
                  onClick={() => console.log('Ver certificados')}
                />

                {/* Card do Plano */}
                <StatCard
                  icon={planInfo.icon}
                  label="Plano Atual"
                  value={planInfo.text}
                  color={planInfo.color}
                  bgGradient={planInfo.bgColor}
                  borderColor={planInfo.borderColor}
                  hasAnimation={planInfo.text === 'Premium'}
                  onClick={() => planInfo.text === 'Gratuito' && console.log('Navegar para planos')}
                />
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
