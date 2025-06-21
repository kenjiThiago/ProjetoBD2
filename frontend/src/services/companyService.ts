import type { Company } from '@/data/mockData'

export interface CompanyFilters {
  search?: string
  location?: string
  size?: string
  industry?: string
}

interface Response {
  empresas: Company[]
  total_empresas: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export async function getCompanies(filters: CompanyFilters = {}, signal?: AbortSignal): Promise<Response> {
  const searchParams = new URLSearchParams()
  if (filters.search) searchParams.append('search', filters.search)
  if (filters.size && filters.size !== 'Porte') searchParams.append('porte', filters.size)
  if (filters.location && filters.location !== 'Localização') searchParams.append('localizacao', filters.location)
  if (filters.industry && filters.industry !== 'Setores') searchParams.append('setor', filters.industry)

  const url = `${API_BASE_URL}/empresas?${searchParams.toString()}`

  try {
    const response = await fetch(url, {
      signal, // Adicionar signal para cancelamento
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Falha ao buscar empresas`)
    }

    return response.json()
  } catch (error) {
    // Se a requisição foi cancelada, apenas re-throw o erro
    if (error.name === 'AbortError') {
      throw error
    }
    // Para outros erros, dar uma mensagem mais clara
    throw new Error('Erro ao buscar empresas: ' + error.message)
  }
}
