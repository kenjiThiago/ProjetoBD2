'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Aluno } from '@/data/mockData'

export const useAuth = () => {
  const [aluno, setAluno] = useState<Aluno | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAluno = localStorage.getItem('aluno')

      if (storedAluno) {
        try {
          const parsedAluno = JSON.parse(storedAluno)
          setAluno(parsedAluno)
        } catch (error) {
          console.error('Erro ao parsear dados do aluno:', error)
          localStorage.removeItem('aluno')
        }
      }
    }
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('aluno')
    setAluno(null)
    router.push('/')
  }

  const updateAluno = (alunoData: Partial<Aluno>) => {
    if (aluno) {
      const updatedAluno = { ...aluno, ...alunoData }
      setAluno(updatedAluno)
      localStorage.setItem('aluno', JSON.stringify(updatedAluno))
    }
  }

  const isAuthenticated = !!aluno

  return {
    aluno,
    loading,
    isAuthenticated,
    logout,
    updateAluno
  }
}
