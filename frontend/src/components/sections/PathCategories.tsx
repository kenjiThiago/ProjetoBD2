'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Database, Brain, Smartphone, Cloud } from 'lucide-react'

interface PathCategoriesProps {
  selectedCategory: string
}

const categories = ["Full Stack", "Frontend", "Backend", "Data Science", "Mobile", "DevOps", "Design"]

const categoryIcons: Record<string, any> = {
  "Full Stack": Code,
  "Frontend": Palette,
  "Backend": Database,
  "Data Science": Brain,
  "Mobile": Smartphone,
  "DevOps": Cloud,
  "Design": Palette
}

export default function PathCategories({ selectedCategory }: PathCategoriesProps) {
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
    <section className="py-12 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Explore por Categoria</h2>
          <p className="text-gray-400">Escolha a área que mais combina com seus objetivos</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => {
            const Icon = categoryIcons[category] || Code
            const isSelected = selectedCategory === category

            return (
              <motion.button
                key={category}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('pathCategoryChange', {
                    detail: category
                  }))
                }}
                className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center space-y-2 ${
                  isSelected
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700/50 hover:border-gray-600'
                }`}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-8 h-8" />
                <span className="text-sm font-medium text-center">{category}</span>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
