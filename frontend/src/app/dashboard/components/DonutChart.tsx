'use client'

import { Doughnut } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { BarChart3, Target, Sparkles, BookOpen, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DonutChartProps {
  completedCourses: number
  inProgressCourses: number
  totalCourses: number
}

// Componente para estado sem cursos
const NoCourseState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30 h-full flex flex-col justify-center items-center text-center"
    >
      {/* Ícone principal */}
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mb-4">
        <TrendingUp className="w-8 h-8 text-emerald-400" />
      </div>

      {/* Título e descrição */}
      <h3 className="text-lg font-semibold text-white mb-2">
        Comece a Aprender
      </h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        Escolha um curso e comece a construir seu progresso acadêmico
      </p>

      {/* Call to action */}
      <Link href="/cursos">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center gap-2 text-sm"
        >
          <BookOpen className="w-4 h-4" />
          Ver Cursos
          <ArrowRight className="w-3 h-3" />
        </motion.button>
      </Link>

      {/* Motivação */}
      <div className="mt-4 pt-4 border-t border-emerald-500/20 w-full">
        <div className="flex items-center justify-center gap-2 text-xs text-emerald-400">
          <Sparkles className="w-3 h-3" />
          <span>Seus primeiros cursos aparecerão aqui</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function DonutChart({
  completedCourses,
  inProgressCourses,
  totalCourses
}: DonutChartProps) {
  const notStartedCourses = totalCourses - completedCourses - inProgressCourses

  // Verificar se o usuário tem algum curso
  const hasAnyCourse = completedCourses > 0 || inProgressCourses > 0

  // Estado para controlar visibilidade dos segmentos
  const [segmentVisibility, setSegmentVisibility] = useState({
    completed: true,
    inProgress: true,
    notStarted: false
  })

  const [scope, setScope] = useState("Usuário")

  useEffect(() => {
    if (segmentVisibility.notStarted) {
      setScope("Total")
    } else {
      setScope("Usuário")
    }
  }, [segmentVisibility.notStarted])

  // Se não tem nenhum curso, mostrar estado especial
  if (!hasAnyCourse) {
    return <NoCourseState />
  }

  // Função para alternar visibilidade de um segmento
  const toggleSegment = (segment: 'completed' | 'inProgress' | 'notStarted') => {
    setSegmentVisibility(prev => ({
      ...prev,
      [segment]: !prev[segment]
    }))
  }

  // Calcula os totais baseados apenas nos segmentos visíveis
  const getVisibleTotals = () => {
    let visibleCompleted = segmentVisibility.completed ? completedCourses : 0
    let visibleInProgress = segmentVisibility.inProgress ? inProgressCourses : 0
    let visibleNotStarted = segmentVisibility.notStarted ? notStartedCourses : 0

    const visibleTotal = visibleCompleted + visibleInProgress + visibleNotStarted
    const visibleCompletionPercentage = visibleTotal > 0 ? Math.round((visibleCompleted / visibleTotal) * 100) : 0

    return {
      visibleTotal,
      visibleCompleted,
      visibleInProgress,
      visibleNotStarted,
      visibleCompletionPercentage
    }
  }

  const { visibleTotal, visibleCompletionPercentage } = getVisibleTotals()

  // Dados filtrados baseados na visibilidade
  const getFilteredData = () => {
    const labels = []
    const data = []
    const backgroundColor = []
    const borderColor = []
    const hoverBackgroundColor = []

    if (segmentVisibility.completed) {
      labels.push('Concluídos')
      data.push(completedCourses)
      backgroundColor.push('rgba(16, 185, 129, 0.8)')
      borderColor.push('#10b981')
      hoverBackgroundColor.push('rgba(52, 211, 153, 0.9)')
    }

    if (segmentVisibility.inProgress) {
      labels.push('Em Andamento')
      data.push(inProgressCourses)
      backgroundColor.push('rgba(249, 115, 22, 0.8)')
      borderColor.push('#f97316')
      hoverBackgroundColor.push('rgba(251, 146, 60, 0.9)')
    }

    if (segmentVisibility.notStarted) {
      labels.push('Não Iniciados')
      data.push(notStartedCourses)
      backgroundColor.push('rgba(107, 114, 128, 0.4)')
      borderColor.push('#6b7280')
      hoverBackgroundColor.push('rgba(156, 163, 175, 0.6)')
    }

    return {
      labels,
      datasets: [{
        data,
        backgroundColor,
        borderColor,
        borderWidth: 2,
        hoverBackgroundColor,
        cutout: '70%',
        spacing: 2,
      }]
    }
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        external: () => {},
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} cursos (${percentage}%)`
          }
        }
      }
    },
    onHover: (event, elements) => {
      if (event.native?.target) {
        (event.native.target as HTMLElement).style.cursor = elements.length > 0 ? 'pointer' : 'default'
      }
    },
  }

  // Determina o texto central
  const getCenterText = () => {
    const activeSegments = []
    if (segmentVisibility.completed) activeSegments.push('completed')
    if (segmentVisibility.inProgress) activeSegments.push('inProgress')
    if (segmentVisibility.notStarted) activeSegments.push('notStarted')

    if (activeSegments.length === 0) {
      return { value: '0', label: 'Cursos' }
    }

    return {
      value: visibleTotal.toString(),
      label: visibleTotal === 1 ? 'Curso' : 'Cursos'
    }
  }

  const centerText = getCenterText()

  // Determina a meta
  const getMetaInfo = () => {
    if (completedCourses + inProgressCourses === 0) {
      return { value: '0%', label: 'Ativo' }
    }

    return {
      value: `${visibleCompletionPercentage}%`,
      label: 'Concluído'
    }
  }

  const metaInfo = getMetaInfo()

  return (
    <div
      className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30 transition-all duration-300 relative overflow-hidden group h-full"
    >
      {/* Header melhorado */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          {/* Ícone com fundo gradiente */}
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              Progresso dos Cursos
              {visibleCompletionPercentage > 70 && (
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              )}
            </h3>
            <p className="text-sm text-gray-400">Visualização: {scope}</p>
          </div>
        </div>

        {/* Badge de performance */}
        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1 flex items-center gap-1">
          <Target className="w-3 h-3 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">
            {metaInfo.value} {metaInfo.label}
          </span>
        </div>
      </div>

      {/* Container do gráfico */}
      <div className="relative h-48 mb-4">
        <Doughnut data={getFilteredData()} options={options} />

        {/* Centro do gráfico */}
        <motion.div
          className="absolute inset-0 -z-10 flex flex-col items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-full p-5 border border-gray-500/20 shadow-xl">
            <div className="text-center">
              <motion.div
                className="text-2xl bg-gray-400 bg-clip-text text-transparent mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                key={centerText.value}
              >
                {centerText.value}
              </motion.div>
              <div className="text-xs text-gray-300 font-medium uppercase tracking-wider">
                {centerText.label}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legenda personalizada melhorada */}
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 text-xs">
            {/* Concluídos */}
            <motion.div
              className={`flex items-center space-x-2 justify-center transition-all duration-200 p-2 rounded-md hover:bg-emerald-500/10 ${
                !segmentVisibility.completed ? 'opacity-50' : ''
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-3 h-3 bg-emerald-500 rounded-full transition-all duration-200 ${
                !segmentVisibility.completed ? 'opacity-30' : 'shadow-lg shadow-emerald-500/30'
              }`}></div>
              <div className="text-gray-300 flex gap-1">
                <div className="font-bold text-emerald-400">{completedCourses}</div>
                <div className="text-gray-400">Concluídos</div>
              </div>
            </motion.div>

            {/* Em Andamento */}
            <motion.div
              className={`flex items-center space-x-2 justify-center transition-all duration-200 p-2 rounded-md hover:bg-orange-500/10 ${
                !segmentVisibility.inProgress ? 'opacity-50' : ''
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-3 h-3 bg-orange-500 rounded-full transition-all duration-200 ${
                !segmentVisibility.inProgress ? 'opacity-30' : 'shadow-lg shadow-orange-500/30'
              }`}></div>
              <div className="text-gray-300 flex gap-1">
                <div className="font-bold text-orange-400">{inProgressCourses}</div>
                <div className="text-gray-400">Em Andamento</div>
              </div>
            </motion.div>

            {/* Não Iniciados */}
            <motion.div
              className={`flex items-center space-x-2 justify-center cursor-pointer transition-all duration-200 p-2 rounded-md hover:bg-gray-500/20 ${
                !segmentVisibility.notStarted ? 'opacity-50' : ''
              }`}
              onClick={() => toggleSegment('notStarted')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-3 h-3 bg-gray-500 rounded-full transition-all duration-200 ${
                !segmentVisibility.notStarted ? 'opacity-30' : 'shadow-lg shadow-gray-500/30'
              }`}></div>
              <div className="text-gray-300 flex gap-1">
                <div className="font-bold text-gray-400">{notStartedCourses}</div>
                <div className="text-gray-400">Não Iniciados</div>
              </div>
            </motion.div>
          </div>

          {/* Indicador de clique */}
          <div className="text-center mt-2 pt-2 border-t border-gray-700/30">
            <p className="text-xs text-gray-500">
              Clique em "Não Iniciados" para alternar visualização
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
