'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

interface PathEmptyStateProps {
  searchTerm?: string
}

export default function PathEmptyState({ searchTerm }: PathEmptyStateProps) {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">
        Nenhuma trilha encontrada
      </h3>
      <p className="text-gray-400 mb-6">
        {searchTerm
          ? `Não encontramos trilhas para "${searchTerm}"`
          : "Tente ajustar seus filtros ou termos de busca"
        }
      </p>
      <motion.button
        className="btn-primary"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('pathClearFilters'))
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Limpar Filtros
      </motion.button>
    </motion.div>
  )
}
