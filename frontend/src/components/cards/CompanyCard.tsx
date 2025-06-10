'use client'

import {
  MapPin,
  Users,
  Calendar,
  Star,
  Briefcase,
  TrendingUp,
  Eye,
  Trophy,
  Shield
} from 'lucide-react'

interface Company {
  id: number
  name: string
  logo: string
  description: string
  industry: string
  size: string
  location: string
  website: string
  rating: number
  employees: string
  founded: string
  isPartner: boolean
  isPremium: boolean
  activeJobs: number
  totalHires: number
  benefits: string[]
  technologies: string[]
  culture: string[]
}

interface CompanyCardProps {
  company: Company
  viewMode: 'grid' | 'list'
  variants?: any
}

export default function CompanyCard({ company, viewMode, variants }: CompanyCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="card-glow card p-6 group cursor-pointer relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Logo */}
          <div className="lg:w-24 h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{company.logo}</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {company.isPartner && (
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30 flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Parceira</span>
                    </span>
                  )}
                  <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
                    {company.industry}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {company.name}
                </h3>

                <p className="text-gray-400 mb-3 line-clamp-2">
                  {company.description}
                </p>

                <div className="flex items-center text-gray-400 text-sm mb-3 flex-wrap gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{company.size}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Fundada em {company.founded}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white font-semibold">{company.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {company.technologies.slice(0, 4).map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
                      {tech}
                    </span>
                  ))}
                  {company.technologies.length > 4 && (
                    <span className="text-xs text-gray-400">+{company.technologies.length - 4}</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{company.activeJobs} vagas ativas</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>{company.totalHires} contratações</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-2">
                <button className="btn-secondary px-4 py-2 text-sm flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>Ver Perfil</span>
                </button>
                <button className="btn-primary px-4 py-2 text-sm flex items-center space-x-1">
                  <Briefcase className="w-4 h-4" />
                  <span>Ver Vagas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View - Simplified
  return (
    <div className="card-glow card p-6 group cursor-pointer relative overflow-hidden hover:-translate-y-2 transition-transform duration-300">
      {/* Logo */}
      <div className="h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{company.logo}</span>
      </div>

      {/* Content */}
      <div className="flex items-center gap-2 mb-3">
        {company.isPartner && (
          <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30 flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Parceira</span>
          </span>
        )}
        <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
          {company.industry}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-1">
        {company.name}
      </h3>

      <p className="text-gray-400 mb-3 text-sm line-clamp-2">
        {company.description}
      </p>

      <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{company.location}</span>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-white font-semibold">{company.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {company.technologies.slice(0, 3).map((tech, index) => (
          <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
            {tech}
          </span>
        ))}
        {company.technologies.length > 3 && (
          <span className="text-xs text-gray-400">+{company.technologies.length - 3}</span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center">
          <Briefcase className="w-4 h-4 mr-1" />
          <span>{company.activeJobs} vagas</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{company.size.split(' ')[0]}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-2">
        <button className="btn-secondary flex-1 py-2 text-sm flex items-center justify-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>Ver Perfil</span>
        </button>
        <button className="btn-primary flex-1 py-2 text-sm flex items-center justify-center space-x-1">
          <Briefcase className="w-4 h-4" />
          <span>Vagas</span>
        </button>
      </div>
    </div>
  )
}
