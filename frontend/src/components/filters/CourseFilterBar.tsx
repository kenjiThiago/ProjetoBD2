'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Grid3X3, List } from 'lucide-react'

interface FilterBarProps {
  selectedCategory: string
  selectedLevel: string
  selectedAccess: string
  sortBy: string
  viewMode: 'grid' | 'list'
  showFilters: boolean
  filteredCount: number
}

const categories = ["Categoria", "Frontend", "Backend", "Data Science", "Mobile", "DevOps", "Design", "Cloud"]
const levels = ["Nível", "Iniciante", "Intermediário", "Avançado"]
const accessTypeOptions = ["Acesso", "Grátis", "Pago"]
const sortOptions = ["Ordenação", "Mais Recentes"]

export default function FilterBar({
  selectedCategory,
  selectedLevel,
  selectedAccess,
  sortBy,
  viewMode,
  showFilters,
  filteredCount
}: FilterBarProps) {
  return (
    <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-16 z-30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Mobile Filter Toggle */}
            <motion.button
              className="lg:hidden btn-secondary-mobile px-4 py-2 text-sm flex items-center space-x-2"
              onClick={() => {
                // Dispatch custom event para comunicação
                window.dispatchEvent(new CustomEvent('toggleFilters'))
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros</span>
            </motion.button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('categoryChange', {
                    detail: e.target.value
                  }))
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('levelChange', {
                    detail: e.target.value
                  }))
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={selectedAccess}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('accessChange', {
                    detail: e.target.value
                  }))
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
              >
                {accessTypeOptions.map(accessType => (
                  <option key={accessType} value={accessType}>{accessType}</option>
                ))}
              </select>

              {/* Clear Filters Button */}
              <motion.button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('clearFilters'))
                }}
                className="text-orange-400 text-sm flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
                <span>Limpar filtros</span>
              </motion.button>
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('sortChange', {
                    detail: e.target.value
                  }))
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <div className="text-gray-400 text-sm">
                {filteredCount} curso{filteredCount !== 1 ? 's' : ''} encontrado{filteredCount !== 1 ? 's' : ''}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-800 rounded-lg p-1">
              <motion.button
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('viewModeChange', {
                    detail: 'grid'
                  }))
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 className="w-4 h-4" />
              </motion.button>
              <motion.button
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('viewModeChange', {
                    detail: 'list'
                  }))
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="w-4 h-4" />
              </motion.button>
            </div>
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
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    window.dispatchEvent(new CustomEvent('categoryChange', {
                      detail: e.target.value
                    }))
                  }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedLevel}
                  onChange={(e) => {
                    window.dispatchEvent(new CustomEvent('levelChange', {
                      detail: e.target.value
                    }))
                  }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                <select
                  value={selectedAccess}
                  onChange={(e) => {
                    window.dispatchEvent(new CustomEvent('accessChange', {
                      detail: e.target.value
                    }))
                  }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                >
                  {accessTypeOptions.map(accessType => (
                    <option key={accessType} value={accessType}>{accessType}</option>
                  ))}
                </select>

              </div>

              {/* Mobile Clear Filters */}
              <motion.button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('clearFilters'))
                }}
                className="btn-secondary-mobile text-sm flex items-center space-x-2"
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
