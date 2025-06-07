import { useState, useEffect } from 'react'

interface Company {
  id: number
  name: string
  logo: string
  description: string
  industry: string
  size: string
  location: string
  website: string
  rating: number
  employees: string
  founded: string
  isPartner: boolean
  isPremium: boolean
  activeJobs: number
  totalHires: number
  benefits: string[]
  technologies: string[]
  culture: string[]
}

interface Job {
  id: number
  title: string
  company: string
  companyLogo: string
  location: string
  type: 'Remoto' | 'Presencial' | 'Híbrido'
  level: 'Júnior' | 'Pleno' | 'Sênior' | 'Estágio'
  salaryRange: string
  description: string
  requirements: string[]
  technologies: string[]
  benefits: string[]
  postedAt: string
  deadline: string
  applicants: number
  isUrgent?: boolean
  isNew?: boolean
  isFeatured?: boolean
}

const mockCompanies: Company[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "TC",
    description: "Líder em soluções tecnológicas inovadoras, desenvolvendo produtos que transformam a experiência digital.",
    industry: "Tecnologia",
    size: "Grande (500+ funcionários)",
    location: "São Paulo, SP",
    website: "techcorp.com",
    rating: 4.8,
    employees: "500-1000",
    founded: "2015",
    isPartner: true,
    isPremium: true,
    activeJobs: 12,
    totalHires: 45,
    benefits: ["Plano de saúde", "Vale refeição", "Home office", "Auxílio educação"],
    technologies: ["React", "Node.js", "AWS", "Python", "TypeScript"],
    culture: ["Inovação", "Diversidade", "Crescimento", "Flexibilidade"]
  },
  {
    id: 2,
    name: "DataFlow Analytics",
    logo: "DF",
    description: "Especializada em Big Data e Analytics, ajudando empresas a tomar decisões baseadas em dados.",
    industry: "Data Science",
    size: "Média (100-500 funcionários)",
    location: "Rio de Janeiro, RJ",
    website: "dataflow.com.br",
    rating: 4.6,
    employees: "200-500",
    founded: "2018",
    isPartner: true,
    isPremium: false,
    activeJobs: 8,
    totalHires: 23,
    benefits: ["Plano de saúde", "Gympass", "Licença maternidade estendida", "Stock options"],
    technologies: ["Python", "Spark", "Kafka", "Tableau", "SQL"],
    culture: ["Dados", "Precisão", "Colaboração", "Aprendizado"]
  },
  // Add more companies...
]

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Desenvolvedor React Sênior",
    company: "TechCorp Solutions",
    companyLogo: "TC",
    location: "São Paulo, SP",
    type: "Híbrido",
    level: "Sênior",
    salaryRange: "R$ 12.000 - R$ 18.000",
    description: "Buscamos um desenvolvedor React sênior para liderar projetos frontend e mentorar desenvolvedores juniores.",
    requirements: ["5+ anos com React", "TypeScript", "Next.js", "Testes automatizados", "Liderança técnica"],
    technologies: ["React", "TypeScript", "Next.js", "Jest", "Cypress"],
    benefits: ["Plano de saúde", "Vale refeição", "Home office", "Auxílio educação"],
    postedAt: "2025-06-01",
    deadline: "2025-06-30",
    applicants: 47,
    isFeatured: true
  },
  // Add more jobs...
]

export function useCompanyFilters() {
  const [companies] = useState<Company[]>(mockCompanies)
  const [jobs] = useState<Job[]>(mockJobs)
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("Todas")
  const [selectedSize, setSelectedSize] = useState("Todos")
  const [selectedLocation, setSelectedLocation] = useState("Todas")
  const [selectedJobType, setSelectedJobType] = useState("Todos")
  const [selectedJobLevel, setSelectedJobLevel] = useState("Todos")
  const [activeTab, setActiveTab] = useState<'companies' | 'jobs'>('companies')

  // Filter companies
  useEffect(() => {
    if (activeTab === 'companies') {
      let filtered = companies

      if (searchTerm) {
        filtered = filtered.filter(company =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      }

      if (selectedIndustry !== "Todas") {
        filtered = filtered.filter(company => company.industry === selectedIndustry)
      }

      if (selectedSize !== "Todos") {
        filtered = filtered.filter(company => company.size.includes(selectedSize.split(' ')[0]))
      }

      if (selectedLocation !== "Todas") {
        filtered = filtered.filter(company => company.location === selectedLocation)
      }

      setFilteredCompanies(filtered)
    }
  }, [searchTerm, selectedIndustry, selectedSize, selectedLocation, companies, activeTab])

  // Filter jobs
  useEffect(() => {
    if (activeTab === 'jobs') {
      let filtered = jobs

      if (searchTerm) {
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      }

      if (selectedJobType !== "Todos") {
        filtered = filtered.filter(job => job.type === selectedJobType)
      }

      if (selectedJobLevel !== "Todos") {
        filtered = filtered.filter(job => job.level === selectedJobLevel)
      }

      if (selectedLocation !== "Todas") {
        filtered = filtered.filter(job => job.location === selectedLocation)
      }

      setFilteredJobs(filtered)
    }
  }, [searchTerm, selectedJobType, selectedJobLevel, selectedLocation, jobs, activeTab])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedIndustry("Todas")
    setSelectedSize("Todos")
    setSelectedLocation("Todas")
    setSelectedJobType("Todos")
    setSelectedJobLevel("Todos")
  }

  return {
    companies,
    jobs,
    filteredCompanies,
    filteredJobs,
    searchTerm,
    selectedIndustry,
    selectedSize,
    selectedLocation,
    selectedJobType,
    selectedJobLevel,
    activeTab,
    setSearchTerm,
    setSelectedIndustry,
    setSelectedSize,
    setSelectedLocation,
    setSelectedJobType,
    setSelectedJobLevel,
    setActiveTab,
    clearAllFilters
  }
}
