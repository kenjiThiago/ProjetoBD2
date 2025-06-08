'use client'

import { motion } from 'framer-motion'
import {
  Search,
  X,
} from 'lucide-react'

interface DashboardCourseFiltersProps {
  searchTerm: string
  selectedCategory: string
  selectedLevel: string
  selectedStatus: string
  filteredCount: number
}

const categories = ["Categorias", "Frontend", "Backend", "Data Science", "DevOps", "Mobile", "Design", "Cloud"]
const levels = ["Níveis", "Iniciante", "Intermediário", "Avançado"]
const statuses = ["Status", "Em andamento", "Concluídos", "Não iniciados"]

export default function DashboardCourseFilters({
  searchTerm,
  selectedCategory,
  selectedLevel,
  selectedStatus,
  filteredCount
}: DashboardCourseFiltersProps) {
  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "Categorias" ||
    selectedLevel !== "Níveis" ||
    selectedStatus !== "Status"

  const handleSearchChange = (value: string) => {
    window.dispatchEvent(new CustomEvent('dashboardSearchChange', {
      detail: value
    }))
  }

  const handleCategoryChange = (value: string) => {
    window.dispatchEvent(new CustomEvent('dashboardCategoryChange', {
      detail: value
    }))
  }

  const handleLevelChange = (value: string) => {
    window.dispatchEvent(new CustomEvent('dashboardLevelChange', {
      detail: value
    }))
  }

  const handleStatusChange = (value: string) => {
    window.dispatchEvent(new CustomEvent('dashboardStatusChange', {
      detail: value
    }))
  }

  const handleClearFilters = () => {
    window.dispatchEvent(new CustomEvent('dashboardClearFilters'))
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por título, instrutor ou tecnologia..."
          className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-purple-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-purple-500"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-purple-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <motion.button
              onClick={handleClearFilters}
              className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4" />
              <span>Limpar filtros</span>
            </motion.button>
          )}
        </div>

        <div className="text-gray-400 text-sm">
          {filteredCount} curso{filteredCount !== 1 ? 's' : ''} encontrado{filteredCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}
