// Dados centralizados para toda a aplicação
export interface Course {
  nome: string
  descricao: string
  duracao_formatada: string
  nivel: "Iniciante" | "Intermediário" | "Avançado"
  categoria: string
  habilidades: string[]
  certificate: true
  data_lancamento: string
  acesso: "Grátis" | "Pago"
  nome_professor: string
  numero_alunos_concluidos: number
}

export interface DashboardCourse {
  nome: string
  aulas_concluidas: number
  duracao_total: string
  nivel: "Iniciante" | "Intermediário" | "Avançado"
  categoria: string
  habilidades: string[]
  total_aulas: number
  nome_professor: string
}

export interface InProgressCourse {
  aulas_concluidas: number
  descricao: string
  categoria: string
  habilidades: string[]
  nome: string
  total_aulas: number
}

export interface Company {
  nome: string
  sigla: string
  descricao: string
  setor: string
  porte: string
  localizacao: string
  isPartner: true
  numero_vagas: number
}

export interface Job {
  id: number
  vaga_nome: string
  empresa_nome: string
  sigla: string
  localizacao: string
  modalidade: 'Remoto' | 'Presencial' | 'Híbrido'
  nivel: 'Júnior' | 'Pleno' | 'Sênior' | 'Estágio'
  salario: string
  descricao: string
  requisitos: string
  prazo: string
  numero_inscritos: number
}

export interface User {
  name: string
  avatar: string
  completedCourses: number
  inProgressCourses: number
  certificates: number
  studyTime: number
  planStatus: string
  skills: string[]
  appliedJobs: number
  totalCourses: number
}
export interface Aluno {
  cpf: string
  email: string
  nome: string
  plano: string
}

export interface LoginResponse {
  aluno: Aluno
  mensagem: string
  token?: string // caso você adicione token depois
}

export interface RegisterResponse {
  aluno: Aluno
  mensagem: string
  token?: string
}

export interface AuthContextType {
  aluno: Aluno | null
  loading: boolean
  isAuthenticated: boolean
  logout: () => void
  updateAluno: (alunoData: Partial<Aluno>) => void
}
