'use client'

import { Suspense } from 'react'
import DashboardPageContent from "@/app/dashboard/components/DashboardPageContent"

// Loading fallback
function CursosLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
    </div>
  )
}

export default function CursosPage() {
  return (
    <Suspense fallback={<CursosLoading />}>
      <DashboardPageContent
        cpf={"410.567.398-00"}
      />
    </Suspense>
  )
}
