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

  return (
    <motion.div
      className="flex justify-center items-center space-x-2 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.button
        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('pageChange', {
            detail: Math.max(currentPage - 1, 1)
          }))
        }}
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
            onClick={() => {
              window.dispatchEvent(new CustomEvent('pageChange', {
                detail: page
              }))
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {page}
          </motion.button>
        )
      })}

      <motion.button
        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('pageChange', {
            detail: Math.min(currentPage + 1, totalPages)
          }))
        }}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
      >
        Próximo
      </motion.button>
    </motion.div>
  )
}
