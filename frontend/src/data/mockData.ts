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
  companyLogo: string
  localizacao: string
  modalidade: 'Remoto' | 'Presencial' | 'Híbrido'
  nivel: 'Júnior' | 'Pleno' | 'Sênior' | 'Estágio'
  salario: string
  descricao: string
  requisitos: string[]
  prazo: string
  numero_inscritos: number
}
