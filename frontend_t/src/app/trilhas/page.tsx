'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  Play,
  BookOpen,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Trophy,
  Target,
  Zap,
  Code,
  Palette,
  Database,
  Cloud,
  Smartphone,
  Brain
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LearningPath {
  id: number
  title: string
  description: string
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
  category: string
  duration: string
  courses: number
  students: number
  rating: number
  progress?: number
  thumbnail: string
  instructor: string
  instructorAvatar: string
  tags: string[]
  skills: string[]
  isPopular?: boolean
  isNew?: boolean
  price: number
  originalPrice: number
  completionRate: number
}

const mockLearningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Desenvolvedor Full Stack Moderno",
    description: "Trilha completa para se tornar um desenvolvedor full stack usando as tecnologias mais demandadas do mercado",
    level: "Iniciante",
    category: "Full Stack",
    duration: "6 meses",
    courses: 12,
    students: 4567,
    rating: 4.9,
    thumbnail: "fullstack-path",
    instructor: "Carlos Santos",
    instructorAvatar: "CS",
    tags: ["React", "Node.js", "TypeScript", "MongoDB"],
    skills: ["Frontend", "Backend", "Database", "Deploy"],
    isPopular: true,
    price: 899.90,
    originalPrice: 1299.90,
    completionRate: 87
  },
  {
    id: 2,
    title: "Data Science com Python",
    description: "Aprenda análise de dados, machine learning e inteligência artificial do zero ao avançado",
    level: "Intermediário",
    category: "Data Science",
    duration: "4 meses",
    courses: 8,
    students: 3245,
    rating: 4.8,
    thumbnail: "datascience-path",
    instructor: "Marina Costa",
    instructorAvatar: "MC",
    tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"],
    skills: ["Análise de Dados", "Machine Learning", "Visualização", "IA"],
    price: 799.90,
    originalPrice: 1199.90,
    completionRate: 92
  },
  {
    id: 3,
    title: "Frontend Especialista React",
    description: "Domine React, Next.js e todo o ecossistema frontend para criar aplicações profissionais",
    level: "Intermediário",
    category: "Frontend",
    duration: "3 meses",
    courses: 6,
    students: 2890,
    rating: 4.9,
    thumbnail: "react-path",
    instructor: "Ana Silva",
    instructorAvatar: "AS",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    skills: ["Componentes", "Hooks", "Performance", "Testing"],
    isNew: true,
    price: 599.90,
    originalPrice: 899.90,
    completionRate: 89
  },
  {
    id: 4,
    title: "DevOps e Cloud Computing",
    description: "Aprenda a automatizar deploys, gerenciar infraestrutura e trabalhar com AWS",
    level: "Avançado",
    category: "DevOps",
    duration: "5 meses",
    courses: 10,
    students: 1876,
    rating: 4.7,
    thumbnail: "devops-path",
    instructor: "Pedro Oliveira",
    instructorAvatar: "PO",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    skills: ["Containers", "Orquestração", "Monitoramento", "Segurança"],
    price: 999.90,
    originalPrice: 1499.90,
    completionRate: 84
  },
  {
    id: 5,
    title: "Mobile Development Flutter",
    description: "Desenvolva apps nativos para iOS e Android com Flutter e Dart",
    level: "Intermediário",
    category: "Mobile",
    duration: "4 meses",
    courses: 7,
    students: 2134,
    rating: 4.6,
    thumbnail: "flutter-path",
    instructor: "Juliana Ferreira",
    instructorAvatar: "JF",
    tags: ["Flutter", "Dart", "Firebase", "API"],
    skills: ["UI/UX Mobile", "Estado", "Navegação", "Performance"],
    price: 699.90,
    originalPrice: 999.90,
    completionRate: 91
  },
  {
    id: 6,
    title: "UI/UX Design Completo",
    description: "Design thinking, prototipagem e criação de interfaces modernas e funcionais",
    level: "Iniciante",
    category: "Design",
    duration: "3 meses",
    courses: 5,
    students: 3456,
    rating: 4.8,
    thumbnail: "design-path",
    instructor: "Roberto Lima",
    instructorAvatar: "RL",
    tags: ["Figma", "Design System", "Prototipagem", "Usabilidade"],
    skills: ["Research", "Wireframes", "Visual Design", "Testing"],
    isPopular: true,
    price: 499.90,
    originalPrice: 799.90,
    completionRate: 94
  }
]

