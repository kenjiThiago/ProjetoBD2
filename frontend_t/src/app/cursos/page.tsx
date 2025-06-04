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
  X
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useSearch } from '@/hooks/useSearch'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ... (interfaces e mockCourses permanecem iguais)

interface Course {
  id: number
  title: string
  instructor: string
  instructorAvatar: string
  rating: number
  students: number
  duration: string
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
  category: string
  price: number
  originalPrice: number
  thumbnail: string
  tags: string[]
  description: string
  isBestseller?: boolean
  isNew?: boolean
  lastUpdated: string
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "JavaScript Moderno Completo - Do Zero ao Avançado",
    instructor: "Ana Silva",
    instructorAvatar: "AS",
    rating: 4.9,
    students: 2847,
    duration: "40h",
    level: "Iniciante",
    category: "Frontend",
    price: 199.90,
    originalPrice: 299.90,
    thumbnail: "js-course",
    tags: ["JavaScript", "ES6+", "DOM", "APIs"],
    description: "Aprenda JavaScript moderno desde o básico até conceitos avançados",
    isBestseller: true,
    lastUpdated: "Janeiro 2024"
  },
  {
    id: 2,
    title: "React.js com Next.js - Desenvolvimento Profissional",
    instructor: "Carlos Santos",
    instructorAvatar: "CS",
    rating: 4.8,
    students: 1923,
    duration: "35h",
    level: "Intermediário",
    category: "Frontend",
    price: 249.90,
    originalPrice: 349.90,
    thumbnail: "react-course",
    tags: ["React", "Next.js", "TypeScript", "Hooks"],
    description: "Domine React e Next.js para criar aplicações modernas",
    isNew: true,
    lastUpdated: "Dezembro 2023"
  },
  {
    id: 3,
    title: "Python para Data Science e Machine Learning",
    instructor: "Marina Costa",
    instructorAvatar: "MC",
    rating: 4.9,
    students: 3456,
    duration: "50h",
    level: "Intermediário",
    category: "Data Science",
    price: 299.90,
    originalPrice: 449.90,
    thumbnail: "python-course",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    description: "Análise de dados e machine learning com Python",
    isBestseller: true,
    lastUpdated: "Novembro 2023"
  },
  {
    id: 4,
    title: "Node.js e Express - Backend Completo",
    instructor: "Roberto Lima",
    instructorAvatar: "RL",
    rating: 4.7,
    students: 2134,
    duration: "45h",
    level: "Intermediário",
    category: "Backend",
    price: 229.90,
    originalPrice: 329.90,
    thumbnail: "node-course",
    tags: ["Node.js", "Express", "MongoDB", "APIs"],
    description: "Desenvolva APIs robustas com Node.js e Express",
    lastUpdated: "Outubro 2023"
  },
  {
    id: 5,
    title: "UI/UX Design para Desenvolvedores",
    instructor: "Juliana Ferreira",
    instructorAvatar: "JF",
    rating: 4.8,
    students: 1567,
    duration: "25h",
    level: "Iniciante",
    category: "Design",
    price: 179.90,
    originalPrice: 279.90,
    thumbnail: "design-course",
    tags: ["Figma", "Design System", "Prototipagem", "UX"],
    description: "Aprenda design thinking e criação de interfaces",
    lastUpdated: "Setembro 2023"
  },
  {
    id: 6,
    title: "DevOps com Docker e Kubernetes",
    instructor: "Pedro Oliveira",
    instructorAvatar: "PO",
    rating: 4.6,
    students: 987,
    duration: "30h",
    level: "Avançado",
    category: "DevOps",
    price: 349.90,
    originalPrice: 499.90,
    thumbnail: "devops-course",
    tags: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    description: "Automatize deploys e gerencie containers",
    isNew: true,
    lastUpdated: "Janeiro 2024"
  },
  {
    id: 7,
    title: "TypeScript Completo - JavaScript Tipado",
    instructor: "Felipe Rocha",
    instructorAvatar: "FR",
    rating: 4.8,
    students: 1876,
    duration: "28h",
    level: "Intermediário",
    category: "Frontend",
    price: 189.90,
    originalPrice: 279.90,
    thumbnail: "typescript-course",
    tags: ["TypeScript", "JavaScript", "Types", "Interfaces"],
    description: "Domine TypeScript e torne seu código mais seguro",
    lastUpdated: "Dezembro 2023"
  },
  {
    id: 8,
    title: "Vue.js 3 - Framework Progressivo",
    instructor: "Camila Souza",
    instructorAvatar: "CS",
    rating: 4.7,
    students: 1234,
    duration: "32h",
    level: "Intermediário",
    category: "Frontend",
    price: 209.90,
    originalPrice: 309.90,
    thumbnail: "vue-course",
    tags: ["Vue.js", "Composition API", "Vuex", "Vue Router"],
    description: "Construa SPAs modernas com Vue.js 3",
    lastUpdated: "Novembro 2023"
  }
]

const categories = ["Todos", "Frontend", "Backend", "Data Science", "Design", "DevOps", "Mobile"]
const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"]
const sortOptions = ["Mais Relevantes", "Mais Vendidos", "Melhor Avaliados", "Mais Novos", "Menor Preço"]

