'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Code2, Target, Briefcase } from 'lucide-react'

export default function PlanosFeatures() {
  const features = [
    {
      icon: BookOpen,
      title: 'Cursos Completos',
      description: 'Do básico ao avançado em todas as tecnologias mais demandadas do mercado',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code2,
      title: 'Projetos Práticos',
      description: 'Construa um portfólio sólido com projetos reais que impressionam recrutadores',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Mentoria Especializada',
      description: 'Aprenda com profissionais experientes do mercado através de mentorias',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Award,
      title: 'Certificados Reconhecidos',
      description: 'Certificações que agregam valor ao seu currículo e são reconhecidas no mercado',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Preparação para Entrevistas',
      description: 'Simulações e dicas para passar nas entrevistas técnicas das melhores empresas',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: Briefcase,
      title: 'Conexão com o Mercado',
      description: 'Acesso exclusivo a vagas e networking com empresas parceiras',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Por que escolher nossa <span className="gradient-text">plataforma</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Oferecemos mais do que apenas cursos. É uma experiência completa de transformação profissional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
