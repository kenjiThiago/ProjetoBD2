import type { Job } from '@/data/mockData'

export interface JobFilters {
  search?: string
  location?: string
  level?: string
  type?: string
}

interface Response {
  vagas: Job[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export async function getJobs(filters: JobFilters = {}, signal?: AbortSignal): Promise<Response> {
  const searchParams = new URLSearchParams()
  if (filters.search) searchParams.append('search', filters.search)
  if (filters.type && filters.type !== 'Modalidade') searchParams.append('modalidade', filters.type)
  if (filters.level && filters.level !== 'Nível') searchParams.append('nivel', filters.level)
  if (filters.location && filters.location !== 'Localização') searchParams.append('localizacao', filters.location)

  const url = `${API_BASE_URL}/vagas?${searchParams.toString()}`

  try {
    const response = await fetch(url, {
      signal, // Adicionar signal para cancelamento
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Falha ao buscar vagas`)
    }

    return response.json()
  } catch (error) {
    // Se a requisição foi cancelada, apenas re-throw o erro
    if (error.name === 'AbortError') {
      throw error
    }
    // Para outros erros, dar uma mensagem mais clara
    throw new Error('Erro ao buscar vagas: ' + error.message)
  }
}
