'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Users, BookOpen, GraduationCap, Star, Award, Globe, Zap, Heart } from 'lucide-react'

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    {
      number: 50000,
      suffix: "+",
      label: "Estudantes Ativos",
      icon: Users,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      number: 500,
      suffix: "+",
      label: "Cursos Disponíveis",
      icon: BookOpen,
      gradient: "from-green-500 to-emerald-400"
    },
    {
      number: 50,
      suffix: "+",
      label: "Instrutores Especialistas",
      icon: GraduationCap,
      gradient: "from-purple-500 to-pink-400"
    },
    {
      number: 4.9,
      suffix: "",
      label: "Avaliação Média",
      icon: Star,
      gradient: "from-yellow-500 to-orange-400"
    }
  ]

  const features = [
    {
      icon: Award,
      title: "Certificados Reconhecidos",
      description: "Certificados aceitos pelas maiores empresas do mercado"
    },
    {
      icon: Globe,
      title: "Acesso Vitalício",
      description: "Estude no seu ritmo, quando e onde quiser"
    },
    {
      icon: Zap,
      title: "Atualizações Constantes",
      description: "Conteúdo sempre atualizado com as últimas tendências"
    },
    {
      icon: Heart,
      title: "Suporte 24/7",
      description: "Nossa equipe está sempre pronta para ajudar"
    }
  ]

  function Counter({ number, suffix, duration = 2000 }: { number: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0)
    const [isClient, setIsClient] = useState(false)
    const countRef = useRef(null)
    const isCounterInView = useInView(countRef, { once: true })

    useEffect(() => {
      setIsClient(true)
    }, [])

    useEffect(() => {
      if (!isCounterInView || !isClient) return

      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)

        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * number))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }, [isCounterInView, number, duration, isClient])

    return (
      <span ref={countRef}>
        {isClient ? count.toLocaleString() : '0'}{suffix}
      </span>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-900 via-blue-950/20 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Resultados que <span className="gradient-text">Falam por Si</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Junte-se a milhares de estudantes que já transformaram suas carreiras
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{
                    rotate: [0, -10, 10, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <Counter number={stat.number} suffix={stat.suffix} />
                </motion.div>

                <div className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>

                {/* Decorative line */}
                <motion.div
                  className={`w-12 h-1 bg-gradient-to-r ${stat.gradient} mx-auto mt-4 rounded-full`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                className="glass p-6 rounded-xl text-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para começar sua <span className="gradient-text">transformação?</span>
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Junte-se aos milhares de profissionais que já mudaram de carreira com o Codify
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Agora - Grátis
              </motion.button>
              <motion.button
                className="glass border-2 border-white/20 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Falar com Consultor
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
