import type { Course } from '@/data/mockData'

export interface CourseFilters {
  search?: string
  category?: string
  level?: string
  access?: string
  sortBy?: string
}

interface Response {
  cursos: Course[]
  total_cursos: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export async function getCourses(filters: CourseFilters = {}, signal?: AbortSignal): Promise<Response> {
  const searchParams = new URLSearchParams()
  if (filters.search) searchParams.append('search', filters.search)
  if (filters.category && filters.category !== 'Categoria') searchParams.append('categoria', filters.category)
  if (filters.level && filters.level !== 'Nível') searchParams.append('nivel', filters.level)
  if (filters.access && filters.access !== 'Acesso') searchParams.append('acesso', filters.access)
  if (filters.sortBy && filters.sortBy !== 'Ordenação') searchParams.append('ordenacao', filters.sortBy)

  const url = `${API_BASE_URL}/cursos?${searchParams.toString()}`

  try {
    const response = await fetch(url, {
      signal, // Adicionar signal para cancelamento
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Falha ao buscar cursos`)
    }

    return response.json()
  } catch (error) {
    // Se a requisição foi cancelada, apenas re-throw o erro
    if (error.name === 'AbortError') {
      throw error
    }
    // Para outros erros, dar uma mensagem mais clara
    throw new Error('Erro ao buscar cursos: ' + error.message)
  }
}
