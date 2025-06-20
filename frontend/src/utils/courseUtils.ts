import { Course } from "@/data/mockData"

// Threshold de 1 mês
export function isCourseNew(course: Course, threshold = (7 * 3 * 24 * 60 * 60 * 1000)) {
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
  courses.filter(course => isCourseNew(course) || !course.isFree)

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
