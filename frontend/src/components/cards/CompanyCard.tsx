'use client'

import {
  MapPin,
  Users,
  Briefcase,
  Eye,
  Shield
} from 'lucide-react'
import CompanyThumbnail from '@/components/CompanyThumbnail'
import { Company } from '@/data/mockData'

interface CompanyCardProps {
  company: Company
  index: number
  viewMode: 'grid' | 'list'
  variants?: any
}

export default function CompanyCard({ company, viewMode, index }: CompanyCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="card-glow card p-6 group cursor-pointer relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Thumbnail */}
          <CompanyThumbnail
            company={company}
            index={index}
            type="list"
            className=""
          />

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30 flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Parceira</span>
                  </span>
                  <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
                    {company.setor}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {company.nome}
                </h3>

                <p className="text-gray-400 mb-3 line-clamp-2">
                  {company.descricao}
                </p>

                <div className="flex items-center text-gray-400 text-sm mb-3 flex-wrap gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{company.localizacao}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{company.porte}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{company.numero_vagas} vagas ativas</span>
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
      {/* Thumbnail */}
      <CompanyThumbnail
        company={company}
        index={index}
        type="grid"
      />

      {/* Content */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30 flex items-center space-x-1">
          <Shield className="w-3 h-3" />
          <span>Parceira</span>
        </span>
        <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
          {company.setor}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-1">
        {company.nome}
      </h3>

      <p className="text-gray-400 mb-3 text-sm line-clamp-2">
        {company.descricao}
      </p>

      <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{company.localizacao}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center">
          <Briefcase className="w-4 h-4 mr-1" />
          <span>{company.numero_vagas} vagas</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{company.porte}</span>
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
