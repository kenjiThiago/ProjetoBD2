'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DashboardPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export default function DashboardPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage
}: DashboardPaginationProps) {
  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    window.dispatchEvent(new CustomEvent('dashboardPageChange', {
      detail: page
    }))
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages = []
    const showPages = 5 // Maximum number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - Math.floor(showPages / 2))
      let end = Math.min(totalPages, start + showPages - 1)

      // Adjust start if we're near the end
      if (end === totalPages) {
        start = Math.max(1, end - showPages + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  const visiblePages = getVisiblePages()
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
      {/* Items info */}
      <div className="text-sm text-gray-400">
        Mostrando <span className="font-medium text-white">{startItem}</span> a{' '}
        <span className="font-medium text-white">{endItem}</span> de{' '}
        <span className="font-medium text-white">{totalItems}</span> resultados
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <motion.button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-colors ${
            currentPage === 1
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page) => (
            <motion.button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {page}
            </motion.button>
          ))}
        </div>

        {/* Next button */}
        <motion.button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-colors ${
            currentPage === totalPages
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
