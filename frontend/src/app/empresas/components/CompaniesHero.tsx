'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Building2 } from 'lucide-react'

interface CompaniesHeroProps {
  searchTerm: string
  totalCompanies: number
  totalJobs: number
}

export default function CompaniesHero({
  searchTerm,
  totalCompanies,
  totalJobs
}: CompaniesHeroProps) {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-blue-950/20 to-gray-900 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-4 rounded-2xl">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Empresas <span className="gradient-text">Parceiras</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Conectamos você com as melhores oportunidades de carreira em empresas que valorizam o talento dos nossos alunos
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar empresas ou vagas..."
                value={searchTerm}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('companySearchChange', {
                    detail: e.target.value
                  }))
                }}
                className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-lg transition-colors duration-200"
              />

              {/* Clear button */}
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('companySearchChange', {
                        detail: ''
                      }))
                    }}
                    className="absolute right-4 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-700/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{totalCompanies}+</div>
              <div className="text-gray-400">Empresas Parceiras</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{totalJobs}+</div>
              <div className="text-gray-400">Vagas Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">85%</div>
              <div className="text-gray-400">Taxa de Contratação</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
