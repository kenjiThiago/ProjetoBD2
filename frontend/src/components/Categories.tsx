'use client'

import { motion } from 'framer-motion'
import {
  Code,
  Database,
  Palette,
  Smartphone,
  Settings,
  Brain,
  TrendingUp,
  Shield
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Categories() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Aguarda um pouco após o mount para evitar animações no carregamento inicial
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  const categories = [
    {
      name: "Desenvolvimento Web",
      courses: 124,
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:shadow-blue-500/25"
    },
    {
      name: "Data Science",
      courses: 89,
      icon: Database,
      color: "from-green-500 to-emerald-500",
      hoverColor: "hover:shadow-green-500/25"
    },
    {
      name: "UI/UX Design",
      courses: 67,
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:shadow-purple-500/25"
    },
    {
      name: "Mobile",
      courses: 45,
      icon: Smartphone,
      color: "from-orange-500 to-amber-500",
      hoverColor: "hover:shadow-orange-500/25"
    },
    {
      name: "DevOps",
      courses: 56,
      icon: Settings,
      color: "from-gray-500 to-slate-500",
      hoverColor: "hover:shadow-slate-500/25"
    },
    {
      name: "Inteligência Artificial",
      courses: 78,
      icon: Brain,
      color: "from-indigo-500 to-violet-500",
      hoverColor: "hover:shadow-indigo-500/25"
    },
    {
      name: "Marketing Digital",
      courses: 92,
      icon: TrendingUp,
      color: "from-rose-500 to-pink-500",
      hoverColor: "hover:shadow-rose-500/25"
    },
    {
      name: "Cibersegurança",
      courses: 34,
      icon: Shield,
      color: "from-red-500 to-orange-500",
      hoverColor: "hover:shadow-red-500/25"
    }
  ]

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Cubic bezier mais suave
        type: "tween"
      }
    }
  }

  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Explore por <span className="gradient-text">Categoria</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            Encontre o curso perfeito para sua área de interesse
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`card-glow card p-8 text-center group cursor-pointer relative overflow-hidden ${category.hoverColor}`}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                {/* Gradiente de fundo suave */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 rounded-xl`}
                  whileHover={{
                    opacity: 0.08,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />

                {/* Shimmer effect muito sutil */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full rounded-xl"
                  animate={{
                    translateX: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "linear"
                  }}
                />

                <div className="relative z-10">
                  {/* Ícone com animação fluida */}
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                    whileHover={{
                      scale: 1.08,
                      y: -2,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                  >
                    <motion.div
                      whileHover={{
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Nome da categoria */}
                  <motion.h3
                    className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300"
                    whileHover={{
                      y: -1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {category.name}
                  </motion.h3>

                  {/* Contador de cursos */}
                  <motion.p
                    className="text-gray-400 mb-6"
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span
                      className="font-semibold text-white"
                      whileHover={{
                        color: "#fb923c",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {category.courses}
                    </motion.span> cursos disponíveis
                  </motion.p>

                  {/* Botão CTA */}
                  <motion.div
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${category.color} text-white text-sm font-semibold rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300 relative overflow-hidden`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                  >
                    {/* Shimmer do botão */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
                      whileHover={{
                        translateX: ['100%', '-100%'],
                        transition: { duration: 0.5 }
                      }}
                    />

                    Explorar
                    <motion.span
                      className="ml-2"
                      whileHover={{
                        x: 2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>

                {/* Partícula decorativa sutil */}
                <motion.div
                  className="absolute top-4 right-4 w-1.5 h-1.5 bg-white/20 rounded-full"
                  whileHover={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.6, 0.2],
                    transition: {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background animation sutil */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-purple-500/5"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            />

            <div className="relative z-10">
              <motion.h3
                className="text-2xl font-bold text-white mb-4"
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
              >
                Não encontrou o que procura?
              </motion.h3>
              <motion.p
                className="text-gray-400 mb-6"
                whileHover={{
                  scale: 1.005,
                  transition: { duration: 0.2 }
                }}
              >
                Temos mais de 20 categorias diferentes com centenas de cursos especializados
              </motion.p>
              <motion.button
                className="btn-primary px-8 py-3 relative overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 12px 28px rgba(251, 146, 60, 0.3)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
                  whileHover={{
                    translateX: ['100%', '-100%'],
                    transition: { duration: 0.5 }
                  }}
                />
                Ver Todas as Categorias
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
