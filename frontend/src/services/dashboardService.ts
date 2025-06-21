import type { DashboardCourse, InProgressCourse } from '@/data/mockData'

export interface CourseFilters {
  search?: string
  category?: string
  level?: string
  status?: string
}

interface Student {
  card_cursos: DashboardCourse[]
  habilidades_aluno: string[]
  nome: string
  num_certificados: number
  num_cursos_andamento: number
  num_horas_estudo: number
  num_vagas_inscritas: number
  plano: string
  total_cursos: number
  visao_geral: InProgressCourse[]
}

interface Response {
  alunos: Student[]
  total_cursos: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export async function getDashboardInfo(filters: CourseFilters = {}, cpf: string, signal?: AbortSignal): Promise<Response> {
  const searchParams = new URLSearchParams()
  if (filters.search) searchParams.append('search', filters.search)
  if (filters.category && filters.category !== 'Categorias') searchParams.append('categoria', filters.category)
  if (filters.level && filters.level !== 'Níveis') searchParams.append('nivel', filters.level)
  if (filters.status && filters.status !== 'Status') searchParams.append('status', filters.status)

  const url = `${API_BASE_URL}/alunos?cpf=${cpf}&${searchParams.toString()}`

  try {
    const response = await fetch(url, {
      signal, // Adicionar signal para cancelamento
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Falha ao buscar informações do dashboard`)
    }

    return response.json()
  } catch (error) {
    // Se a requisição foi cancelada, apenas re-throw o erro
    if (error.name === 'AbortError') {
      throw error
    }
    // Para outros erros, dar uma mensagem mais clara
    throw new Error('Erro ao buscar informações do dashboard: ' + error.message)
  }
}
