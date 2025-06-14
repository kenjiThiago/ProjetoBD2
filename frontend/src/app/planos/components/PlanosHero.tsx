'use client'

import { motion } from 'framer-motion'
import { Star, Crown } from 'lucide-react'

export default function PlanosHero() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-4 rounded-2xl">
              <Crown className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Escolha seu <span className="gradient-text">Plano</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Comece gratuitamente ou acelere seu aprendizado com recursos premium.
            Transforme sua carreira com o plano ideal para você.
          </p>

          {/* Rating Section */}
          <div className="flex justify-center items-center space-x-2 mb-8">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-400">Avaliado por mais de 50.000+ desenvolvedores</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
