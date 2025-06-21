'use client'

import { Suspense } from 'react'
import CompanyPageContent from './components/CompanyPageContent'

// Loading fallback
function EmpresasLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
    </div>
  )
}

export default function EmpresasPage() {
  return (
    <Suspense fallback={<EmpresasLoading />}>
      <CompanyPageContent />
    </Suspense>
  )
}
