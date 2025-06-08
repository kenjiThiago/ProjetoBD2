'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Bell, ChevronDown, Settings, LogOut, BarChart3, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useSearch } from '@/hooks/useSearch'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const router = useRouter()
  const pathname = usePathname()
  const { setGlobalSearchTerm } = useSearch()

  // Sugestões de busca
  const searchSuggestions = [
    'JavaScript',
    'React',
    'Python',
    'Node.js',
    'TypeScript',
    'Next.js',
    'Vue.js',
    'Angular',
    'Docker',
    'AWS',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'DevOps',
    'MongoDB',
    'PostgreSQL'
  ]

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(localSearchTerm.toLowerCase()) &&
    localSearchTerm.length > 0
  ).slice(0, 5)

  // Dados do usuário (mockados)
  const user = {
    name: "kenjiThiago",
    avatar: "KT",
    level: "Desenvolvedor Intermediário",
    unreadNotifications: 3
  }

  // Menu items do usuário
  const userMenuItems = [
    {
      label: "Meu Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      description: "Visão geral dos seus estudos"
    },
    {
      label: "Meus Cursos",
      href: "/dashboard?tab=courses",
      icon: BookOpen,
      description: "Cursos em andamento e concluídos"
    },
    {
      label: "Configurações",
      href: "/settings",
      icon: Settings,
      description: "Preferências da conta"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar dropdowns quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
      if (!target.closest('.search-container')) {
        setShowSearchSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSearchSuggestions || filteredSuggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestionIndex(prev =>
          prev < filteredSuggestions.length ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => prev > -1 ? prev - 1 : prev)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < filteredSuggestions.length) {
          handleSuggestionClick(filteredSuggestions[selectedSuggestionIndex])
        } else if (selectedSuggestionIndex === filteredSuggestions.length) {
          // "Buscar por" option
          handleSearch(localSearchTerm)
        } else {
          handleSubmit(e)
        }
        break
      case 'Escape':
        setShowSearchSuggestions(false)
        setSelectedSuggestionIndex(-1)
        break
    }
  }

  const handleSearch = (term: string) => {
    if (!term.trim()) return

    const searchTerm = term.trim()

    // Define o termo global apenas para navegação
    setGlobalSearchTerm(searchTerm)
    setShowSearchSuggestions(false)

    router.push(`/cursos?search=${encodeURIComponent(searchTerm)}`)

    // Limpa o campo do header após a busca
    setLocalSearchTerm('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localSearchTerm.trim()) {
      handleSearch(localSearchTerm)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    setShowSearchSuggestions(value.length > 0)
    setSelectedSuggestionIndex(-1)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion)
    setSelectedSuggestionIndex(-1)
  }

  const clearSearch = () => {
    setLocalSearchTerm('')
    setShowSearchSuggestions(false)
    setSelectedSuggestionIndex(-1)
  }

  // NAVEGAÇÃO CORRIGIDA PARA USAR ROUTER.PUSH
  const handleUserMenuClick = (href: string) => {
    setShowUserMenu(false)
    router.push(href)
    // Força refresh da página se já estiver no dashboard
    if (pathname === '/dashboard' && href.includes('/dashboard')) {
      window.location.href = href
    }
  }

  const handleLogout = () => {
    setShowUserMenu(false)
    // Aqui você implementaria a lógica de logout
    console.log('Logout')
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Animação mais natural e simples */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <div className="relative w-10 h-10 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/logo-codify.png"
                    alt="Codify Logo"
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                    priority
                  />
                  {/* Shine effect mais sutil */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </div>
              </div>
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                  <span className="gradient-text">Codify</span>
                </h1>
              </div>
            </div>
          </Link>

          {/* Search Bar - Desktop - Simplificado */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative search-container">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar cursos, tecnologias..."
                  value={localSearchTerm}
                  onChange={handleInputChange}
                  onFocus={() => setShowSearchSuggestions(localSearchTerm.length > 0)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-colors duration-200"
                />

                {/* Clear button - Animação simplificada */}
                <AnimatePresence>
                  {localSearchTerm && (
                    <motion.button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-700/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {/* Search Suggestions - Animação simplificada */}
            <AnimatePresence>
              {showSearchSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left px-4 py-3 transition-colors flex items-center space-x-2 ${
                        selectedSuggestionIndex === index
                          ? 'bg-orange-500/20 text-orange-300 border-l-2 border-orange-500'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Search className="w-4 h-4 text-gray-500" />
                      <span>{suggestion}</span>
                    </button>
                  ))}

                  {localSearchTerm && (
                    <button
                      onClick={() => handleSearch(localSearchTerm)}
                      className={`w-full text-left px-4 py-3 transition-colors flex items-center space-x-2 border-t border-gray-700 ${
                        selectedSuggestionIndex === filteredSuggestions.length
                          ? 'bg-orange-500/20 text-orange-300 border-l-2 border-orange-500'
                          : 'text-orange-400 hover:bg-gray-700 hover:text-orange-300'
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      <span>Buscar por "{localSearchTerm}"</span>
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation - Removida animação individual dos itens */}
          <nav className="hidden lg:block mr-12">
            <div className="flex items-center space-x-12">
              {[
                { name: 'Cursos', href: '/cursos' },
                { name: 'Empresas', href: '/empresas' }
              ].map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer ${
                      pathname === item.href
                        ? 'text-orange-400'
                        : 'text-gray-300 hover:text-orange-400'
                    }`}
                  >
                    {item.name}
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transform transition-transform duration-200 ${
                        pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Notifications - Removido hover scale */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              {user.unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                  {user.unreadNotifications}
                </span>
              )}
            </button>

            {/* User Menu - Simplificado */}
            <div className="relative user-menu-container">
              <button
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{user.avatar}</span>
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-gray-300 text-sm font-medium">{user.name}</div>
                  <div className="text-gray-500 text-xs">{user.level}</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu - Animação simplificada */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-white">{user.avatar}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{user.name}</div>
                          <div className="text-white/80 text-sm">{user.level}</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items - Removida animação de stagger */}
                    <div className="py-2">
                      {userMenuItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <button
                            key={item.href}
                            onClick={() => handleUserMenuClick(item.href)}
                            className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-150 flex items-center space-x-3"
                          >
                            <Icon className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-700 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-150 flex items-center space-x-3"
                      >
                        <LogOut className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Sair</div>
                          <div className="text-xs text-gray-500">Fazer logout da conta</div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu - Animação simplificada */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-700/50 mt-2"
            >
              <div className="px-2 pt-4 pb-3 space-y-1 bg-gray-900/50 rounded-lg mt-2">
                {/* Navigation Links - Removida animação de stagger */}
                {[
                  { name: 'Cursos', href: '/cursos' },
                  { name: 'Empresas', href: '/empresas' }
                ].map((item) => (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={`block px-3 py-2 text-base font-medium transition-colors cursor-pointer ${
                        pathname === item.href
                          ? 'text-orange-400'
                          : 'text-gray-300 hover:text-orange-400'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </div>
                  </Link>
                ))}

                {/* User Menu Mobile */}
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{user.avatar}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.level}</div>
                    </div>
                  </div>

                  {userMenuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.href}
                        onClick={() => {
                          handleUserMenuClick(item.href)
                          setIsMenuOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:text-orange-400 transition-colors flex items-center space-x-2"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}

                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 transition-colors flex items-center space-x-2 mt-2 pt-4 border-t border-gray-700/50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </div>

                {/* Mobile Search - Simplificado */}
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="px-3 py-2">
                    <form onSubmit={(e) => {
                      handleSubmit(e)
                      setIsMenuOpen(false)
                    }}>
                      <div className="relative flex items-center">
                        <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar cursos..."
                          value={localSearchTerm}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400"
                        />
                        <AnimatePresence>
                          {localSearchTerm && (
                            <motion.button
                              type="button"
                              onClick={clearSearch}
                              className="absolute right-3 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-700/30"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <X className="w-3.5 h-3.5" />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
