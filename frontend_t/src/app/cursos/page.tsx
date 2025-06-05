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
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Trophy,
  Heart,
  ShoppingCart,
  Eye,
  Zap,
  Award
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useSearch } from '@/hooks/useSearch'
import { courses } from '@/data/mockData'
import type { Course } from '@/data/mockData'

const categories = ["Todas", "Frontend", "Backend", "Data Science", "Mobile", "DevOps", "Design", "Cloud"]
const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"]
const durations = ["Todas", "0-10h", "10-20h", "20-30h", "30h+"]
const prices = ["Todos", "Gratuito", "R$ 0-200", "R$ 200-400", "R$ 400+"]
const sortOptions = ["Mais Relevantes", "Mais Populares", "Melhor Avaliados", "Mais Recentes", "Menor Preço", "Maior Preço"]

export default function CursosPage() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [selectedDuration, setSelectedDuration] = useState("Todas")
  const [selectedPrice, setSelectedPrice] = useState("Todos")
  const [sortBy, setSortBy] = useState("Mais Relevantes")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 9

  const searchParams = useSearchParams()
  const urlSearchTerm = searchParams.get('search') || ''
  const { globalSearchTerm, setGlobalSearchTerm } = useSearch()
  const [localSearchTerm, setLocalSearchTerm] = useState(urlSearchTerm || globalSearchTerm || '')

  // Aplicar termo de busca da URL ao carregar
  useEffect(() => {
    if (urlSearchTerm) {
      setLocalSearchTerm(urlSearchTerm)
      setGlobalSearchTerm(urlSearchTerm)
    }
  }, [urlSearchTerm, setGlobalSearchTerm])

  // Filtrar cursos
  useEffect(() => {
    let filtered = [...courses]

    // Filtro de busca
    if (localSearchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(localSearchTerm.toLowerCase())) ||
        course.category.toLowerCase().includes(localSearchTerm.toLowerCase())
      )
    }

    // Filtro de categoria
    if (selectedCategory !== "Todas") {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Filtro de nível
    if (selectedLevel !== "Todos") {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Filtro de duração
    if (selectedDuration !== "Todas") {
      filtered = filtered.filter(course => {
        const duration = parseInt(course.duration.split('h')[0])
        switch (selectedDuration) {
          case "0-10h": return duration <= 10
          case "10-20h": return duration > 10 && duration <= 20
          case "20-30h": return duration > 20 && duration <= 30
          case "30h+": return duration > 30
          default: return true
        }
      })
    }

    // Filtro de preço
    if (selectedPrice !== "Todos") {
      filtered = filtered.filter(course => {
        switch (selectedPrice) {
          case "Gratuito": return course.price === 0
          case "R$ 0-200": return course.price >= 0 && course.price <= 200
          case "R$ 200-400": return course.price > 200 && course.price <= 400
          case "R$ 400+": return course.price > 400
          default: return true
        }
      })
    }

    // Ordenação
    switch (sortBy) {
      case "Mais Populares":
        filtered.sort((a, b) => b.students - a.students)
        break
      case "Melhor Avaliados":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "Mais Recentes":
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      case "Menor Preço":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "Maior Preço":
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        // Mais Relevantes - prioriza populares, bestsellers e novos
        filtered.sort((a, b) => {
          const aScore = (a.isPopular ? 3 : 0) + (a.isBestseller ? 2 : 0) + (a.isNew ? 1 : 0)
          const bScore = (b.isPopular ? 3 : 0) + (b.isBestseller ? 2 : 0) + (b.isNew ? 1 : 0)
          return bScore - aScore
        })
    }

    setFilteredCourses(filtered)
    setCurrentPage(1)
  }, [localSearchTerm, selectedCategory, selectedLevel, selectedDuration, selectedPrice, sortBy])

  const clearAllFilters = () => {
    setLocalSearchTerm("")
    setSelectedCategory("Todas")
    setSelectedLevel("Todos")
    setSelectedDuration("Todas")
    setSelectedPrice("Todos")
    setSortBy("Mais Relevantes")
    setGlobalSearchTerm("")
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Paginação
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

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
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Todos os <span className="gradient-text">Cursos</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Descubra mais de {courses.length} cursos das tecnologias mais demandadas do mercado
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Buscar por curso, tecnologia ou instrutor..."
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-200"
                  />

                  {/* Clear button */}
                  <AnimatePresence>
                    {localSearchTerm && (
                      <motion.button
                        onClick={() => setLocalSearchTerm("")}
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

        {/* Filters and Controls */}
        <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-16 z-30 backdrop-blur-lg">
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
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>

                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>

                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {prices.map(price => (
                      <option key={price} value={price}>{price}</option>
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

              {/* Sort and View Controls */}
              <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>

                  <div className="text-gray-400 text-sm">
                    {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* View Mode Toggle */}
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
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>

                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>

                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {durations.map(duration => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>

                    <select
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {prices.map(price => (
                        <option key={price} value={price}>{price}</option>
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
            {filteredCourses.length > 0 ? (
              <>
                <motion.div
                  className={viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                  }
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${viewMode}-${currentPage}`}
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
              </>
            ) : (
              /* Empty State */
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhum curso encontrado
                </h3>
                <p className="text-gray-400 mb-6">
                  {localSearchTerm
                    ? `Não encontramos cursos para "${localSearchTerm}"`
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

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
          <div className="lg:w-64 h-40 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center">
            <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Badges overlay */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {course.isPopular && (
                <span className="bg-orange-500/90 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
                  <Trophy className="w-3 h-3" />
                  <span>Popular</span>
                </span>
              )}
              {course.isNew && (
                <span className="bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>Novo</span>
                </span>
              )}
              {course.isBestseller && (
                <span className="bg-purple-500/90 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
                  <Award className="w-3 h-3" />
                  <span>Bestseller</span>
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {course.title}
                </h3>

                <p className="text-gray-400 mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
                    {course.instructorAvatar}
                  </div>
                  <span className="font-medium text-white">{course.instructor}</span>
                </div>

                <div className="flex items-center text-gray-400 text-sm mb-3 flex-wrap gap-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.students.toLocaleString()} alunos</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white font-semibold">{course.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 4).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 4 && (
                    <span className="text-xs text-gray-400">+{course.tags.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-400">
                    R$ {course.price.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    R$ {course.originalPrice.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-xs text-orange-400 font-semibold">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    className="btn-secondary p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="btn-secondary px-4 py-2 text-sm flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver</span>
                  </motion.button>
                  <motion.button
                    className="btn-primary px-4 py-2 text-sm flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Comprar</span>
                  </motion.button>
                </div>
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
      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        {course.isPopular && (
          <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 border border-orange-500/30">
            <Trophy className="w-3 h-3" />
            <span>Popular</span>
          </span>
        )}
        {course.isNew && (
          <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 border border-green-500/30">
            <Zap className="w-3 h-3" />
            <span>Novo</span>
          </span>
        )}
        {course.isBestseller && (
          <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 border border-purple-500/30">
            <Award className="w-3 h-3" />
            <span>Bestseller</span>
          </span>
        )}
      </div>

      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
        <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
          <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
            {course.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center text-gray-400 text-sm">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
            {course.instructorAvatar}
          </div>
          <span>{course.instructor}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-semibold">{course.rating}</span>
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

        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="text-2xl font-bold text-purple-400">
              R$ {course.price.toFixed(2).replace('.', ',')}
            </div>
            <div className="text-sm text-gray-500 line-through">
              R$ {course.originalPrice.toFixed(2).replace('.', ',')}
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              className="btn-secondary p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="btn-primary px-4 py-2 flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Comprar</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
