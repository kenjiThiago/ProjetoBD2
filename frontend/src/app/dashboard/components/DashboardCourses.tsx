'use client'

import { motion } from 'framer-motion'
import CourseCard from '@/components/cards/DashboardCourseCard'
import DashboardCourseFilters from '@/components/filters/DashboardCourseFilters'
import DashboardPagination from '@/components/pagination/DashboardPagination'
import { DashboardCourse } from '@/data/mockData'
import {
  BookOpen,
} from 'lucide-react'

interface DashboardCoursesProps {
  courses: DashboardCourse[]
  searchTerm: string
  selectedCategory: string
  selectedLevel: string
  selectedStatus: string
  totalItems: number
  currentPage: number
  totalPages: number
}

export default function DashboardCourses({
  courses,
  searchTerm,
  selectedCategory,
  selectedLevel,
  selectedStatus,
  totalItems,
  currentPage,
  totalPages
}: DashboardCoursesProps) {
  return (
    <motion.div
      id="content-area"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-8 ">Meus Cursos</h2>

      {/* Filters */}
      <DashboardCourseFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        selectedStatus={selectedStatus}
        filteredCount={totalItems}
      />

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            key={`courses-${currentPage}-${searchTerm}-${selectedCategory}-${selectedLevel}-${selectedStatus}`}
          >
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                index={index}
                course={course}
              />
            ))}
          </div>

          {/* Pagination */}
          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={6}
          />
        </>
      ) : (
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
            {searchTerm || selectedCategory !== "Categorias" || selectedLevel !== "Níveis" || selectedStatus !== "Status"
              ? "Tente ajustar os filtros para encontrar seus cursos"
              : "Você ainda não possui cursos cadastrados"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {(searchTerm || selectedCategory !== "Categorias" || selectedLevel !== "Níveis" || selectedStatus !== "Status") && (
              <button
                className="btn-secondary px-6 py-3"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('dashboardClearFilters'))
                }}
              >
                <span>Limpar Filtros</span>
              </button>
            )}
            <button
              className="btn-primary px-6 py-3"
              onClick={() => window.location.href = '/cursos'}
            >
              <span>Explorar Cursos</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
