'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function useSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Inicializar com valor da URL se estivermos na página de cursos
  const [globalSearchTerm, setGlobalSearchTerm] = useState(() => {
    if (typeof window !== 'undefined' && pathname === '/cursos') {
      return searchParams.get('search') || ''
    }
    return ''
  })

  // Função para fazer busca que navega para cursos e adiciona na URL
  const performSearch = (searchTerm: string) => {
    setGlobalSearchTerm(searchTerm)

    if (searchTerm.trim()) {
      // Se tem termo de busca, navegar para cursos com search param
      router.push(`/cursos?search=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      // Se não tem termo, navegar para cursos sem params
      router.push('/cursos')
    }
  }

  // Limpar busca global quando sair da página de cursos
  useEffect(() => {
    if (pathname !== '/cursos') {
      setGlobalSearchTerm('')
    } else {
      // Se voltou para cursos, sincronizar com URL
      const urlSearch = searchParams.get('search') || ''
      setGlobalSearchTerm(urlSearch)
    }
  }, [pathname, searchParams])

  return {
    globalSearchTerm,
    setGlobalSearchTerm,
    performSearch
  }
}
