import {
  Play,
  Code,
  Layers,
  Terminal,
  Palette,
  Database,
  Smartphone,
  Globe,
  Server,
  Brain,
  Box,
  Settings,
  Cloud,
} from "lucide-react"
import type { Course } from '@/data/mockData'

export default function Thumbnail({
  course,
  type="grid",
  className="",
}) {
  const typeClass = {
    list: "w-16 h-16 flex-shrink-0",
    grid: "h-32 overflow-hidden mb-4"
  }

  const cardType = typeClass[type]

  // Função para obter gradiente baseado no ID do curso
  const getCourseGradient = (courseId: number) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-green-500',
      'from-rose-500 to-pink-500',
      'from-amber-500 to-orange-500',
      'from-sky-500 to-blue-500',
      'from-cyan-500 to-teal-500',
      'from-slate-500 to-gray-500',
      'from-violet-500 to-indigo-500',
      'from-emerald-500 to-cyan-500',
      'from-red-500 to-rose-500',
      'from-yellow-500 to-amber-500',
      'from-lime-500 to-green-500',
      'from-fuchsia-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-blue-500',
      'from-emerald-500 to-lime-500',
    ]
    return gradients[courseId % gradients.length]
  }

  // Função para obter ícone baseado na categoria ou tags
  const getCourseIcon = (course: Course) => {
    const category = course.category.toLowerCase()
    const tags = course.tags.map(tag => tag.toLowerCase())

    // Prioridade por tags específicas
    if (tags.includes('react')) return <Layers className="w-8 h-8" />
    if (tags.includes('vue.js')) return <Layers className="w-8 h-8" />
    if (tags.includes('node.js')) return <Server className="w-8 h-8" />
    if (tags.includes('machine learning') || tags.includes('ai')) return <Brain className="w-8 h-8" />
    if (tags.includes('python')) return <Terminal className="w-8 h-8" />
    if (tags.includes('javascript')) return <Code className="w-8 h-8" />
    if (tags.includes('typescript')) return <Code className="w-8 h-8" />
    if (tags.includes('flutter')) return <Smartphone className="w-8 h-8" />
    if (tags.includes('docker')) return <Box className="w-8 h-8" />
    if (tags.includes('kubernetes')) return <Settings className="w-8 h-8" />
    if (tags.includes('aws')) return <Cloud className="w-8 h-8" />
    if (tags.includes('ui/ux') || tags.includes('figma')) return <Palette className="w-8 h-8" />
    if (tags.includes('mongodb') || tags.includes('sql')) return <Database className="w-8 h-8" />

    // Fallback por categoria
    switch (category) {
      case 'frontend': return <Globe className="w-8 h-8" />
      case 'backend': return <Server className="w-8 h-8" />
      case 'mobile': return <Smartphone className="w-8 h-8" />
      case 'data science': return <Brain className="w-8 h-8" />
      case 'devops': return <Settings className="w-8 h-8" />
      case 'design': return <Palette className="w-8 h-8" />
      case 'cloud': return <Cloud className="w-8 h-8" />
      default: return <Play className="w-8 h-8" />
    }
  }

  return (
      <div className={`bg-gradient-to-br ${getCourseGradient(course.id)} rounded-lg relative flex items-center justify-center ${cardType} ${className}`}>
        {/* Ícone baseado na tecnologia */}
        <div className="text-white opacity-90 group-hover:opacity-100 transition-opacity">
          {getCourseIcon(course)}
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      </div>
  )
}
