'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Trophy,
  Clock,
  Play,
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  Target,
  Award,
  Download,
  Share2,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3,
  Flame,
  Zap,
  Brain,
  Code,
  Headphones,
  FileText,
  Video,
  User,
  Eye,
  ArrowRight,
  PlusCircle,
  Filter,
  Heart
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  courses,
  learningPaths,
  achievements,
  activities,
  getCoursesInProgress,
  getCompletedCourses,
  getCoursesWithCertificates
} from '@/data/mockData'
import type { Course, LearningPath, Achievement, Activity } from '@/data/mockData'

export default function DashboardPage() {
  // LER SEARCHPARAMS CORRETAMENTE
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')

  // DEFINIR TAB INICIAL BASEADO NA URL
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'achievements' | 'paths'>(
    (tabFromUrl as 'overview' | 'courses' | 'achievements' | 'paths') || 'overview'
  )

  const [studyStreak, setStudyStreak] = useState(7)
  const [totalPoints, setTotalPoints] = useState(2450)
  const [weeklyGoal, setWeeklyGoal] = useState({ target: 10, completed: 7 })
  const [courseFilter, setCourseFilter] = useState('all') // all, progress, completed, not-started

  // USAR DADOS CENTRALIZADOS
  const coursesInProgress = getCoursesInProgress()
  const completedCourses = getCompletedCourses()
  const coursesWithCertificates = getCoursesWithCertificates()

  // Filtrar trilhas em andamento (que têm progresso)
  const pathsInProgress = learningPaths.filter(path => path.progress && path.progress > 0)

  // ATUALIZAR TAB QUANDO URL MUDAR
  useEffect(() => {
    if (tabFromUrl && ['overview', 'courses', 'achievements', 'paths'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl as 'overview' | 'courses' | 'achievements' | 'paths')
    }
  }, [tabFromUrl])

  const user = {
    name: "kenjiThiago",
    avatar: "KT",
    level: "Desenvolvedor Intermediário",
    joinDate: "Janeiro 2025",
    completedCourses: completedCourses.length,
    inProgressCourses: coursesInProgress.length,
    certificates: coursesWithCertificates.length,
    totalCourses: courses.length
  }

  // Filtrar cursos baseado no filtro selecionado
  const getFilteredCourses = () => {
    switch (courseFilter) {
      case 'progress':
        return coursesInProgress
      case 'completed':
        return completedCourses
      case 'not-started':
        return courses.filter(course => !course.progress || course.progress === 0)
      default:
        return courses
    }
  }

  const filteredCourses = getFilteredCourses()

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_completed': return BookOpen
      case 'lesson_completed': return CheckCircle
      case 'achievement_earned': return Trophy
      case 'streak_milestone': return Flame
      default: return Star
    }
  }

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'trophy': return Trophy
      case 'flame': return Flame
      case 'code': return Code
      case 'award': return Award
      case 'clock': return Clock
      default: return Trophy
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

      <main className="pt-8 pb-16">
        {/* Hero/Welcome Section */}
        <section className="bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900 py-12 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col lg:flex-row items-start justify-between gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Welcome Message */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{user.avatar}</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      Olá, <span className="gradient-text">{user.name}</span>! 👋
                    </h1>
                    <p className="text-gray-400">Pronto para continuar sua jornada de aprendizado?</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                    variants={cardVariants}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Flame className="w-5 h-5 text-orange-400" />
                      <span className="text-sm text-gray-400">Sequência</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{studyStreak}</div>
                    <div className="text-xs text-gray-400">dias consecutivos</div>
                  </motion.div>

                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                    variants={cardVariants}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm text-gray-400">Pontos</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{totalPoints.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">total acumulado</div>
                  </motion.div>

                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                    variants={cardVariants}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-gray-400">Cursos</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{user.completedCourses}</div>
                    <div className="text-xs text-gray-400">concluídos</div>
                  </motion.div>

                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                    variants={cardVariants}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span className="text-sm text-gray-400">Certificados</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{user.certificates}</div>
                    <div className="text-xs text-gray-400">conquistados</div>
                  </motion.div>
                </div>
              </div>

              {/* Weekly Goal Progress */}
              <motion.div
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 lg:w-80"
                variants={cardVariants}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Meta Semanal</h3>
                  <Target className="w-5 h-5 text-green-400" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progresso</span>
                      <span className="text-white font-semibold">
                        {weeklyGoal.completed}/{weeklyGoal.target} horas
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(weeklyGoal.completed / weeklyGoal.target) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-400">
                    Faltam <span className="text-white font-semibold">{weeklyGoal.target - weeklyGoal.completed}h</span> para completar sua meta!
                  </div>

                  <motion.button
                    className="w-full btn-primary py-2 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continuar Estudos
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-gray-900/50 border-b border-gray-800/50 sticky top-16 z-40 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-4">
              <div className="bg-gray-800/50 rounded-lg p-1 flex space-x-1">
                {[
                  { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                  { id: 'courses', label: 'Meus Cursos', icon: BookOpen },
                  { id: 'achievements', label: 'Conquistas', icon: Trophy },
                  { id: 'paths', label: 'Trilhas', icon: Target }
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                      onClick={() => setActiveTab(tab.id as any)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:block">{tab.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Continue Learning */}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Continue Aprendendo</h2>
                    {coursesInProgress.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {coursesInProgress.slice(0, 4).map((course) => (
                          <motion.div
                            key={course.id}
                            className="card-glow card p-6 group cursor-pointer"
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Play className="w-8 h-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                  {course.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">Próxima aula: {course.nextLesson}</p>

                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm text-gray-400">
                                    {course.completedLessons}/{course.lessons} aulas
                                  </span>
                                  <span className="text-sm font-semibold text-purple-400">
                                    {course.progress}%
                                  </span>
                                </div>

                                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                  <div
                                    className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${course.progress}%` }}
                                  />
                                </div>

                                <motion.button
                                  className="btn-primary text-sm px-4 py-2 flex items-center space-x-2"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Play className="w-4 h-4" />
                                  <span>Continuar</span>
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50"
                        variants={cardVariants}
                      >
                        <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Nenhum curso em andamento</h3>
                        <p className="text-gray-400 mb-4">Comece um novo curso para aparecer aqui</p>
                        <motion.button
                          className="btn-primary px-6 py-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.location.href = '/cursos'}
                        >
                          Explorar Cursos
                        </motion.button>
                      </motion.div>
                    )}
                  </div>

                  {/* Recent Activity & Learning Paths */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Atividade Recente</h2>
                      <div className="space-y-4">
                        {activities.slice(0, 6).map((activity) => {
                          const Icon = getActivityIcon(activity.type)
                          return (
                            <motion.div
                              key={activity.id}
                              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                              variants={cardVariants}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="bg-purple-500/20 rounded-lg p-2">
                                  <Icon className="w-4 h-4 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-white font-medium">{activity.title}</h4>
                                  <p className="text-gray-400 text-sm">{activity.description}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-500">
                                      {new Date(activity.timestamp).toLocaleString('pt-BR')}
                                    </span>
                                    {activity.points && (
                                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                                        +{activity.points} pontos
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Learning Paths Progress */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Trilhas em Andamento</h2>
                      <div className="space-y-4">
                        {pathsInProgress.length > 0 ? (
                          <>
                            {pathsInProgress.map((path) => (
                              <motion.div
                                key={path.id}
                                className="card-glow card p-6 group cursor-pointer"
                                variants={cardVariants}
                                whileHover={{ y: -2 }}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                                    {path.title}
                                  </h3>
                                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                </div>

                                <div className="space-y-3">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">
                                      {path.completedCourses}/{path.totalCourses} cursos
                                    </span>
                                    <span className="text-purple-400 font-semibold">
                                      {path.progress}%
                                    </span>
                                  </div>

                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${path.progress}%` }}
                                    />
                                  </div>

                                  <div className="text-sm text-gray-400">
                                    Conclusão estimada: {path.estimatedCompletion}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </>
                        ) : (
                          <motion.div
                            className="text-center py-8 bg-gray-800/30 rounded-xl border border-gray-700/50"
                            variants={cardVariants}
                          >
                            <Target className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                            <h3 className="text-md font-semibold text-white mb-2">Nenhuma trilha iniciada</h3>
                            <p className="text-gray-400 text-sm mb-4">Escolha uma trilha para acelerar seu aprendizado</p>
                          </motion.div>
                        )}

                        <motion.button
                          className="w-full btn-secondary py-3 flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.location.href = '/trilhas'}
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>Explorar Trilhas</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* COURSES TAB */}
              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-white">Meus Cursos</h2>
                    <div className="flex items-center space-x-4">
                      <select
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="all">Todos os cursos ({courses.length})</option>
                        <option value="progress">Em andamento ({coursesInProgress.length})</option>
                        <option value="completed">Concluídos ({completedCourses.length})</option>
                        <option value="not-started">Não iniciados ({courses.filter(c => !c.progress || c.progress === 0).length})</option>
                      </select>
                    </div>
                  </div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredCourses.map((course) => (
                      <motion.div
                        key={course.id}
                        className="card-glow card p-6 group cursor-pointer"
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                      >
                        <div className="h-40 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
                          <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                          {course.progress === 100 && (
                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {course.isPopular && (
                            <div className="absolute top-2 left-2 bg-orange-500/90 text-white text-xs font-bold px-2 py-1 rounded">
                              Popular
                            </div>
                          )}
                          {course.isNew && (
                            <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded">
                              Novo
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(course.level)}`}>
                              {course.level}
                            </span>
                            <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
                              {course.category}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                            {course.title}
                          </h3>

                          <div className="flex items-center text-gray-400 text-sm">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold">
                              {course.instructorAvatar}
                            </div>
                            <span>Por {course.instructor}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-white font-semibold">{course.rating}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Progresso</span>
                              <span className="text-white font-semibold">{course.progress || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress || 0}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-400">
                              {course.completedLessons || 0}/{course.lessons} aulas concluídas
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {course.progress === 100 ? (
                              <>
                                <motion.button
                                  className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center space-x-1"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Eye className="w-4 h-4" />
                                  <span>Revisar</span>
                                </motion.button>
                                {course.certificate && (
                                  <motion.button
                                    className="flex-1 btn-primary py-2 text-sm flex items-center justify-center space-x-1"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Download className="w-4 h-4" />
                                    <span>Certificado</span>
                                  </motion.button>
                                )}
                              </>
                            ) : (
                              <motion.button
                                className="w-full btn-primary py-2 text-sm flex items-center justify-center space-x-1"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Play className="w-4 h-4" />
                                <span>{course.progress && course.progress > 0 ? 'Continuar' : 'Iniciar'}</span>
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

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
                        Não há cursos nesta categoria ainda
                      </p>
                      <motion.button
                        className="btn-primary px-6 py-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/cursos'}
                      >
                        Explorar Cursos
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ACHIEVEMENTS TAB */}
              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Suas Conquistas</h2>
                    <p className="text-gray-400">Cada marco de aprendizado é uma vitória!</p>

                    <div className="flex justify-center mt-6">
                      <div className="bg-gray-800/50 rounded-lg p-4 flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400 mb-1">{achievements.length}</div>
                          <div className="text-xs text-gray-400">Conquistadas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-400 mb-1">{achievements.reduce((sum, a) => sum + a.points, 0)}</div>
                          <div className="text-xs text-gray-400">Pontos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400 mb-1">3</div>
                          <div className="text-xs text-gray-400">A desbloquear</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {achievements.map((achievement) => {
                      const Icon = getAchievementIcon(achievement.icon)
                      return (
                        <motion.div
                          key={achievement.id}
                          className="card-glow card p-6 text-center group cursor-pointer"
                          variants={cardVariants}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                          <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>

                          <div className="flex items-center justify-between text-sm mb-3">
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/30">
                              {achievement.category}
                            </span>
                            <span className="text-orange-400 font-semibold">
                              +{achievement.points} pts
                            </span>
                          </div>

                          <div className="text-xs text-gray-500">
                            Conquistado em {new Date(achievement.earnedAt).toLocaleDateString('pt-BR')}
                          </div>
                        </motion.div>
                      )
                    })}

                    {/* Locked Achievement Examples */}
                    <motion.div
                      className="card p-6 text-center opacity-50 cursor-not-allowed"
                      variants={cardVariants}
                    >
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-8 h-8 text-gray-400" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-400 mb-2">Master Full Stack</h3>
                      <p className="text-gray-500 text-sm mb-4">Complete 5 cursos de Full Stack</p>

                      <div className="text-xs text-gray-600 mb-2">
                        Progresso: {completedCourses.filter(c => c.category === 'Frontend' || c.category === 'Backend').length}/5
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(completedCourses.filter(c => c.category === 'Frontend' || c.category === 'Backend').length / 5) * 100}%` }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="card p-6 text-center opacity-50 cursor-not-allowed"
                      variants={cardVariants}
                    >
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Flame className="w-8 h-8 text-gray-400" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-400 mb-2">Sequência de 30 Dias</h3>
                      <p className="text-gray-500 text-sm mb-4">Estude por 30 dias consecutivos</p>

                      <div className="text-xs text-gray-600 mb-2">
                        Progresso: {studyStreak}/30 dias
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(studyStreak / 30) * 100}%` }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="card p-6 text-center opacity-50 cursor-not-allowed"
                      variants={cardVariants}
                    >
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-gray-400" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-400 mb-2">5.000 Pontos</h3>
                      <p className="text-gray-500 text-sm mb-4">Acumule 5.000 pontos</p>

                      <div className="text-xs text-gray-600 mb-2">
                        Progresso: {totalPoints.toLocaleString()}/5.000
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(totalPoints / 5000) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* PATHS TAB */}
              {activeTab === 'paths' && (
                <motion.div
                  key="paths"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Minhas Trilhas</h2>
                    <motion.button
                      className="btn-primary px-4 py-2 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.href = '/trilhas'}
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Explorar Trilhas</span>
                    </motion.button>
                  </div>

                  <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {learningPaths.map((path) => (
                      <motion.div
                        key={path.id}
                        className="card-glow card p-6 group cursor-pointer"
                        variants={cardVariants}
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                          <div className="lg:w-24 h-24 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg relative overflow-hidden flex items-center justify-center flex-shrink-0">
                            <Target className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                            {path.isPopular && (
                              <div className="absolute top-1 right-1 bg-orange-500/90 text-white text-xs font-bold px-1 py-0.5 rounded">
                                Popular
                              </div>
                            )}
                            {path.isNew && (
                              <div className="absolute top-1 right-1 bg-green-500/90 text-white text-xs font-bold px-1 py-0.5 rounded">
                                Nova
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
                                {path.category}
                              </span>
                              <span className="text-xs text-gray-400">
                                {path.completedCourses || 0}/{path.courses} cursos
                              </span>
                              {path.progress && path.progress > 0 && (
                                <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded border border-green-500/30">
                                  Em andamento
                                </span>
                              )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                              {path.title}
                            </h3>

                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                              {path.description}
                            </p>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Progresso geral</span>
                                <span className="text-purple-400 font-semibold">{path.progress || 0}%</span>
                              </div>

                              <div className="w-full bg-gray-700 rounded-full h-3">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${path.progress || 0}%` }}
                                />
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-400">
                                <span>Duração: {path.duration}</span>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                    <span className="text-white font-semibold">{path.rating}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    <span>{path.students.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>

                              {path.estimatedCompletion && (
                                <div className="text-sm text-gray-400">
                                  Conclusão estimada: {path.estimatedCompletion}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 lg:items-end lg:w-48">
                            <div className="text-right mb-2">
                              <div className="text-xl font-bold text-blue-400">
                                R$ {path.price.toFixed(2).replace('.', ',')}
                              </div>
                              <div className="text-sm text-gray-500 line-through">
                                R$ {path.originalPrice.toFixed(2).replace('.', ',')}
                              </div>
                            </div>

                            <motion.button
                              className="btn-primary px-6 py-3 flex items-center space-x-2 w-full justify-center"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="w-4 h-4" />
                              <span>{path.progress && path.progress > 0 ? 'Continuar' : 'Iniciar'}</span>
                            </motion.button>
                            <motion.button
                              className="btn-secondary px-4 py-2 text-sm flex items-center space-x-1 w-full justify-center"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Eye className="w-4 h-4" />
                              <span>Ver Detalhes</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {learningPaths.length === 0 && (
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
                        Explore nossas trilhas e acelere seu aprendizado
                      </p>
                      <motion.button
                        className="btn-primary px-6 py-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/trilhas'}
                      >
                        Explorar Trilhas
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
