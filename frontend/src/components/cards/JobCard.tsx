'use client'

import {
  Building2,
  MapPin,
  DollarSign,
  Users,
  Clock,
  ExternalLink,
} from 'lucide-react'
import JobThumbnail from '@/components/JobThumbnail'

interface Job {
  id: number
  title: string
  company: string
  companyLogo: string
  location: string
  type: 'Remoto' | 'Presencial' | 'Híbrido'
  level: 'Júnior' | 'Pleno' | 'Sênior' | 'Estágio'
  salaryRange: string
  description: string
  requirements: string[]
  technologies: string[]
  benefits: string[]
  postedAt: string
  deadline: string
  applicants: number
  isUrgent?: boolean
  isNew?: boolean
  isFeatured?: boolean
}

interface JobCardProps {
  job: Job
  variants?: any
}

export default function JobCard({ job, variants }: JobCardProps) {
  const getJobLevelColor = (level: string) => {
    switch (level) {
      case 'Estágio': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Júnior': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Pleno': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Sênior': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Remoto': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Presencial': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Híbrido': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const daysAgo = Math.floor((new Date().getTime() - new Date(job.postedAt).getTime()) / (1000 * 3600 * 24))

  return (
    <div className="card-glow card p-6 group cursor-pointer relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Job Thumbnail */}
        <JobThumbnail
          job={job}
          type="list"
          className="w-16 h-16 flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`text-xs font-semibold px-2 py-1 rounded border ${getJobLevelColor(job.level)}`}>
                  {job.level}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded border ${getJobTypeColor(job.type)}`}>
                  {job.type}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {job.title}
              </h3>

              <div className="flex items-center text-gray-400 text-sm mb-3">
                <Building2 className="w-4 h-4 mr-2" />
                <span className="font-medium text-white">{job.company}</span>
                <span className="mx-2">•</span>
                <MapPin className="w-4 h-4 mr-1" />
                <span>{job.location}</span>
              </div>

              <p className="text-gray-400 mb-3 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {job.technologies.slice(0, 4).map((tech, index) => (
                  <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
                    {tech}
                  </span>
                ))}
                {job.technologies.length > 4 && (
                  <span className="text-xs text-gray-400">+{job.technologies.length - 4}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="text-white font-semibold">{job.salaryRange}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{job.applicants} candidatos</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Há {daysAgo} dia{daysAgo !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2 lg:items-end">
              <button className="btn-primary px-6 py-3 flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Candidatar-se</span>
              </button>
              <div className="text-xs text-gray-400 text-right">
                Prazo: {new Date(job.deadline).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