export default function CursosPage() {
  const searchParams = useSearchParams()
  const { globalSearchTerm, clearGlobalSearch } = useSearch()

  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses)
  const [pageSearchTerm, setPageSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [sortBy, setSortBy] = useState("Mais Relevantes")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 9

  // Inicializar busca apenas uma vez
  useEffect(() => {
    const urlSearch = searchParams?.get('search')
    if (urlSearch) {
      setPageSearchTerm(urlSearch)
    } else if (globalSearchTerm) {
      setPageSearchTerm(globalSearchTerm)
      clearGlobalSearch()
    }
  }, [searchParams, globalSearchTerm, clearGlobalSearch])

  // Filtrar cursos com base no termo da página
  useEffect(() => {
    let filtered = courses

    if (pageSearchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(pageSearchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(pageSearchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(pageSearchTerm.toLowerCase())) ||
        course.description.toLowerCase().includes(pageSearchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedLevel !== "Todos") {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    switch (sortBy) {
      case "Mais Vendidos":
        filtered.sort((a, b) => b.students - a.students)
        break
      case "Melhor Avaliados":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "Mais Novos":
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      case "Menor Preço":
        filtered.sort((a, b) => a.price - b.price)
        break
      default:
        if (pageSearchTerm) {
          filtered.sort((a, b) => {
            const aMatch = a.title.toLowerCase().includes(pageSearchTerm.toLowerCase()) ? 1 : 0
            const bMatch = b.title.toLowerCase().includes(pageSearchTerm.toLowerCase()) ? 1 : 0
            return bMatch - aMatch
          })
        }
        break
    }

    setFilteredCourses(filtered)
    setCurrentPage(1)
  }, [pageSearchTerm, selectedCategory, selectedLevel, sortBy, courses])

  // Paginação
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

  const clearAllFilters = () => {
    setPageSearchTerm("")
    setSelectedCategory("Todos")
    setSelectedLevel("Todos")
    setSortBy("Mais Relevantes")
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
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Explore Nossos <span className="gradient-text">Cursos</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Mais de {courses.length} cursos ministrados por especialistas da indústria
              </p>

              {/* Search Results Info */}
              {pageSearchTerm && (
                <motion.div
                  className="bg-gray-800/50 rounded-lg p-4 max-w-2xl mx-auto mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-300">
                    Resultados para: <span className="text-orange-400 font-semibold">"{pageSearchTerm}"</span>
                  </p>
                  <p className="text-gray-400 text-sm">
                    {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
                  </p>
                </motion.div>
              )}

              {/* Search Bar da Página - CORRIGIDA COM FLEXBOX */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={pageSearchTerm ? "Refine sua busca..." : "Buscar por curso, instrutor ou tecnologia..."}
                    value={pageSearchTerm}
                    onChange={(e) => setPageSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-200"
                  />

                  {/* Clear button da página com posicionamento ABSOLUTO CORRIGIDO */}
                  <AnimatePresence>
                    {pageSearchTerm && (
                      <motion.button
                        onClick={() => setPageSearchTerm("")}
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
            </motion.div>
          </div>
        </section>

        {/* Resto do componente permanece igual... */}
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
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>

                  {/* Clear Filters Button */}
                  {(pageSearchTerm || selectedCategory !== "Todos" || selectedLevel !== "Todos" || sortBy !== "Mais Relevantes") && (
                    <motion.button
                      onClick={clearAllFilters}
                      className="text-orange-400 hover:text-orange-300 text-sm flex items-center space-x-1"
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
                  {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-800 rounded-lg p-1">
                  <motion.button
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setViewMode('grid')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
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
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>

                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile Clear Filters */}
                  {(pageSearchTerm || selectedCategory !== "Todos" || selectedLevel !== "Todos" || sortBy !== "Mais Relevantes") && (
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

        {/* Courses Grid/List */}
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
              {currentCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  viewMode={viewMode}
                  variants={cardVariants}
                />
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhum curso encontrado
                </h3>
                <p className="text-gray-400 mb-6">
                  {pageSearchTerm
                    ? `Não encontramos cursos para "${pageSearchTerm}"`
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
                          ? 'bg-orange-500 text-white'
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

// Mantém o componente CourseCard igual ao anterior...
interface CourseCardProps {
  course: Course
  viewMode: 'grid' | 'list'
  variants: any
}

function CourseCard({ course, viewMode, variants }: CourseCardProps) {
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
          <div className="lg:w-64 h-48 lg:h-36 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            {course.isBestseller && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                Bestseller
              </div>
            )}
            {course.isNew && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                Novo
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {course.title}
                </h3>

                <p className="text-gray-400 mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
                    {course.instructorAvatar}
                  </div>
                  <span className="mr-4">{course.instructor}</span>
                  <div className="flex items-center mr-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="text-xs text-gray-400">+{course.tags.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex lg:flex-col items-end lg:items-end gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-400">
                    R$ {course.price.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    R$ {course.originalPrice.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <motion.button
                  className="btn-primary px-6 py-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4" />
                  <span>Acessar</span>
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
      <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        {course.isBestseller && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            Bestseller
          </div>
        )}
        {course.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            Novo
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
          {course.level}
        </span>
        <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded border border-blue-500/30">
          {course.category}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors line-clamp-2">
        {course.title}
      </h3>

      <div className="flex items-center text-gray-400 text-sm mb-3">
        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
          {course.instructorAvatar}
        </div>
        <span>{course.instructor}</span>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-semibold">{course.rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{course.duration}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {course.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
            {tag}
          </span>
        ))}
        {course.tags.length > 2 && (
          <span className="text-xs text-gray-400">+{course.tags.length - 2}</span>
        )}
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-orange-400">
            R$ {course.price.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-sm text-gray-500 line-through">
            R$ {course.originalPrice.toFixed(2).replace('.', ',')}
          </div>
        </div>
        <motion.button
          className="btn-primary px-4 py-2 flex items-center space-x-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-4 h-4" />
          <span>Acessar</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
