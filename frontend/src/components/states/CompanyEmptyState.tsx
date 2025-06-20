'use client'

import { motion } from 'framer-motion'
import { Building2, Briefcase } from 'lucide-react'

interface CompanyEmptyStateProps {
  activeTab: 'companies' | 'jobs'
  searchTerm?: string
}

export default function CompanyEmptyState({ activeTab, searchTerm }: CompanyEmptyStateProps) {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {activeTab === 'companies' ? (
        <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      ) : (
        <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      )}
      <h3 className="text-xl font-semibold text-white mb-2">
        Nenhum{activeTab === 'companies' ? 'a empresa' : 'a vaga'} encontrad{activeTab === 'companies' ? 'a' : 'a'}
      </h3>
      <p className="text-gray-400 mb-6">
        {searchTerm
          ? `Não encontramos ${activeTab === 'companies' ? 'empresas' : 'vagas'} para "${searchTerm}"`
          : "Tente ajustar seus filtros ou termos de busca"
        }
      </p>
      <motion.button
        className="btn-primary"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('companyClearFilters'))
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Limpar Filtros</span>
      </motion.button>
    </motion.div>
  )
}
