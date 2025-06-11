import { Course } from "@/data/mockData"

export interface PopularityScore {
  courseId: number
  score: number
  isPopular: boolean
}

export function calculatePopularityScore(course: Course): number {
  // Pesos: 60% alunos + 40% rating
  const weights = {
    students: 0.4,    // 40% - número de estudantes
    rating: 0.3,      // 30% - avaliação
    recent: 0.2,      // 20% - quão recente é o curso
    engagement: 0.1   // 10% - outras métricas
  }

  // Normalizar número de estudantes (assumindo max ~5000 baseado nos seus dados)
  const studentsScore = Math.min(course.students / 5000, 1)

  // Normalizar rating (0-5 para 0-1)
  const ratingScore = course.rating / 5

  // Score baseado em quão recente é o curso
  const courseDate = new Date(course.lastUpdated)
  const now = new Date()
  const daysDiff = (now.getTime() - courseDate.getTime()) / (1000 * 60 * 60 * 24)
  const recentScore = Math.max(0, 1 - (daysDiff / 365)) // Decai ao longo de 1 ano

  // Score de engajamento (baseado em certificados, tags populares, etc)
  const engagementScore = course.certificate ? 0.8 : 0.5

  // Score final
  const totalScore = (
    studentsScore * weights.students +
    ratingScore * weights.rating +
    recentScore * weights.recent +
    engagementScore * weights.engagement
  )

  return Math.round(totalScore * 100) / 100
}

export function isPopular(course: Course, threshold: number = 0.8): boolean {
  return calculatePopularityScore(course) >= threshold
}

// Threshold de 1 mês
export function isCourseNew(course: Course, threshold = (7 * 2 * 24 * 60 * 60 * 1000)) {
  const now = new Date()
  const courseDate = new Date(course.lastUpdated)

  const isNew = (now.getTime() - courseDate.getTime()) < threshold

  return isNew
}

// Funções utilitárias
export const getCoursesInProgress = (courses: Course[]) =>
  courses.filter(course => course.progress && course.progress > 0 && course.progress < 100)

export const getCompletedCourses = (courses: Course[]) =>
  courses.filter(course => course.progress === 100)

export const getCoursesWithCertificates = (courses: Course[]) =>
  courses.filter(course => course.certificate && course.progress === 100)

export const getFeaturedCourses = (courses: Course[]) =>
  courses.filter(course => isPopular(course) || isCourseNew(course))

export const getPopularCourses = (courses: Course[]) =>
  courses
    .filter(course => isPopular(course))
    .sort((a, b) => b.students - a.students);

export const getNewCourses = (courses: Course[]) =>
  courses.filter(course => isCourseNew(course))

export const getCoursesByCategory = (courses: Course[], category: string) =>
  courses.filter(course => course.category === category)

export const getCoursesByLevel = (courses: Course[], selectedLevel: string) =>
  courses.filter(course => course.level === selectedLevel)

export const getCoursesByAccess = (courses: Course[], selectedAccess: string) => {
  if (selectedAccess === "Grátis") {
    courses = courses.filter(course => course.isFree === true)
  } else {
    courses = courses.filter(course => course.isFree === false)
  }
  return courses
}