const categories = ["Todas", "Full Stack", "Frontend", "Backend", "Data Science", "Mobile", "DevOps", "Design"]
const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"]
const durations = ["Todas", "1-2 meses", "3-4 meses", "5-6 meses", "6+ meses"]
const sortOptions = ["Mais Populares", "Melhor Avaliadas", "Mais Novas", "Menor Duração", "Menor Preço"]

const categoryIcons: Record<string, any> = {
  "Full Stack": Code,
  "Frontend": Palette,
  "Backend": Database,
  "Data Science": Brain,
  "Mobile": Smartphone,
  "DevOps": Cloud,
  "Design": Palette
}

export default function TrilhasPage() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(mockLearningPaths)
  const [filteredPaths, setFilteredPaths] = useState<LearningPath[]>(mockLearningPaths)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [selectedDuration, setSelectedDuration] = useState("Todas")
  const [sortBy, setSortBy] = useState("Mais Populares")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pathsPerPage = 6

  // Filtrar trilhas
  useEffect(() => {
    let filtered = learningPaths

    if (searchTerm) {
      filtered = filtered.filter(path =>
        path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        path.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== "Todas") {
      filtered = filtered.filter(path => path.category === selectedCategory)
    }

    if (selectedLevel !== "Todos") {
      filtered = filtered.filter(path => path.level === selectedLevel)
    }

    if (selectedDuration !== "Todas") {
      filtered = filtered.filter(path => {
        const duration = parseInt(path.duration)
        switch (selectedDuration) {
          case "1-2 meses": return duration <= 2
          case "3-4 meses": return duration >= 3 && duration <= 4
          case "5-6 meses": return duration >= 5 && duration <= 6
          case "6+ meses": return duration > 6
          default: return true
        }
      })
    }

    // Ordenação
    switch (sortBy) {
      case "Melhor Avaliadas":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "Mais Novas":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "Menor Duração":
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
        break
      case "Menor Preço":
        filtered.sort((a, b) => a.price - b.price)
        break
      default: // Mais Populares
        filtered.sort((a, b) => b.students - a.students)
        break
    }

    setFilteredPaths(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration, sortBy, learningPaths])

  // Paginação
  const indexOfLastPath = currentPage * pathsPerPage
  const indexOfFirstPath = indexOfLastPath - pathsPerPage
  const currentPaths = filteredPaths.slice(indexOfFirstPath, indexOfLastPath)
  const totalPages = Math.ceil(filteredPaths.length / pathsPerPage)

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Todas")
    setSelectedLevel("Todos")
    setSelectedDuration("Todas")
    setSortBy("Mais Populares")
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
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
        <section className="bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900 py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
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
                <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-4 rounded-2xl">
                  <Target className="w-12 h-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Trilhas de <span className="gradient-text">Aprendizado</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Caminhos estruturados para você dominar as tecnologias mais demandadas do mercado
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Buscar por trilha, tecnologia ou habilidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-200"
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
                  <div className="text-3xl font-bold text-purple-400 mb-2">{learningPaths.length}+</div>
                  <div className="text-gray-400">Trilhas Disponíveis</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">15k+</div>
                  <div className="text-gray-400">Estudantes Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">89%</div>
                  <div className="text-gray-400">Taxa de Conclusão</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Explore por Categoria</h2>
              <p className="text-gray-400">Escolha a área que mais combina com seus objetivos</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.slice(1).map((category, index) => {
                const Icon = categoryIcons[category] || Code
                const isSelected = selectedCategory === category

                return (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center space-y-2 ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                        : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700/50 hover:border-gray-600'
                    }`}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-8 h-8" />
                    <span className="text-sm font-medium text-center">{category}</span>
                  </motion.button>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-16 z-40 backdrop-blur-lg">
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
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>

                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                  >
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>

                  {/* Clear Filters Button */}
                  {(searchTerm || selectedCategory !== "Todas" || selectedLevel !== "Todos" || selectedDuration !== "Todas" || sortBy !== "Mais Populares") && (
                    <motion.button
                      onClick={clearAllFilters}
                      className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                      <span>Limpar filtros</span>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* View Controls and Results */}
              <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                <div className="text-gray-400 text-sm">
                  {filteredPaths.length} trilha{filteredPaths.length !== 1 ? 's' : ''} encontrada{filteredPaths.length !== 1 ? 's' : ''}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-800 rounded-lg p-1">
                  <motion.button
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setViewMode('grid')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setViewMode('list')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <List className="w-4 h-4" />
                  </motion.button>
                </div>
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>

                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                    >
                      {durations.map(duration => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile Clear Filters */}
                  {(searchTerm || selectedCategory !== "Todas" || selectedLevel !== "Todos" || selectedDuration !== "Todas" || sortBy !== "Mais Populares") && (
                    <motion.button
                      onClick={clearAllFilters}
                      className="btn-secondary text-sm flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                      <span>Limpar todos os filtros</span>
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Learning Paths Grid/List */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
              }
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${currentPage}-${viewMode}`}
            >
              {currentPaths.map((path) => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  viewMode={viewMode}
                  variants={cardVariants}
                />
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredPaths.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhuma trilha encontrada
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm
                    ? `Não encontramos trilhas para "${searchTerm}"`
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
                          ? 'bg-purple-500 text-white'
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

interface LearningPathCardProps {
  path: LearningPath
  viewMode: 'grid' | 'list'
  variants: any
}

function LearningPathCard({ path, viewMode, variants }: LearningPathCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={variants}
        className="card-glow card p-6 group cursor-pointer relative overflow-hidden"
        whileHover={{ y: -2 }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Thumbnail */}
          <div className="lg:w-80 h-48 lg:h-40 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Target className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            {path.isPopular && (
              <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
                <Trophy className="w-3 h-3" />
                <span>Popular</span>
              </div>
            )}
            {path.isNew && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>Nova</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(path.level)}`}>
                    {path.level}
                  </span>
                  <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
                    {path.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {path.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {path.title}
                </h3>

                <p className="text-gray-400 mb-3 line-clamp-2">
                  {path.description}
                </p>

                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
                    {path.instructorAvatar}
                  </div>
                  <span className="mr-4">{path.instructor}</span>
                  <div className="flex items-center mr-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white font-semibold">{path.rating}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{path.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{path.courses} cursos</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {path.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
                      {skill}
                    </span>
                  ))}
                  {path.skills.length > 3 && (
                    <span className="text-xs text-gray-400">+{path.skills.length - 3}</span>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Taxa de Conclusão</span>
                    <span>{path.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${path.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex lg:flex-col items-end lg:items-end gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-400">
                    R$ {path.price.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    R$ {path.originalPrice.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <motion.button
                  className="btn-primary px-6 py-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4" />
                  <span>Iniciar Trilha</span>
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
      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <Target className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        {path.isPopular && (
          <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
            <Trophy className="w-3 h-3" />
            <span>Popular</span>
          </div>
        )}
        {path.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Nova</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(path.level)}`}>
          {path.level}
        </span>
        <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
          {path.category}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
        {path.title}
      </h3>

      <p className="text-gray-400 mb-3 text-sm line-clamp-2">
        {path.description}
      </p>

      <div className="flex items-center text-gray-400 text-sm mb-3">
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
          {path.instructorAvatar}
        </div>
        <span>{path.instructor}</span>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-semibold">{path.rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{path.students.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{path.duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{path.courses}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {path.skills.slice(0, 2).map((skill, index) => (
          <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
            {skill}
          </span>
        ))}
        {path.skills.length > 2 && (
          <span className="text-xs text-gray-400">+{path.skills.length - 2}</span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Taxa de Conclusão</span>
          <span>{path.completionRate}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${path.completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-purple-400">
            R$ {path.price.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-sm text-gray-500 line-through">
            R$ {path.originalPrice.toFixed(2).replace('.', ',')}
          </div>
        </div>
        <motion.button
          className="btn-primary px-4 py-2 flex items-center space-x-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-4 h-4" />
          <span>Iniciar</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
