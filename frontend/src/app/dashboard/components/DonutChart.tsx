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
import { TrendingUp } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DonutChartProps {
  completedCourses: number
  inProgressCourses: number
  totalCourses: number
}

export default function DonutChart({
  completedCourses,
  inProgressCourses,
  totalCourses
}: DonutChartProps) {
  const notStartedCourses = totalCourses - completedCourses - inProgressCourses

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

  // Determina o texto central baseado nos segmentos visíveis
  const getCenterText = () => {
    const activeSegments = []
    if (segmentVisibility.completed) activeSegments.push('completed')
    if (segmentVisibility.inProgress) activeSegments.push('inProgress')
    if (segmentVisibility.notStarted) activeSegments.push('notStarted')

    if (activeSegments.length === 0) {
      return { percentage: '0%', label: 'Nenhum' }
    }

    // Se apenas "Concluídos" estiver ativo
    if (activeSegments.length === 1 && activeSegments[0] === 'completed') {
      return { percentage: '100%', label: 'Concluídos' }
    }

    // Se apenas "Em Andamento" estiver ativo
    if (activeSegments.length === 1 && activeSegments[0] === 'inProgress') {
      return { percentage: '100%', label: 'Em Andamento' }
    }

    // Se apenas "Não Iniciados" estiver ativo
    if (activeSegments.length === 1 && activeSegments[0] === 'notStarted') {
      return { percentage: '100%', label: 'Não Iniciados' }
    }

    // Para múltiplos segmentos, mostra a porcentagem de concluído
    return {
      percentage: `${visibleCompletionPercentage}%`,
      label: 'Concluído'
    }
  }

  const centerText = getCenterText()

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Progresso dos Cursos ({scope})
        </h3>
      </div>

      <div className="relative h-48">
        <Doughnut data={getFilteredData()} options={options} />

        {/* Centro do gráfico com valores dinâmicos */}
        <motion.div
          className="absolute inset-0 -z-10 flex flex-col items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-full p-3 py-4 border border-gray-700/50 shadow-lg">
            <div className="text-center">
              <motion.div
                className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                key={centerText.percentage} // Força re-render na mudança
              >
                {centerText.percentage}
              </motion.div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                {centerText.label}
              </div>
              {visibleTotal > 0 && (
                <div className="text-xs text-gray-500 font-medium">
                  {visibleTotal} curso{visibleTotal !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legenda personalizada com funcionalidade de clique */}
      <div className="mt-4">
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700/30">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2 text-xs">
            {/* Concluídos */}
            <div
              className={`flex items-center space-x-2 justify-center transition-all duration-200 p-2 rounded-md ${
                !segmentVisibility.completed ? 'opacity-50' : ''
              }`}
            >
              <div className={`w-3 h-3 bg-emerald-500 rounded-full transition-opacity duration-200 ${
                !segmentVisibility.completed ? 'opacity-30' : ''
              }`}></div>
              <div className="text-gray-300 flex gap-1">
                <div className="font-medium">{completedCourses}</div>
                <div className="text-gray-400">Concluídos</div>
              </div>
            </div>

            {/* Em Andamento */}
            <div
              className={`flex items-center space-x-2 justify-center transition-all duration-200 p-2 rounded-md ${
                !segmentVisibility.inProgress ? 'opacity-50' : ''
              }`}
            >
              <div className={`w-3 h-3 bg-orange-500 rounded-full transition-opacity duration-200 ${
                !segmentVisibility.inProgress ? 'opacity-30' : ''
              }`}></div>
              <div className="text-gray-300 flex gap-1">
                <div className="font-medium">{inProgressCourses}</div>
                <div className="text-gray-400">Em Andamento</div>
              </div>
            </div>

            {/* Não Iniciados */}
            <div
              className={`flex items-center space-x-2 justify-center cursor-pointer transition-all duration-200 p-2 rounded-md hover:bg-gray-800/50 ${
                !segmentVisibility.notStarted ? 'opacity-50' : ''
              }`}
              onClick={() => toggleSegment('notStarted')}
            >
              <div className={`w-3 h-3 bg-gray-500 rounded-full transition-opacity duration-200 ${
                !segmentVisibility.notStarted ? 'opacity-30' : ''
              }`}></div>
              <div className="text-gray-300 flex gap-1">
                <div className="font-medium">{notStartedCourses}</div>
                <div className="text-gray-400">Não Iniciados</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
