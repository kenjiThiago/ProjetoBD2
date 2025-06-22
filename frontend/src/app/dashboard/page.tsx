'use client'

import DashboardPageContent from "@/app/dashboard/components/DashboardPageContent"
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { aluno, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirecionar para login se não autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [loading, isAuthenticated, router])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Not authenticated state
  if (!isAuthenticated || !aluno) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Redirecionando...</h1>
          <p className="text-gray-400">Você será redirecionado para o login</p>
        </div>
      </div>
    )
  }

  // Authenticated state - render content
  return (
    <DashboardPageContent
      cpf={aluno.cpf}
    />
  )
}
