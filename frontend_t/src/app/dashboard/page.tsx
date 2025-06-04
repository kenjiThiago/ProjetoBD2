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
  Filter
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  totalLessons: number
  completedLessons: number
  duration: string
  category: string
  level: string
  thumbnail: string
  lastAccessed: string
  nextLesson: string
  rating?: number
  certificate?: boolean
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  earnedAt: string
  category: string
  points: number
}

interface Activity {
  id: number
  type: 'course_completed' | 'lesson_completed' | 'achievement_earned' | 'streak_milestone'
  title: string
  description: string
  timestamp: string
  icon: string
  points?: number
}

interface LearningPath {
  id: number
  title: string
  progress: number
  totalCourses: number
  completedCourses: number
  estimatedCompletion: string
  category: string
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "React Avançado com TypeScript",
    instructor: "Ana Silva",
    progress: 75,
    totalLessons: 32,
    completedLessons: 24,
    duration: "8h 30m",
    category: "Frontend",
    level: "Avançado",
    thumbnail: "react-advanced",
    lastAccessed: "2025-06-04",
    nextLesson: "Context API com TypeScript",
    rating: 4.9,
    certificate: false
  },
  {
    id: 2,
    title: "Node.js API Development",
    instructor: "Carlos Santos",
    progress: 45,
    totalLessons: 28,
    completedLessons: 13,
    duration: "12h 15m",
    category: "Backend",
    level: "Intermediário",
    thumbnail: "nodejs-api",
    lastAccessed: "2025-06-03",
    nextLesson: "Middleware de Autenticação",
    rating: 4.8,
    certificate: false
  },
  {
    id: 3,
    title: "Python para Data Science",
    instructor: "Marina Costa",
    progress: 100,
    totalLessons: 25,
    completedLessons: 25,
    duration: "15h 45m",
    category: "Data Science",
    level: "Intermediário",
    thumbnail: "python-ds",
    lastAccessed: "2025-05-28",
    nextLesson: "Concluído",
    rating: 5.0,
    certificate: true
  },
  {
    id: 4,
    title: "Docker e Kubernetes",
    instructor: "Pedro Oliveira",
    progress: 20,
    totalLessons: 18,
    completedLessons: 4,
    duration: "10h 20m",
    category: "DevOps",
    level: "Intermediário",
    thumbnail: "docker-k8s",
    lastAccessed: "2025-06-02",
    nextLesson: "Containers e Imagens",
    rating: 4.7,
    certificate: false
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    instructor: "Juliana Costa",
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    duration: "6h 45m",
    category: "Design",
    level: "Iniciante",
    thumbnail: "uiux-design",
    lastAccessed: "2025-05-15",
    nextLesson: "Concluído",
    rating: 4.8,
    certificate: true
  }
]

const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: "Primeira Conquista",
    description: "Completou seu primeiro curso",
    icon: "trophy",
    earnedAt: "2025-05-15",
    category: "Marcos",
    points: 100
  },
  {
    id: 2,
    title: "Sequência de 7 Dias",
    description: "Estudou por 7 dias consecutivos",
    icon: "flame",
    earnedAt: "2025-06-02",
    category: "Consistência",
    points: 150
  },
  {
    id: 3,
    title: "Especialista Frontend",
    description: "Completou 3 cursos de Frontend",
    icon: "code",
    earnedAt: "2025-06-01",
    category: "Especialização",
    points: 200
  },
  {
    id: 4,
    title: "Colecionador de Certificados",
    description: "Conquistou 2 certificados",
    icon: "award",
    earnedAt: "2025-05-28",
    category: "Marcos",
    points: 250
  },
  {
    id: 5,
    title: "Dedicação Total",
    description: "Estudou por mais de 50 horas",
    icon: "clock",
    earnedAt: "2025-05-30",
    category: "Tempo",
    points: 300
  }
]

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'lesson_completed',
    title: "Aula concluída",
    description: "Context API com TypeScript",
    timestamp: "2025-06-04T16:30:00",
    icon: "check-circle",
    points: 10
  },
  {
    id: 2,
    type: 'lesson_completed',
    title: "Aula concluída",
    description: "Hooks Avançados em React",
    timestamp: "2025-06-04T15:45:00",
    icon: "check-circle",
    points: 10
  },
  {
    id: 3,
    type: 'achievement_earned',
    title: "Conquista desbloqueada",
    description: "Sequência de 7 Dias",
    timestamp: "2025-06-02T09:15:00",
    icon: "trophy",
    points: 150
  },
  {
    id: 4,
    type: 'lesson_completed',
    title: "Aula concluída",
    description: "Docker Compose na Prática",
    timestamp: "2025-06-02T14:20:00",
    icon: "check-circle",
    points: 10
  },
  {
    id: 5,
    type: 'course_completed',
    title: "Curso concluído",
    description: "Python para Data Science",
    timestamp: "2025-05-28T14:20:00",
    icon: "book-open",
    points: 500
  },
  {
    id: 6,
    type: 'achievement_earned',
    title: "Conquista desbloqueada",
    description: "Colecionador de Certificados",
    timestamp: "2025-05-28T14:25:00",
    icon: "trophy",
    points: 250
  }
]

const mockLearningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Desenvolvedor Full Stack Moderno",
    progress: 60,
    totalCourses: 12,
    completedCourses: 7,
    estimatedCompletion: "2 meses",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Data Science com Python",
    progress: 33,
    totalCourses: 8,
    completedCourses: 3,
    estimatedCompletion: "3 meses",
    category: "Data Science"
  },
  {
    id: 3,
    title: "DevOps e Cloud Computing",
    progress: 15,
    totalCourses: 10,
    completedCourses: 2,
    estimatedCompletion: "4 meses",
    category: "DevOps"
  }
]

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
  const [recentActivity, setRecentActivity] = useState(mockActivities)

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
    completedCourses: mockCourses.filter(c => c.progress === 100).length,
    inProgressCourses: mockCourses.filter(c => c.progress > 0 && c.progress < 100).length,
    certificates: mockCourses.filter(c => c.certificate).length
  }

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {mockCourses.filter(course => course.progress > 0 && course.progress < 100).map((course) => (
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
                                  {course.completedLessons}/{course.totalLessons} aulas
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
                  </div>

                  {/* Recent Activity & Learning Paths */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Atividade Recente</h2>
                      <div className="space-y-4">
                        {recentActivity.slice(0, 6).map((activity) => {
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
                        {mockLearningPaths.map((path) => (
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

                        <motion.button
                          className="w-full btn-secondary py-3 flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>Explorar Mais Trilhas</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Meus Cursos</h2>
                    <div className="flex items-center space-x-4">
                      <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500">
                        <option>Todos os cursos</option>
                        <option>Em andamento</option>
                        <option>Concluídos</option>
                        <option>Não iniciados</option>
                      </select>
                    </div>
                  </div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {mockCourses.map((course) => (
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

                          <p className="text-gray-400 text-sm">Por {course.instructor}</p>

                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{course.duration}</span>
                            </div>
                            {course.rating && (
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-white font-semibold">{course.rating}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Progresso</span>
                              <span className="text-white font-semibold">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-400">
                              {course.completedLessons}/{course.totalLessons} aulas concluídas
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
                                <span>{course.progress > 0 ? 'Continuar' : 'Iniciar'}</span>
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

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
                  </div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {mockAchievements.map((achievement) => {
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

                          <div className="flex items-center justify-between text-sm">
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/30">
                              {achievement.category}
                            </span>
                            <span className="text-orange-400 font-semibold">
                              +{achievement.points} pts
                            </span>
                          </div>

                          <div className="text-xs text-gray-500 mt-3">
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

                      <div className="text-xs text-gray-600">
                        3/5 cursos concluídos
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

                      <div className="text-xs text-gray-600">
                        7/30 dias concluídos
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

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
                    {mockLearningPaths.map((path) => (
                      <motion.div
                        key={path.id}
                        className="card-glow card p-6 group cursor-pointer"
                        variants={cardVariants}
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                          <div className="lg:w-24 h-24 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg relative overflow-hidden flex items-center justify-center flex-shrink-0">
                            <Target className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
                                {path.category}
                              </span>
                              <span className="text-xs text-gray-400">
                                {path.completedCourses}/{path.totalCourses} cursos
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                              {path.title}
                            </h3>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Progresso geral</span>
                                <span className="text-purple-400 font-semibold">{path.progress}%</span>
                              </div>

                              <div className="w-full bg-gray-700 rounded-full h-3">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${path.progress}%` }}
                                />
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-400">
                                <span>Conclusão estimada: {path.estimatedCompletion}</span>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>Em andamento</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 lg:items-end">
                            <motion.button
                              className="btn-primary px-6 py-3 flex items-center space-x-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="w-4 h-4" />
                              <span>Continuar</span>
                            </motion.button>
                            <motion.button
                              className="btn-secondary px-4 py-2 text-sm flex items-center space-x-1"
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
