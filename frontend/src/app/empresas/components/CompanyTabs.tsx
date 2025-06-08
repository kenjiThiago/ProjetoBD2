'use client'

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
            <button
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
            >
              <Building2 className="w-5 h-5" />
              <span>Empresas ({totalCompanies})</span>
            </button>
            <button
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
            >
              <Briefcase className="w-5 h-5" />
              <span>Vagas ({totalJobs})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
