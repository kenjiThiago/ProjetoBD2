'use client'

import { motion } from 'framer-motion'
import { Building2, Briefcase } from 'lucide-react'

interface CompanyTabsProps {
  activeTab: 'companies' | 'jobs'
  totalCompanies: number
  totalJobs: number
}

export default function CompanyTabs({
  activeTab,
  totalCompanies,
  totalJobs
}: CompanyTabsProps) {
  return (
    <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-16 z-40 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-4">
          <div className="bg-gray-800/50 rounded-lg p-1 flex">
            <motion.button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'companies'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('companyTabChange', {
                  detail: 'companies'
                }))
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Building2 className="w-5 h-5" />
              <span>Empresas ({totalCompanies})</span>
            </motion.button>
            <motion.button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'jobs'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('companyTabChange', {
                  detail: 'jobs'
                }))
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase className="w-5 h-5" />
              <span>Vagas ({totalJobs})</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
