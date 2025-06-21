import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export function useUrlParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateCourseUrlParams = useCallback((params: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    // Atualizar ou remover parâmetros
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '' ||
          value === 'Categoria' || value === 'Nível' ||
          value === 'Acesso' || value === 'Ordenação') {
        current.delete(key)
      } else {
        current.set(key, value)
      }
    })

    // Construir nova URL
    const search = current.toString()
    const query = search ? `?${search}` : ''

    // Navegar para nova URL sem recarregar a página
    router.push(`${pathname}${query}`, { scroll: false })
  }, [router, pathname, searchParams])

  const updateCompanyUrlParams = useCallback((params: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    // Atualizar ou remover parâmetros
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '' ||
          value === 'Localização' || value === 'Setores' ||
          value === 'Porte') {
        current.delete(key)
      } else {
        current.set(key, value)
      }
    })

    // Construir nova URL
    const search = current.toString()
    const query = search ? `?${search}` : ''

    // Navegar para nova URL sem recarregar a página
    router.push(`${pathname}${query}`, { scroll: false })
  }, [router, pathname, searchParams])

  const getUrlParam = useCallback((key: string, defaultValue: string = '') => {
    return searchParams.get(key) || defaultValue
  }, [searchParams])

  return { updateCompanyUrlParams, updateCourseUrlParams, getUrlParam }
}
