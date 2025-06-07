'use client'

import { motion } from 'framer-motion'
import { Play, Star, Users, BookOpen, Award, Code2, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isClient, setIsClient] = useState(false)
  const [codeElements, setCodeElements] = useState<Array<{code: string, style: any}>>([])
  const [binaryElements, setBinaryElements] = useState<Array<{value: string, style: any}>>([])

  useEffect(() => {
    setIsClient(true)

    // Generate code elements only on client
    const codes = ['<>', '{}', '( )', '[ ]', '</ >', 'fn()', '=>']
    const generatedCodeElements = codes.map((code, i) => ({
      code,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }
    }))
    setCodeElements(generatedCodeElements)

    // Generate binary elements only on client
    const generatedBinaryElements = Array.from({ length: 100 }, (_, i) => ({
      value: Math.random() > 0.5 ? '01' : '10',
      style: {}
    }))
    setBinaryElements(generatedBinaryElements)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-gray-950"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>

        {/* Code Matrix Background - Only render on client */}
        {isClient && (
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-20 gap-4 h-full">
              {binaryElements.map((element, i) => (
                <motion.div
                  key={i}
                  className="text-green-400 text-xs font-mono"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: Math.random() * 3 + 1,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {element.value}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Floating Code Elements - Only render on client */}
        {isClient && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 opacity-10">
              {codeElements.map((element, i) => (
                <motion.div
                  key={i}
                  className="absolute text-orange-400 font-mono text-lg font-bold"
                  style={element.style}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {element.code}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-2 mb-6"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-400">Escolhido por 50.000+ desenvolvedores</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Domine a
              <motion.span
                className="gradient-text block pb-2"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                programação
              </motion.span>
              do zero ao avançado
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Aprenda as tecnologias mais demandadas do mercado com
              <span className="font-semibold text-orange-400"> projetos práticos</span> e
              mentoria especializada. Construa sua carreira na programação.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.button
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                <span>Começar a Programar</span>
              </motion.button>
              <motion.button
                className="glass border-2 border-white/20 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code2 className="w-5 h-5" />
                <span>Ver Roadmaps</span>
              </motion.button>
            </motion.div>

          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main Card - Code Editor Mockup */}
              <motion.div
                className="card-glow card p-1 transform rotate-3 hover:rotate-0 transition-transform duration-500 bg-gray-900"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
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
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Zap className="w-6 h-6" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              {/* Language Icons */}
              <motion.div
                className="absolute top-1/2 -left-8 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-bold text-sm"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                JS
              </motion.div>

              <motion.div
                className="absolute top-1/4 -right-8 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                animate={{ x: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                TS
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
