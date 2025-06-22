'use client'

import {
  Play,
  Clock,
  CheckCircle,
  Eye,
  Download,
} from 'lucide-react'
import { DashboardCourse } from '@/data/mockData'
import Thumbnail from '@/components/Thumbnail'

interface CourseCardProps {
  course: DashboardCourse
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }
  const progress = (course.aulas_concluidas / course.total_aulas) * 100

  return (
    <div className="card p-6 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
      <div className="relative">
        <Thumbnail
          course={course}
          index={index}
          type="grid"
        />
        {progress === 100 && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex flex-col items-start justify-center gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.nivel)}`}>
            {course.nivel}
          </span>
          {course.habilidades.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {course.habilidades.slice(0, 3).map(tag => (
                <span key={tag} className="bg-gray-800/50 text-gray-400 text-xs px-2 py-1 rounded hover:bg-gray-700/50 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
          {course.nome}
        </h3>

        <div className="flex items-center text-gray-400 text-sm">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
            {"A"}
          </div>
          <span>Por {course.nome_professor}</span>
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <Clock className="w-4 h-4 mr-1" />
          <span>{course.duracao_total}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progresso</span>
            <span className="text-white font-semibold">{progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress || 0}%` }}
            />
          </div>
          <div className="text-xs text-gray-400">
            {course.aulas_concluidas || 0}/{course.total_aulas} aulas concluídas
          </div>
        </div>

        <div className="flex gap-2">
          {progress === 100 ? (
            <>
              <button className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>Revisar</span>
              </button>
              <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center space-x-1">
                <Download className="w-4 h-4" />
                <span>Certificado</span>
              </button>
            </>
          ) : (
            <button className="w-full btn-primary py-2 text-sm flex items-center justify-center space-x-1">
              <Play className="w-4 h-4" />
              <span>{progress && progress > 0 ? 'Continuar' : 'Iniciar'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
