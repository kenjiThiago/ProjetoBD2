import { Course } from "@/data/mockData"

// Threshold de 1 mês
export function isCourseNew(course: Course, threshold = (7 * 3 * 24 * 60 * 60 * 1000)) {
  const now = new Date()
  const courseDate = new Date(course.data_lancamento)

  const isNew = (now.getTime() - courseDate.getTime()) < threshold

  return isNew
}
