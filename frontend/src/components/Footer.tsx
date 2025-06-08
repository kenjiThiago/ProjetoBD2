'use client'

import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  ArrowRight,
  Github
} from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const quickLinks = [
    { name: 'Sobre o Codify', href: '#' },
    { name: 'Trilhas de Aprendizado', href: '#' },
    { name: 'Instrutores', href: '#' },
    { name: 'Bootcamps', href: '#' },
    { name: 'Blog Dev', href: '#' },
  ]

  const categories = [
    { name: 'Frontend', href: '#' },
    { name: 'Backend', href: '#' },
    { name: 'Mobile', href: '#' },
    { name: 'DevOps', href: '#' },
    { name: 'Data Science', href: '#' },
  ]

  const support = [
    { name: 'Central de Ajuda', href: '#' },
    { name: 'Termos de Uso', href: '#' },
    { name: 'Política de Privacidade', href: '#' },
    { name: 'FAQ Desenvolvedores', href: '#' },
    { name: 'Contato', href: '#' },
  ]

  const socialLinks = [
    { icon: Github, href: '#', color: 'hover:text-gray-300' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
    { icon: Youtube, href: '#', color: 'hover:text-red-500' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          className="py-12 border-b border-gray-800/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Weekly <span className="gradient-text">Dev Tips</span>
            </h3>
            <p className="text-gray-400 mb-8">
              Receba dicas de programação, novas tecnologias e oportunidades de carreira
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="dev@exemplo.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
              <motion.button
                className="btn-primary flex items-center space-x-2 px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
                <span>Subscribe</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Logo Real no Footer */}
                  <div className="relative w-10 h-10 overflow-hidden rounded-full">
                    <Image
                      src="/logo-codify.png"
                      alt="Codify Logo"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                    {/* Efeito shimmer no footer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                      animate={{
                        translateX: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "linear"
                      }}
                    />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold gradient-text">Codify</h3>
              </motion.div>

              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Sua plataforma completa para dominar a programação. Do primeiro "Hello World"
                até projetos complexos, desenvolvemos desenvolvedores completos.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <motion.div
                  className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="w-4 h-4 mr-3" />
                  <span>+55 (11) 9999-9999</span>
                </motion.div>
                <motion.div
                  className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-4 h-4 mr-3" />
                  <span>dev@codify.com.br</span>
                </motion.div>
                <motion.div
                  className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-4 h-4 mr-3" />
                  <span>São Paulo, SP - Brasil</span>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700`}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-white mb-6">Navegação</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-white mb-6">Tecnologias</h4>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a
                      href={category.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {category.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-white mb-6">Suporte</h4>
              <ul className="space-y-3">
                {support.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800/50 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-center md:text-left mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              &copy; 2025 Codify. Todos os direitos reservados.
            </motion.p>

            <motion.div
              className="flex items-center space-x-6 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.span
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                Feito com <span className="text-red-500 mx-1 animate-pulse">❤️</span> por devs, para devs
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600"></div>
    </footer>
  )
}
