'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Clock, Play, Trash2, ShoppingCart, Share2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface WishlistItem {
  id: number
  title: string
  instructor: string
  duration: string
  level: string
  rating: number
  price: number
  originalPrice: number
  thumbnail: string
  category: string
  addedAt: string
}

const mockWishlist: WishlistItem[] = [
  {
    id: 1,
    title: "Vue.js 3 Completo - Do Básico ao Avançado",
    instructor: "João Pedro",
    duration: "18h 30m",
    level: "Intermediário",
    rating: 4.8,
    price: 199.90,
    originalPrice: 299.90,
    thumbnail: "vue-course",
    category: "Frontend",
    addedAt: "2025-06-01"
  },
  {
    id: 2,
    title: "Machine Learning com Python",
    instructor: "Dr. Ana Santos",
    duration: "25h 15m",
    level: "Avançado",
    rating: 4.9,
    price: 349.90,
    originalPrice: 499.90,
    thumbnail: "ml-course",
    category: "Data Science",
    addedAt: "2025-05-28"
  },
  {
    id: 3,
    title: "Docker e Kubernetes na Prática",
    instructor: "Carlos DevOps",
    duration: "12h 45m",
    level: "Intermediário",
    rating: 4.7,
    price: 249.90,
    originalPrice: 349.90,
    thumbnail: "docker-course",
    category: "DevOps",
    addedAt: "2025-05-25"
  }
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlist)

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0)
  const totalDiscount = wishlist.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-2xl">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Lista de <span className="gradient-text">Desejos</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Seus cursos favoritos salvos para estudar mais tarde
            </p>
          </motion.div>

          {/* Summary */}
          {wishlist.length > 0 && (
            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">{wishlist.length}</div>
                  <div className="text-gray-400">Cursos Salvos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    R$ {totalValue.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-gray-400">Valor Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-2">
                    R$ {totalDiscount.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-gray-400">Economia Total</div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="btn-primary flex-1 py-3 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Comprar Todos ({wishlist.length})</span>
                </motion.button>

                <motion.button
                  className="btn-secondary px-6 py-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-5 h-5" />
                  <span>Compartilhar Lista</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Wishlist Items */}
          {wishlist.length > 0 ? (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {wishlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="card-glow card p-6 group"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Thumbnail */}
                    <div className="lg:w-64 h-40 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(item.level)}`}>
                          {item.level}
                        </span>
                        <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded border border-purple-500/30">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-3">Por {item.instructor}</p>

                      <div className="flex items-center text-gray-400 text-sm mb-4 flex-wrap gap-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-white font-semibold">{item.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Adicionado em {new Date(item.addedAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="text-2xl font-bold text-green-400">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              R$ {item.originalPrice.toFixed(2).replace('.', ',')}
                            </div>
                          </div>
                          <div className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:w-40">
                      <motion.button
                        className="btn-primary flex-1 lg:flex-none py-3 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Comprar</span>
                      </motion.button>

                      <motion.button
                        onClick={() => removeFromWishlist(item.id)}
                        className="btn-secondary flex-1 lg:flex-none py-3 flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remover</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Sua lista está vazia
              </h3>
              <p className="text-gray-400 mb-6">
                Explore nossos cursos e adicione seus favoritos aqui
              </p>
              <motion.button
                className="btn-primary px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/cursos'}
              >
                Explorar Cursos
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
