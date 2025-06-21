'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Grid3X3, List } from 'lucide-react'

interface CompanyFilterBarProps {
  activeTab: 'companies' | 'jobs'
  selectedIndustry: string
  selectedSize: string
  selectedLocation: string
  selectedJobType: string
  selectedJobLevel: string
  viewMode: 'grid' | 'list'
  showFilters: boolean
  filteredCount: number
}

const industries = ["Setores", "Tecnologia", "Data Science", "Cloud Computing", "FinTech", "Gaming", "Venture Capital"]
const companySizes = ["Porte", "Pequeno", "Médio", "Grande"]
const locations = ["Localização", "São Paulo, SP", "Rio de Janeiro, RJ", "Florianópolis, SC", "Belo Horizonte, MG", "Curitiba, PR"]
const jobTypes = ["Modalidade", "Remoto", "Presencial", "Híbrido"]
const jobLevels = ["Nível", "Estágio", "Júnior", "Pleno", "Sênior"]

export default function CompanyFilterBar({
  activeTab,
  selectedIndustry,
  selectedSize,
  selectedLocation,
  selectedJobType,
  selectedJobLevel,
  viewMode,
  showFilters,
  filteredCount
}: CompanyFilterBarProps) {
  return (
    <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-36 z-30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Mobile Filter Toggle */}
            <motion.button
              className="lg:hidden btn-secondary px-4 py-2 text-sm flex items-center space-x-2"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('companyToggleFilters'))
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros</span>
            </motion.button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              {activeTab === 'companies' ? (
                <>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => {
                      window.dispatchEvent(new CustomEvent('companyIndustryChange', {
                        detail: e.target.value
                      }))
                    }}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>

                  <select
                    value={selectedSize}
                    onChange={(e) => {
                      window.dispatchEvent(new CustomEvent('companySizeChange', {
                        detail: e.target.value
                      }))
                    }}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <select
                    value={selectedJobType}
                    onChange={(e) => {
                      window.dispatchEvent(new CustomEvent('companyJobTypeChange', {
                        detail: e.target.value
                      }))
                    }}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  <select
                    value={selectedJobLevel}
                    onChange={(e) => {
                      window.dispatchEvent(new CustomEvent('companyJobLevelChange', {
                        detail: e.target.value
                      }))
                    }}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {jobLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </>
              )}

              <select
                value={selectedLocation}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('companyLocationChange', {
                    detail: e.target.value
                  }))
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              {/* Clear Filters Button */}
              <motion.button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('companyClearFilters'))
                }}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
                <span>Limpar filtros</span>
              </motion.button>
            </div>
          </div>

          {/* View Controls and Results */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <div className="text-gray-400 text-sm">
              {filteredCount} {activeTab === 'companies' ? 'empresa' : 'vaga'}{filteredCount !== 1 ? 's' : ''} encontrada{filteredCount !== 1 ? 's' : ''}
            </div>

            {/* View Mode Toggle */}
            {activeTab === 'companies' && (
              <div className="flex items-center bg-gray-800 rounded-lg p-1">
                <motion.button
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('companyViewModeChange', {
                      detail: 'grid'
                    }))
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid3X3 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('companyViewModeChange', {
                      detail: 'list'
                    }))
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pt-4 border-t border-gray-700/50"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {activeTab === 'companies' ? (
                  <>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => {
                        window.dispatchEvent(new CustomEvent('companyIndustryChange', {
                          detail: e.target.value
                        }))
                      }}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>

                    <select
                      value={selectedSize}
                      onChange={(e) => {
                        window.dispatchEvent(new CustomEvent('companySizeChange', {
                          detail: e.target.value
                        }))
                      }}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <select
                      value={selectedJobType}
                      onChange={(e) => {
                        window.dispatchEvent(new CustomEvent('companyJobTypeChange', {
                          detail: e.target.value
                        }))
                      }}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>

                    <select
                      value={selectedJobLevel}
                      onChange={(e) => {
                        window.dispatchEvent(new CustomEvent('companyJobLevelChange', {
                          detail: e.target.value
                        }))
                      }}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {jobLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </>
                )}

                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    window.dispatchEvent(new CustomEvent('companyLocationChange', {
                      detail: e.target.value
                    }))
                  }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 sm:col-span-2"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Clear Filters */}
              <motion.button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('companyClearFilters'))
                }}
                className="btn-secondary text-sm flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
                <span>Limpar todos os filtros</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
