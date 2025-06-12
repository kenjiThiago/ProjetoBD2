'use client'

import { Doughnut } from 'react-chartjs-2'
import { motion } from 'framer-motion'
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
  const completionPercentage = Math.round((completedCourses / totalCourses) * 100)

  const data = {
    labels: ['Concluídos', 'Em Andamento', 'Não Iniciados'],
    datasets: [
      {
        data: [completedCourses, inProgressCourses, notStartedCourses],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // emerald-500 com transparência
          'rgba(249, 115, 22, 0.8)',  // orange-500 com transparência
          'rgba(107, 114, 128, 0.4)', // gray-500 com mais transparência
        ],
        borderColor: [
          '#10b981', // emerald-500
          '#f97316', // orange-500
          '#6b7280', // gray-500
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(52, 211, 153, 0.9)', // emerald-400 mais opaco no hover
          'rgba(251, 146, 60, 0.9)',  // orange-400 mais opaco no hover
          'rgba(156, 163, 175, 0.6)', // gray-400 com transparência
        ],
        cutout: '70%',
        spacing: 2,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, // Remove a legenda
      },
      tooltip: {
        enabled: true,
        external: () => {}, // Mantém o tooltip sempre ativo
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
      // Força o tooltip a aparecer sempre que houver hover
      if (event.native?.target) {
        (event.native.target as HTMLElement).style.cursor = elements.length > 0 ? 'pointer' : 'default'
      }
    },
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 card-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Progresso dos Cursos
        </h3>
      </div>

      <div className="relative h-48">
        <Doughnut data={data} options={options} />

        {/* Centro do gráfico redesenhado */}
        <motion.div
          className="absolute inset-0 -z-10 flex flex-col items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-full p-3 py-6 border border-gray-700/50 shadow-lg">
            <div className="text-center">
              <motion.div
                className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {completionPercentage}%
              </motion.div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                Concluído
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legenda personalizada movida para cima */}
      <div className="mt-4">
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700/30">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2 text-xs">
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div className="text-gray-300 flex gap-1">
                <div className="font-medium">{completedCourses}</div>
                <div className="text-gray-400">Concluídos</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <div className="text-gray-300 flex gap-1">
                <div className="font-medium">{inProgressCourses}</div>
                <div className="text-gray-400">Em Andamento</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
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
