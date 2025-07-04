import { Job } from "@/data/mockData"

interface JobThumbnailProps {
  job: Job
  type?: 'grid' | 'list'
  className?: string
}

export default function JobThumbnail({
  job,
  type = "grid",
  className = "",
}: JobThumbnailProps) {
  const typeClass = {
    list: "w-16 h-16 flex-shrink-0",
    grid: "h-32 overflow-hidden mb-4"
  }

  const generateAvatarInitials = (name: string): string => {
    if (!name) return 'U'

    const words = name.trim().split(' ')
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase()
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }

  const cardType = typeClass[type]

  // Função para obter gradiente baseado no ID da vaga
  const getJobGradient = (jobId: number) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
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
    return gradients[jobId % gradients.length]
  }

  return (
    <div className={`bg-gradient-to-br ${getJobGradient(job.id)} rounded-lg relative flex items-center justify-center ${cardType} ${className}`}>
      {/* Ícone baseado no título/tecnologias */}
      <div className="text-white text-2xl font-bold opacity-90 group-hover:opacity-100 transition-opacity">
        {generateAvatarInitials(job.vaga_nome)}
      </div>

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-lg" />
    </div>
  )
}
