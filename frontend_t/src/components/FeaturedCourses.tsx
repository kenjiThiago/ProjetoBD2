'use client'

import { motion } from 'framer-motion'
import { Star, Users, Clock, Play, Code, Database, Palette, Server } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FeaturedCourses() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Aguarda um pouco após o mount para evitar animações no carregamento inicial
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const courses = [
    {
      id: 1,
      title: "JavaScript Moderno & React",
      instructor: "Ana Silva",
      rating: 4.9,
      students: 2847,
      duration: "40h",
      price: "R$ 199,90",
      originalPrice: "R$ 299,90",
      category: "Frontend",
      icon: Code,
      gradient: "from-yellow-500 to-orange-600",
      skills: ["JavaScript", "React", "TypeScript", "Next.js"],
      level: "Iniciante ao Avançado"
    },
    {
      id: 2,
      title: "Python Full Stack",
      instructor: "Carlos Santos",
      rating: 4.8,
      students: 1923,
      duration: "35h",
      price: "R$ 249,90",
      originalPrice: "R$ 349,90",
      category: "Backend",
      icon: Database,
      gradient: "from-blue-500 to-green-600",
      skills: ["Python", "Django", "PostgreSQL", "APIs"],
      level: "Do Zero ao Pro"
    },
    {
      id: 3,
      title: "UI/UX para Devs",
      instructor: "Marina Costa",
      rating: 4.9,
      students: 1456,
      duration: "25h",
      price: "R$ 179,90",
      originalPrice: "R$ 279,90",
      category: "Design",
      icon: Palette,
      gradient: "from-pink-500 to-purple-600",
      skills: ["Figma", "Design System", "UX Research", "Prototipagem"],
      level: "Iniciante"
    },
    {
      id: 4,
      title: "DevOps & Cloud",
      instructor: "Roberto Lima",
      rating: 4.7,
      students: 2134,
      duration: "45h",
      price: "R$ 329,90",
      originalPrice: "R$ 449,90",
      category: "DevOps",
      icon: Server,
      gradient: "from-gray-600 to-blue-700",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      level: "Intermediário"
    }
  ]

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      rotateX: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 20
      }
    }
  }

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 5,
      rotateY: 5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  return (
    <section className="py-20 bg-gray-900/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trilhas de <span className="gradient-text">Aprendizado</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Domine as tecnologias mais demandadas do mercado com nossos cursos práticos
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {courses.map((course, index) => {
            const IconComponent = course.icon
            return (
              <motion.div
                key={course.id}
                variants={cardVariants}
                whileHover="hover"
                className="card-glow card p-6 group cursor-pointer relative overflow-hidden perspective-1000"
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 rounded-xl`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                  animate={{
                    translateX: ['100%', '100%', '-100%', '-100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "linear"
                  }}
                />

                {/* Course Content */}
                <div className="relative z-10">
                  {/* Course Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center mb-4`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Category & Level */}
                  <div className="flex justify-between items-center mb-3">
                    <motion.span
                      className="bg-orange-500/20 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      {course.category}
                    </motion.span>
                    <span className="text-xs text-gray-500">{course.level}</span>
                  </div>

                  {/* Course Title */}
                  <motion.h3
                    className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    {course.title}
                  </motion.h3>

                  {/* Instructor */}
                  <motion.p
                    className="text-gray-400 mb-4 flex items-center"
                    whileHover={{ x: 2 }}
                  >
                    <motion.span
                      className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2 flex items-center justify-center text-xs text-white font-bold"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </motion.span>
                    {course.instructor}
                  </motion.p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.skills.slice(0, 2).map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono"
                        whileHover={{ scale: 1.05, y: -1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                    {course.skills.length > 2 && (
                      <span className="text-xs text-gray-400">+{course.skills.length - 2}</span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-white font-semibold">{course.rating}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Users className="w-4 h-4 mr-1" />
                        <span>{course.students.toLocaleString()}</span>
                      </motion.div>
                    </div>
                    <motion.div
                      className="flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </motion.div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="flex flex-col"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-2xl font-bold text-orange-400">
                        {course.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {course.originalPrice}
                      </span>
                    </motion.div>
                    <motion.button
                      className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center space-x-1"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(251, 146, 60, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-4 h-4" />
                      <span>Iniciar</span>
                    </motion.button>
                  </div>
                </div>

                {/* Floating particles on hover */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0"
                  whileHover={{
                    opacity: [0, 1, 0],
                    scale: [1, 1.5, 1],
                    y: [-10, -20, -10]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            className="btn-secondary px-8 py-4 text-lg relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              whileHover={{
                translateX: ['100%', '-100%']
              }}
              transition={{ duration: 0.6 }}
            />
            Ver Todas as Trilhas
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
