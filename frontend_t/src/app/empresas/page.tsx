'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Star,
  Users,
  MapPin,
  Clock,
  Building2,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Trophy,
  Briefcase,
  DollarSign,
  Calendar,
  Eye,
  ExternalLink,
  Heart,
  Share2,
  TrendingUp,
  Award,
  Globe,
  Shield,
  Zap,
  Target
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
  {
    id: 3,
    name: "CloudNine Systems",
    logo: "C9",
    description: "Arquitetura em nuvem e DevOps, oferecendo infraestrutura escalável e segura.",
    industry: "Cloud Computing",
    size: "Pequena (50-100 funcionários)",
    location: "Florianópolis, SC",
    website: "cloudnine.tech",
    rating: 4.9,
    employees: "50-100",
    founded: "2020",
    isPartner: true,
    isPremium: true,
    activeJobs: 6,
    totalHires: 18,
    benefits: ["Trabalho remoto", "Horário flexível", "Equipamentos", "Cursos pagos"],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    culture: ["Autonomia", "Qualidade", "Inovação", "Remote-first"]
  },
  {
    id: 4,
    name: "StartupHub Ventures",
    logo: "SH",
    description: "Aceleradora que investe em startups de tecnologia em estágio inicial.",
    industry: "Venture Capital",
    size: "Pequena (10-50 funcionários)",
    location: "Belo Horizonte, MG",
    website: "startuphub.vc",
    rating: 4.5,
    employees: "20-50",
    founded: "2019",
    isPartner: false,
    isPremium: false,
    activeJobs: 3,
    totalHires: 12,
    benefits: ["Equity", "Ambiente startup", "Networking", "Mentorias"],
    technologies: ["Full Stack", "Mobile", "Blockchain", "IA"],
    culture: ["Empreendedorismo", "Agilidade", "Networking", "Inovação"]
  },
  {
    id: 5,
    name: "FinTech Revolution",
    logo: "FR",
    description: "Revolucionando o sistema financeiro com soluções digitais inovadoras e seguras.",
    industry: "FinTech",
    size: "Média (100-500 funcionários)",
    location: "São Paulo, SP",
    website: "fintechrev.com",
    rating: 4.7,
    employees: "150-300",
    founded: "2017",
    isPartner: true,
    isPremium: true,
    activeJobs: 15,
    totalHires: 67,
    benefits: ["Plano de saúde premium", "PIR", "Day off aniversário", "Massagem"],
    technologies: ["Java", "Spring", "Kafka", "React", "Microservices"],
    culture: ["Segurança", "Inovação", "Transparência", "Excelência"]
  },
  {
    id: 6,
    name: "GameDev Studios",
    logo: "GD",
    description: "Estúdio independente criando jogos mobile e web com foco em experiência do usuário.",
    industry: "Gaming",
    size: "Pequena (10-50 funcionários)",
    location: "Curitiba, PR",
    website: "gamedev.studio",
    rating: 4.4,
    employees: "15-30",
    founded: "2021",
    isPartner: false,
    isPremium: false,
    activeJobs: 4,
    totalHires: 8,
    benefits: ["Ambiente criativo", "Games gratuitos", "Eventos gaming", "Pets friendly"],
    technologies: ["Unity", "C#", "JavaScript", "WebGL", "Mobile"],
    culture: ["Criatividade", "Diversão", "Paixão", "Colaboração"]
  }
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
  {
    id: 2,
    title: "Data Scientist",
    company: "DataFlow Analytics",
    companyLogo: "DF",
    location: "Rio de Janeiro, RJ",
    type: "Remoto",
    level: "Pleno",
    salaryRange: "R$ 8.000 - R$ 12.000",
    description: "Profissional para desenvolvimento de modelos de ML e análise de grandes volumes de dados.",
    requirements: ["Python", "Pandas", "Scikit-learn", "SQL", "Estatística"],
    technologies: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "SQL"],
    benefits: ["Plano de saúde", "Gympass", "Cursos online", "Stock options"],
    postedAt: "2025-05-30",
    deadline: "2025-06-25",
    applicants: 32,
    isNew: true
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudNine Systems",
    companyLogo: "C9",
    location: "Florianópolis, SC",
    type: "Remoto",
    level: "Pleno",
    salaryRange: "R$ 10.000 - R$ 15.000",
    description: "Responsável por CI/CD, infraestrutura como código e automação de deploy.",
    requirements: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux"],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    benefits: ["100% remoto", "Horário flexível", "Equipamentos", "Cursos AWS"],
    postedAt: "2025-05-28",
    deadline: "2025-06-20",
    applicants: 28,
    isUrgent: true
  },
  {
    id: 4,
    title: "Estágio em Desenvolvimento Web",
    company: "StartupHub Ventures",
    companyLogo: "SH",
    location: "Belo Horizonte, MG",
    type: "Presencial",
    level: "Estágio",
    salaryRange: "R$ 1.200 - R$ 1.800",
    description: "Oportunidade para estudantes desenvolverem habilidades em desenvolvimento web full stack.",
    requirements: ["Estudante", "HTML/CSS/JS", "React básico", "Git", "Inglês básico"],
    technologies: ["React", "Node.js", "MongoDB", "Git", "JavaScript"],
    benefits: ["Vale transporte", "Vale refeição", "Mentorias", "Ambiente startup"],
    postedAt: "2025-06-02",
    deadline: "2025-06-15",
    applicants: 156,
    isNew: true
  },
  {
    id: 5,
    title: "Backend Developer Java",
    company: "FinTech Revolution",
    companyLogo: "FR",
    location: "São Paulo, SP",
    type: "Híbrido",
    level: "Pleno",
    salaryRange: "R$ 9.000 - R$ 14.000",
    description: "Desenvolvimento de APIs e microserviços para soluções financeiras de alta performance.",
    requirements: ["Java 11+", "Spring Boot", "Microserviços", "Apache Kafka", "Banco de dados"],
    technologies: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Docker"],
    benefits: ["Plano de saúde premium", "PIR", "Day off aniversário", "Massagem"],
    postedAt: "2025-05-29",
    deadline: "2025-06-28",
    applicants: 64,
    isFeatured: true
  },
  {
    id: 6,
    title: "Game Developer Unity",
    company: "GameDev Studios",
    companyLogo: "GD",
    location: "Curitiba, PR",
    type: "Presencial",
    level: "Júnior",
    salaryRange: "R$ 4.000 - R$ 6.000",
    description: "Desenvolvimento de jogos mobile e web usando Unity e C#.",
    requirements: ["Unity", "C#", "Game design", "Git", "Matemática"],
    technologies: ["Unity", "C#", "Blender", "Git", "Mobile"],
    benefits: ["Ambiente criativo", "Games gratuitos", "Eventos gaming", "Pets friendly"],
    postedAt: "2025-06-03",
    deadline: "2025-06-18",
    applicants: 89,
    isNew: true
  }
]

