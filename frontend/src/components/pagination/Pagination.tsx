'use client'

import { motion } from 'framer-motion'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({
  currentPage,
  totalPages
}: PaginationProps) {
  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    window.dispatchEvent(new CustomEvent('pageChange', {
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
      console.log(start, end)

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
  console.log(visiblePages)

  return (
    <motion.div
      className="flex justify-center items-center space-x-2 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.button
        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
      >
        Anterior
      </motion.button>

      {visiblePages.map((page) => (
        <motion.button
          key={page}
          className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          onClick={() => handlePageChange(page)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page}
        </motion.button>
      )
      )}

      <motion.button
        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
      >
        Próximo
      </motion.button>
    </motion.div>
  )
}
