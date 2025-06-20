'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  searchTerm?: string
}

export default function EmptyState({ searchTerm }: EmptyStateProps) {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">
        Nenhum curso encontrado
      </h3>
      <p className="text-gray-400 mb-6">
        {searchTerm
          ? `Não encontramos cursos para "${searchTerm}"`
          : "Tente ajustar seus filtros ou termos de busca"
        }
      </p>
      <motion.button
        className="btn-primary"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('clearFilters'))
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Limpar Filtros</span>
      </motion.button>
    </motion.div>
  )
}