const industries = ["Todas", "Tecnologia", "Data Science", "Cloud Computing", "FinTech", "Gaming", "Venture Capital"]
const companySizes = ["Todos", "Pequena (10-50)", "Média (100-500)", "Grande (500+)"]
const locations = ["Todas", "São Paulo, SP", "Rio de Janeiro, RJ", "Florianópolis, SC", "Belo Horizonte, MG", "Curitiba, PR"]
const jobTypes = ["Todos", "Remoto", "Presencial", "Híbrido"]
const jobLevels = ["Todos", "Estágio", "Júnior", "Pleno", "Sênior"]

export default function EmpresasPage() {
  const [activeTab, setActiveTab] = useState<'companies' | 'jobs'>('companies')
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("Todas")
  const [selectedSize, setSelectedSize] = useState("Todos")
  const [selectedLocation, setSelectedLocation] = useState("Todas")
  const [selectedJobType, setSelectedJobType] = useState("Todos")
  const [selectedJobLevel, setSelectedJobLevel] = useState("Todos")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Filtrar empresas
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
    setCurrentPage(1)
  }, [searchTerm, selectedIndustry, selectedSize, selectedLocation, companies, activeTab])

  // Filtrar vagas
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
    setCurrentPage(1)
  }, [searchTerm, selectedJobType, selectedJobLevel, selectedLocation, jobs, activeTab])

  // Paginação
  const currentItems = activeTab === 'companies' ? filteredCompanies : filteredJobs
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentPageItems = currentItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(currentItems.length / itemsPerPage)

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedIndustry("Todas")
    setSelectedSize("Todos")
    setSelectedLocation("Todas")
    setSelectedJobType("Todos")
    setSelectedJobLevel("Todos")
  }

  const getJobLevelColor = (level: string) => {
    switch (level) {
      case 'Estágio': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Júnior': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Pleno': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Sênior': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Remoto': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Presencial': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Híbrido': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-blue-950/20 to-gray-900 py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-4 rounded-2xl">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Empresas <span className="gradient-text">Parceiras</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Conectamos você com as melhores oportunidades de carreira em empresas que valorizam o talento dos nossos alunos
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Buscar empresas ou vagas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-200"
                  />

                  {/* Clear button */}
                  <AnimatePresence>
                    {searchTerm && (
                      <motion.button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-700/30"
                        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        whileHover={{
                          scale: 1.15,
                          rotate: 90,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{
                          scale: 0.85,
                          transition: { duration: 0.1 }
                        }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{companies.length}+</div>
                  <div className="text-gray-400">Empresas Parceiras</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">{jobs.length}+</div>
                  <div className="text-gray-400">Vagas Ativas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">85%</div>
                  <div className="text-gray-400">Taxa de Contratação</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-16 z-40 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-4">
              <div className="bg-gray-800/50 rounded-lg p-1 flex">
                <motion.button
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === 'companies'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveTab('companies')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Building2 className="w-5 h-5" />
                  <span>Empresas ({companies.length})</span>
                </motion.button>
                <motion.button
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === 'jobs'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveTab('jobs')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Vagas ({jobs.length})</span>
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-32 z-30 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Filters Row */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Mobile Filter Toggle */}
                <motion.button
                  className="lg:hidden btn-secondary px-4 py-2 text-sm flex items-center space-x-2"
                  onClick={() => setShowFilters(!showFilters)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filtros</span>
                </motion.button>

                {/* Desktop Filters */}
                <div className="hidden lg:flex items-center space-x-4">
                  {activeTab === 'companies' ? (
                    <>
                      <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>

                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {companySizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <select
                        value={selectedJobType}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {jobTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>

                      <select
                        value={selectedJobLevel}
                        onChange={(e) => setSelectedJobLevel(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {jobLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </>
                  )}

                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>

                  {/* Clear Filters Button */}
                  <motion.button
                    onClick={clearAllFilters}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                    <span>Limpar filtros</span>
                  </motion.button>
                </div>
              </div>

              {/* View Controls and Results */}
              <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                <div className="text-gray-400 text-sm">
                  {currentItems.length} {activeTab === 'companies' ? 'empresa' : 'vaga'}{currentItems.length !== 1 ? 's' : ''} encontrada{currentItems.length !== 1 ? 's' : ''}
                </div>

                {/* View Mode Toggle - Only for companies */}
                {activeTab === 'companies' && (
                  <div className="flex items-center bg-gray-800 rounded-lg p-1">
                    <motion.button
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setViewMode('grid')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setViewMode('list')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <List className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden mt-4 pt-4 border-t border-gray-700/50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {activeTab === 'companies' ? (
                      <>
                        <select
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {industries.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>

                        <select
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {companySizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        <select
                          value={selectedJobType}
                          onChange={(e) => setSelectedJobType(e.target.value)}
                          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {jobTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>

                        <select
                          value={selectedJobLevel}
                          onChange={(e) => setSelectedJobLevel(e.target.value)}
                          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {jobLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </>
                    )}

                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 sm:col-span-2"
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile Clear Filters */}
                  <motion.button
                    onClick={clearAllFilters}
                    className="btn-secondary text-sm flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                    <span>Limpar todos os filtros</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'companies' ? (
              <motion.div
                className={viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
                }
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`companies-${currentPage}-${viewMode}`}
              >
                {currentPageItems.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company as Company}
                    viewMode={viewMode}
                    variants={cardVariants}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`jobs-${currentPage}`}
              >
                {currentPageItems.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job as Job}
                    variants={cardVariants}
                  />
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {currentItems.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {activeTab === 'companies' ? (
                  <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                ) : (
                  <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                )}
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhum{activeTab === 'companies' ? 'a empresa' : 'a vaga'} encontrad{activeTab === 'companies' ? 'a' : 'a'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm
                    ? `Não encontramos ${activeTab === 'companies' ? 'empresas' : 'vagas'} para "${searchTerm}"`
                    : "Tente ajustar seus filtros ou termos de busca"
                  }
                </p>
                <motion.button
                  className="btn-primary"
                  onClick={clearAllFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Limpar Filtros
                </motion.button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center space-x-2 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.button
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                >
                  Anterior
                </motion.button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  return (
                    <motion.button
                      key={page}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setCurrentPage(page)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {page}
                    </motion.button>
                  )
                })}

                <motion.button
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                >
                  Próximo
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

interface CompanyCardProps {
  company: Company
  viewMode: 'grid' | 'list'
  variants: any
}

function CompanyCard({ company, viewMode, variants }: CompanyCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.div
        variants={variants}
        className="card-glow card p-6 group cursor-pointer relative overflow-hidden"
        whileHover={{ y: -2 }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Logo */}
          <div className="lg:w-24 h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{company.logo}</span>
            {company.isPremium && (
              <div className="absolute top-1 right-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {company.isPartner && (
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30 flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Parceira</span>
                    </span>
                  )}
                  {company.isPremium && (
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-2 py-1 rounded border border-yellow-500/30 flex items-center space-x-1">
                      <Trophy className="w-3 h-3" />
                      <span>Premium</span>
                    </span>
                  )}
                  <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
                    {company.industry}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {company.name}
                </h3>

                <p className="text-gray-400 mb-3 line-clamp-2">
                  {company.description}
                </p>

                <div className="flex items-center text-gray-400 text-sm mb-3 flex-wrap gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{company.size}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Fundada em {company.founded}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white font-semibold">{company.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {company.technologies.slice(0, 4).map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
                      {tech}
                    </span>
                  ))}
                  {company.technologies.length > 4 && (
                    <span className="text-xs text-gray-400">+{company.technologies.length - 4}</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{company.activeJobs} vagas ativas</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>{company.totalHires} contratações</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-2">
                <motion.button
                  className="btn-secondary px-4 py-2 text-sm flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Perfil</span>
                </motion.button>
                <motion.button
                  className="btn-primary px-4 py-2 text-sm flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Ver Vagas</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid View
  return (
    <motion.div
      variants={variants}
      className="card-glow card p-6 group cursor-pointer relative overflow-hidden"
      whileHover={{ y: -5 }}
    >
      {/* Logo */}
      <div className="h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{company.logo}</span>
        {company.isPremium && (
          <div className="absolute top-2 right-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex items-center gap-2 mb-3">
        {company.isPartner && (
          <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30 flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Parceira</span>
          </span>
        )}
        <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
          {company.industry}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-1">
        {company.name}
      </h3>

      <p className="text-gray-400 mb-3 text-sm line-clamp-2">
        {company.description}
      </p>

      <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{company.location}</span>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-white font-semibold">{company.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {company.technologies.slice(0, 3).map((tech, index) => (
          <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
            {tech}
          </span>
        ))}
        {company.technologies.length > 3 && (
          <span className="text-xs text-gray-400">+{company.technologies.length - 3}</span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center">
          <Briefcase className="w-4 h-4 mr-1" />
          <span>{company.activeJobs} vagas</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{company.size.split(' ')[0]}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-2">
        <motion.button
          className="btn-secondary flex-1 py-2 text-sm flex items-center justify-center space-x-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-4 h-4" />
          <span>Ver Perfil</span>
        </motion.button>
        <motion.button
          className="btn-primary flex-1 py-2 text-sm flex items-center justify-center space-x-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Briefcase className="w-4 h-4" />
          <span>Vagas</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

interface JobCardProps {
  job: Job
  variants: any
}

function JobCard({ job, variants }: JobCardProps) {
  const getJobLevelColor = (level: string) => {
    switch (level) {
      case 'Estágio': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Júnior': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Pleno': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Sênior': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Remoto': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Presencial': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Híbrido': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const daysAgo = Math.floor((new Date().getTime() - new Date(job.postedAt).getTime()) / (1000 * 3600 * 24))

  return (
    <motion.div
      variants={variants}
      className="card-glow card p-6 group cursor-pointer relative overflow-hidden"
      whileHover={{ y: -2 }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Company Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{job.companyLogo}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {job.isFeatured && (
                  <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30 flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>Destaque</span>
                  </span>
                )}
                {job.isNew && (
                  <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded border border-green-500/30 flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>Nova</span>
                  </span>
                )}
                {job.isUrgent && (
                  <span className="bg-red-500/20 text-red-400 text-xs font-semibold px-2 py-1 rounded border border-red-500/30 flex items-center space-x-1">
                    <Target className="w-3 h-3" />
                    <span>Urgente</span>
                  </span>
                )}
                <span className={`text-xs font-semibold px-2 py-1 rounded border ${getJobLevelColor(job.level)}`}>
                  {job.level}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded border ${getJobTypeColor(job.type)}`}>
                  {job.type}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {job.title}
              </h3>

              <div className="flex items-center text-gray-400 text-sm mb-3">
                <Building2 className="w-4 h-4 mr-2" />
                <span className="font-medium text-white">{job.company}</span>
                <span className="mx-2">•</span>
                <MapPin className="w-4 h-4 mr-1" />
                <span>{job.location}</span>
              </div>

              <p className="text-gray-400 mb-3 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {job.technologies.slice(0, 4).map((tech, index) => (
                  <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
                    {tech}
                  </span>
                ))}
                {job.technologies.length > 4 && (
                  <span className="text-xs text-gray-400">+{job.technologies.length - 4}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="text-white font-semibold">{job.salaryRange}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{job.applicants} candidatos</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Há {daysAgo} dia{daysAgo !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2 lg:items-end">
              <div className="flex gap-2">
                <motion.button
                  className="btn-secondary px-4 py-2 text-sm flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-4 h-4" />
                  <span>Salvar</span>
                </motion.button>
                <motion.button
                  className="btn-secondary px-4 py-2 text-sm flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar</span>
                </motion.button>
              </div>
              <motion.button
                className="btn-primary px-6 py-3 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Candidatar-se</span>
              </motion.button>
              <div className="text-xs text-gray-400 text-right">
                Prazo: {new Date(job.deadline).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
