'use client'

import {
  Users,
  Clock,
  ArrowRight,
} from 'lucide-react'
import type { Course } from '@/data/mockData'
import Thumbnail from '@/components/Thumbnail'
import { isCourseNew } from "@/utils/courseUtils"

interface CourseCardProps {
  course: Course
  index: number
  variants?: any
  size?: 'small' | 'medium' | 'large'
  showActions?: boolean
  layout?: 'grid' | 'list'
}

function formatDuration(duracao: string): string {
  return duracao
    .replace(/^0h\s+/, '') // Remove "0h " do início
    .replace(/\s+0m$/, '') // Remove " 0m" do final
    || '0m'; // Fallback se string ficar vazia
}

export default function CourseCard({
  course,
  index,
  showActions = true,
  layout = 'grid'
}: CourseCardProps) {

  const isNew = isCourseNew(course)
  const isFree = course.acesso == "Grátis"

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const renderBadges = (type: string) => {
    const badges = []

    const styles = {
      "list": "rounded",
      "grid": "rounded-full"
    }

    if (isFree) {
      badges.push(
        <span
          key={1}
          className={`bg-gradient-to-r from-slate-600 to-slate-700 text-white text-xs font-bold px-2 py-1 ${styles[type]} flex items-center space-x-1 border border-slate-500/50`}
        >
          Grátis
        </span>
      )
    }

    if (isNew) {
      badges.push(
        <span
          key={2}
          className={`bg-gradient-to-r from-lime-500 to-lime-600 text-black text-xs font-bold px-2 py-1 ${styles[type]} flex items-center space-x-1`}
        >
          Lançamento
        </span>
      )
    }

    return badges.length > 0 ? (
      badges.slice(0, 2)
    ) : null
  }

  if (layout === 'list') {
    return (
      <div className="card card-glow p-6 group hover:-translate-y-1 transition-transform duration-300">
        <div className="flex space-x-4 items-center">
          <Thumbnail
            course={course}
            index={index}
            type="list"
          />
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                {course.nome}
              </h4>
              <div className="flex gap-2 items-center flex-wrap">
                <div className="flex items-center text-sm text-gray-400 mr-4">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.numero_alunos_concluidos.toLocaleString()}</span>
                </div>

                <div className="flex items-center text-sm text-gray-400 mr-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatDuration(course.duracao_formatada)}</span>
                </div>

                <div className="flex gap-2">
                  {renderBadges("list")}
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {course.descricao}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.nivel)}`}>
                {course.nivel}
              </span>

              {course.habilidades.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {course.habilidades.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {course.habilidades.length > 3 && (
                    <span className="text-xs text-gray-400">+{course.habilidades.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {showActions && (
            <div className="pt-2">
              <div className="flex gap-2 justify-between flex-1">
                <button className="btn-primary px-4 py-2 flex items-center space-x-1">
                  <ArrowRight className="w-4 h-4" />
                  <span>Acessar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`card card-glow cursor-pointer group p-4 relative overflow-hidden hover:-translate-y-2 transition-transform duration-300`}>
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
        {renderBadges("grid")}
      </div>

      {/* Thumbnail */}
      <Thumbnail
        course={course}
        index={index}
        type="grid"
      />

      {/* Content */}
      <div className="space-y-3">
        <div className="flex flex-col justify-center items-start gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.nivel)}`}>
            {course.nivel}
          </span>
          {course.habilidades.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {course.habilidades.slice(0, 3).map(tag => (
                <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
              {course.habilidades.length > 3 && (
                <span className="text-xs text-gray-400">+{course.habilidades.length - 3}</span>
              )}
            </div>
          )}
        </div>

        <h3 className={`text-md font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2`}>
          {course.nome}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {course.descricao}
        </p>


        <div className="flex items-center text-gray-400 text-sm">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
            {course.nome_professor
              .split(' ')
              .map(name => name.charAt(0))
              .join('')
              .toUpperCase()
              .slice(0, 2)
            }
          </div>
          <span>{course.nome_professor}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatDuration(course.duracao_formatada)}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{course.numero_alunos_concluidos.toLocaleString()}</span>
          </div>
        </div>

        {showActions && (
          <div className="pt-2">
            <div className="flex gap-2 flex-1">
              <button className="w-full btn-primary px-4 py-1.5 flex items-center justify-center space-x-1">
                <ArrowRight className="w-4 h-4" />
                <span>Acessar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
