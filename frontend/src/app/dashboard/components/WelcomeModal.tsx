'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, BookOpen, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function WelcomeModal() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const welcome = searchParams.get('welcome')

  useEffect(() => {
    if (welcome === 'true') {
      setIsOpen(true)
    }
  }, [welcome])

  const handleClose = () => {
    setIsOpen(false)
    // Remove o parâmetro welcome da URL
    router.replace('/dashboard')
  }

  const benefits = [
    {
      icon: BookOpen,
      title: 'Acesso a 5 Cursos',
      description: 'HTML, CSS, JavaScript, Python e Git'
    },
    {
      icon: Award,
      title: 'Certificados',
      description: 'Certificados de conclusão válidos'
    },
    {
      icon: Trophy,
      title: 'Projetos Práticos',
      description: 'Construa seu primeiro portfólio'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 relative"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                🎉 Bem-vindo ao Codify!
              </h2>
              <p className="text-gray-400">
                Sua conta gratuita foi criada com sucesso
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{benefit.title}</h3>
                      <p className="text-sm text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/cursos')}
                className="w-full btn-primary"
              >
                Começar Primeiro Curso
              </button>
              <button
                onClick={handleClose}
                className="w-full btn-secondary"
              >
                Explorar Dashboard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
