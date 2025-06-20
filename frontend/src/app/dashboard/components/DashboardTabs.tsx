'use client'

import {
  BookOpen,
  BarChart3,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DashboardTabsProps {
  activeTab: 'overview' | 'courses' | 'achievements' | 'paths'
}

export default function DashboardTabs({
  activeTab
}: DashboardTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'courses', label: 'Meus Cursos', icon: BookOpen },
  ]

  const router = useRouter()

  const handleTabChange = (tabId: string) => {
    window.dispatchEvent(new CustomEvent('dashboardTabChange', {
      detail: tabId
    }))
    const href = "dashboard?tab=" + tabId
    router.push(href)
  }

  return (
    <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-16 z-40 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-4">
          <div className="bg-gray-800/50 rounded-lg p-1 flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
