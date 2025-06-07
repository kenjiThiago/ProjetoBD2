'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Grid3X3, List } from 'lucide-react'

interface PathFilterBarProps {
  selectedLevel: string
  selectedDuration: string
  sortBy: string
  viewMode: 'grid' | 'list'
  showFilters: boolean
  filteredCount: number
  hasActiveFilters: boolean
}

const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"]
const durations = ["Todas", "1-2 meses", "3-4 meses", "5-6 meses", "6+ meses"]
const sortOptions = ["Mais Populares", "Melhor Avaliadas", "Mais Novas", "Menor Duração", "Menor Preço"]

export default function PathFilterBar({
  selectedLevel,
  selectedDuration,
  sortBy,
  viewMode,
  showFilters,
  filteredCount,
  hasActiveFilters
}: PathFilterBarProps) {
  return (
    <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-16 z-40 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Mobile Filter Toggle */}
            <motion.button
              className="lg:hidden btn-secondary px-4 py-2 text-sm flex items-center space-x-2"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('pathToggleFilters'))
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
                value={selectedLevel}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('pathLevelChange', {
                    detail: e.target.value
                  }))
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={selectedDuration}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('pathDurationChange', {
                    detail: e.target.value
                  }))
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
              >
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent('pathSortChange', {
                    detail: e.target.value
                  }))
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <motion.button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('pathClearFilters'))
                  }}
                  className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                  <span>Limpar filtros</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* View Controls and Results */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <div className="text-gray-400 text-sm">
              {filteredCount} trilha{filteredCount !== 1 ? 's' : ''} encontrada{filteredCount !== 1 ? 's' : ''}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-800 rounded-lg p-1">
              <motion.button
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('pathViewModeChange', {
                    detail: 'grid'
                  }))
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 className="w-4 h-4" />
              </motion.button>
              <motion.button
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('pathViewModeChange', {
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <select
                  value={selectedLevel}
                  onChange={(e) => {
                    window.dispatchEvent(new CustomEvent('pathLevelChange', {
                      detail: e.target.value
                    }))
                  }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                <select
                  value={selectedDuration}
                  onChange={(e) => {
                    window.dispatchEvent(new CustomEvent('pathDurationChange', {
                      detail: e.target.value
                    }))
                  }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                >
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => {
                    window.dispatchEvent(new CustomEvent('pathSortChange', {
                      detail: e.target.value
                    }))
                  }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('pathClearFilters'))
                  }}
                  className="btn-secondary text-sm flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                  <span>Limpar todos os filtros</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
