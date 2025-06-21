import type { Course } from '@/data/mockData'

interface Response {
  cursos_recentes: Course[]
  num_alunos: number
  num_cursos: number
  num_empresas: number
  num_professores: number
  num_vagas: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export async function getHomeData(signal?: AbortSignal): Promise<Response> {
  const url = `${API_BASE_URL}/`

  try {
    const response = await fetch(url, {
      signal, // Adicionar signal para cancelamento
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Falha Home Page`)
    }

    return response.json()
  } catch (error) {
    // Se a requisição foi cancelada, apenas re-throw o erro
    if (error.name === 'AbortError') {
      throw error
    }
    // Para outros erros, dar uma mensagem mais clara
    throw new Error('Erro na Home Page: ' + error.message)
  }
}
