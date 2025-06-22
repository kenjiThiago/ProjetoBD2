'use client'

import { motion } from 'framer-motion'
import { Play, Star, Code2, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero({ numStudents }) {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  const codeElements = ['<>', '{}', '( )', '[ ]', '</ >', 'fn()', '=>', '&&', '||', '??', '...', '::', '$']

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleStartCoding = () => {
    router.push('/planos')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-gray-950"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>

        {/* Static floating code elements */}
        {isClient && (
          <div className="absolute inset-0 opacity-15">
            {codeElements.map((code, i) => (
              <motion.div
                key={i}
                className="absolute text-orange-400 font-mono text-lg font-bold opacity-30"
                style={{
                  left: `${(i * 23 + Math.random() * 15) % 100}%`,
                  top: `${(i * 17 + Math.random() * 20) % 100}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 3 + (i * 0.2),
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                {code}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Rating Section */}
            <div className="lg:justify-start justify-center flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-400">Escolhido por {numStudents}+ desenvolvedores</span>
            </div>

            {/* Main Heading */}
            <h1 className="lg:text-left text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              <div className="flex lg:block gap-4 justify-center">
                Domine a
                <span className="gradient-text block pb-2">
                  programação
                </span>
              </div>
              do zero ao avançado
            </h1>

            {/* Description */}
            <p className="lg:text-left text-center text-xl text-gray-300 mb-8 leading-relaxed">
              Aprenda as tecnologias mais demandadas do mercado com
              <span className="font-semibold text-orange-400"> projetos práticos</span> e
              mentoria especializada. Construa sua carreira na programação.
            </p>

            {/* Buttons */}
            <div className="lg:justify-start justify-center flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                onClick={handleStartCoding}
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                <span>Começar a Programar</span>
                <Code2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative p-12 lg:p-0">
              {/* Main Card - Code Editor Mockup */}
              <div className="card p-1 transform hover:rotate-3 transition-transform duration-500 bg-gray-900">
                {/* Editor Header */}
                <div className="bg-gray-800 rounded-t-lg p-3 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-400 text-sm font-mono">app.tsx</div>
                </div>

                {/* Editor Content */}
                <div className="bg-gray-900 rounded-b-lg p-6 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="text-purple-400">import React from 'react';</div>
                    <div className="text-blue-400">import {`{ Platform }`} from './codify';</div>
                    <div className="text-gray-500">// Seu futuro começa aqui</div>
                    <div className="text-yellow-400">function YourCareer() {`{`}</div>
                    <div className="text-white ml-4">return (</div>
                    <div className="text-green-400 ml-8">&lt;Platform</div>
                    <div className="text-green-400 ml-12">level="beginner"</div>
                    <div className="text-green-400 ml-12">goal="fullstack"</div>
                    <div className="text-green-400 ml-12">success={`{true}`}</div>
                    <div className="text-green-400 ml-8">/&gt;</div>
                    <div className="text-white ml-4">);</div>
                    <div className="text-white">{`}`}</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-8 lg:-top-4 right-6 lg:-right-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white">
                <Zap className="w-6 h-6" />
              </div>

              <div className="absolute bottom-8 lg:-bottom-4 left-6 lg:-left-4 w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Language Icons */}
              <div className="absolute top-1/2 left-2 lg:-left-8 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">
                JS
              </div>

              <div className="absolute top-1/4 right-2 lg:-right-8 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                TS
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
