'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, ChevronDown, Settings, LogOut, BarChart3, BookOpen, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useSearch } from '@/hooks/useSearch'
import { useAuth } from '@/hooks/useAuth'

// Componente para itens de navegação (duplicado em mobile/desktop)
const NavigationLinks = ({ pathname, onItemClick, isMobile = false }: {
  pathname: string
  onItemClick?: () => void
  isMobile?: boolean
}) => {
  const items = [
    { name: 'Planos', href: '/planos' },
    { name: 'Cursos', href: '/cursos' },
    { name: 'Empresas', href: '/empresas' }
  ]

  return (
    <>
      {items.map((item) => (
        <Link key={item.name} href={item.href}>
          <div
            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer ${
              pathname === item.href
                ? 'text-orange-400'
                : 'text-gray-300 hover:text-orange-400'
            } ${isMobile ? 'block text-base' : ''}`}
            onClick={onItemClick}
          >
            {item.name}
            {/* Underline só no desktop */}
            {!isMobile && (
              <div
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transform transition-transform duration-200 ${
                  pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            )}
          </div>
        </Link>
      ))}
    </>
  )
}

// Componente para campo de busca (duplicado em mobile/desktop)
const SearchInput = ({
  value, onChange, onSubmit, onFocus, onKeyDown, onClear, isMobile = false
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onFocus: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  onClear: () => void
  isMobile?: boolean
}) => (
  <form onSubmit={onSubmit} className="w-full">
    <div className="relative flex items-center">
      <Search className="absolute left-3 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
      <input
        type="text"
        placeholder={isMobile ? "Buscar cursos..." : "Buscar cursos, tecnologias..."}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className={`w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 ${
          isMobile ? 'bg-gray-800' : 'bg-gray-800/50'
        }`}
      />

      <AnimatePresence>
        {value && (
          <motion.button
            type="button"
            onClick={onClear}
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
)

// Componente para itens do menu do usuário (duplicado em mobile/desktop)
const UserMenuItems = ({ onItemClick, onLogout, isMobile = false }: {
  onItemClick: (href: string) => void
  onLogout: () => void
  isMobile?: boolean
}) => {
  const menuItems = [
    { label: "Meu Dashboard", href: "/dashboard?tab=overview", icon: BarChart3, description: "Visão geral dos seus estudos" },
    { label: "Meus Cursos", href: "/dashboard?tab=courses", icon: BookOpen, description: "Cursos em andamento e concluídos" },
    { label: "Configurações", href: "/settings", icon: Settings, description: "Preferências da conta" }
  ]

  // Classes pré-definidas para evitar problemas com Tailwind tree-shaking
  const getMenuItemClasses = () => {
    if (isMobile) {
      return 'w-full text-left px-3 py-2 text-gray-300 hover:text-orange-400 transition-all duration-150 flex items-center space-x-2'
    } else {
      return 'w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-150 flex items-center space-x-3'
    }
  }

  const getLogoutClasses = () => {
    const baseClasses = 'w-full text-left text-red-400 hover:text-red-300 transition-all duration-150 flex items-center border-t'

    if (isMobile) {
      return `${baseClasses} px-3 py-2 space-x-2 mt-2 pt-4 border-gray-700/50`
    } else {
      return `${baseClasses} px-4 py-3 space-x-3 hover:bg-red-500/10 border-gray-700`
    }
  }

  const getIconClasses = () => {
    return isMobile ? 'w-4 h-4 text-gray-400' : 'w-5 h-5 text-gray-400'
  }

  const getLogoutIconClasses = () => {
    return isMobile ? 'w-4 h-4' : 'w-5 h-5'
  }

  return (
    <>
      {menuItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.href}
            onClick={() => onItemClick(item.href)}
            className={getMenuItemClasses()}
          >
            <Icon className={getIconClasses()} />
            {isMobile ? (
              <span>{item.label}</span>
            ) : (
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            )}
          </button>
        )
      })}

      <button
        onClick={onLogout}
        className={getLogoutClasses()}
      >
        <LogOut className={getLogoutIconClasses()} />
        {isMobile ? (
          <span>Sair</span>
        ) : (
          <div>
            <div className="font-medium">Sair</div>
            <div className="text-xs text-gray-500">Fazer logout da conta</div>
          </div>
        )}
      </button>
    </>
  )
}

// Componente para botões de autenticação (quando não logado)
const AuthButtons = ({ onLoginClick, onRegisterClick }: {
  onLoginClick: () => void
  onRegisterClick: () => void
}) => (
  <div className="flex items-center space-x-4">
    <button
      onClick={onLoginClick}
      className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
    >
      Entrar
    </button>
    <button
      onClick={onRegisterClick}
      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium"
    >
      Cadastrar
    </button>
  </div>
)

// Função para gerar avatar com iniciais
const generateAvatarInitials = (name: string): string => {
  if (!name) return 'U'

  const words = name.trim().split(' ')
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

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

  // Hook de autenticação
  const { aluno, loading, isAuthenticated, logout } = useAuth()

  // Dados centralizados
  const searchSuggestions = useMemo(() => [
    'JavaScript', 'React', 'Python', 'Node.js', 'TypeScript', 'Next.js',
    'Vue.js', 'Angular', 'Docker', 'AWS', 'Data Science', 'Machine Learning',
    'UI/UX Design', 'DevOps', 'MongoDB', 'PostgreSQL'
  ], [])

  // Dados do usuário baseados no estado de autenticação
  const user = useMemo(() => {
    if (!isAuthenticated || !aluno) {
      return null
    }

    return {
      name: aluno.nome,
      email: aluno.email,
      avatar: generateAvatarInitials(aluno.nome),
      plano: aluno.plano,
      cpf: aluno.cpf
    }
  }, [isAuthenticated, aluno])

  const filteredSuggestions = useMemo(() =>
    searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(localSearchTerm.toLowerCase()) &&
      localSearchTerm.length > 0
    ).slice(0, 5),
    [searchSuggestions, localSearchTerm]
  )

  // Handlers
  const handleSearch = (term: string) => {
    if (!term.trim()) return
    const searchTerm = term.trim()
    setGlobalSearchTerm(searchTerm)
    setShowSearchSuggestions(false)
    router.push(`/cursos?search=${encodeURIComponent(searchTerm)}`)
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

  const handleUserMenuClick = (href: string) => {
    setShowUserMenu(false)
    router.push(href)
  }

  const handleLogout = () => {
    setShowUserMenu(false)
    logout() // Chama o logout do hook useAuth
  }

  const handleLoginClick = () => {
    router.push('/auth?mode=login')
  }

  const handleRegisterClick = () => {
    router.push('/planos') // ou '/register' se tiver uma rota de registro direta
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSearchSuggestions && filteredSuggestions.length === 0) return

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative w-10 h-10 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-codify.png"
                  alt="Codify Logo"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                  <span className="gradient-text">Codify</span>
                </h1>
              </div>
            </div>
          </Link>

          {/* Search Bar - Desktop (só mostra se autenticado) */}
          {isAuthenticated && (
            <div className="hidden lg:flex flex-1 max-w-md mx-8 relative search-container">
              <SearchInput
                value={localSearchTerm}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onFocus={() => setShowSearchSuggestions(localSearchTerm.length > 0)}
                onKeyDown={handleKeyDown}
                onClear={clearSearch}
              />

              {/* Search Suggestions */}
              <AnimatePresence>
                {(showSearchSuggestions || filteredSuggestions.length > 0) && (
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
                            ? 'bg-orange-500/20 text-orange-300 border-l-2 border-l-orange-500'
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
          )}

          {/* Navigation - Desktop (só mostra se autenticado) */}
          {isAuthenticated && (
            <nav className="hidden lg:block mr-12">
              <div className="flex items-center space-x-12">
                <NavigationLinks pathname={pathname} />
              </div>
            </nav>
          )}

          {/* User Actions ou Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {loading ? (
              // Loading state
              <div className="animate-pulse flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="hidden xl:block">
                  <div className="w-20 h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            ) : isAuthenticated && user ? (
              // User menu quando autenticado
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
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
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
                            <div className="text-white/80 text-sm">{user.email}</div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div>
                        <UserMenuItems
                          onItemClick={handleUserMenuClick}
                          onLogout={handleLogout}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Botões de login/register quando não autenticado
              <AuthButtons
                onLoginClick={handleLoginClick}
                onRegisterClick={handleRegisterClick}
              />
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
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

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-700/50 mt-2"
            >
              <div className="px-2 pt-4 pb-3 space-y-1 bg-gray-900/50 rounded-lg mt-2">
                {isAuthenticated && user ? (
                  <>
                    {/* Navigation Links */}
                    <NavigationLinks
                      pathname={pathname}
                      onItemClick={() => setIsMenuOpen(false)}
                      isMobile={true}
                    />

                    {/* User Menu Mobile */}
                    <div className="pt-4 border-t border-gray-700/50">
                      <div className="flex items-center space-x-3 px-3 py-2 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{user.avatar}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.plano}</div>
                        </div>
                      </div>

                      <UserMenuItems
                        onItemClick={(href) => {
                          handleUserMenuClick(href)
                          setIsMenuOpen(false)
                        }}
                        onLogout={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                        isMobile={true}
                      />
                    </div>

                    {/* Mobile Search */}
                    <div className="pt-4 border-t border-gray-700/50">
                      <div className="px-3 py-2">
                        <SearchInput
                          value={localSearchTerm}
                          onChange={handleInputChange}
                          onSubmit={(e) => {
                            handleSubmit(e)
                            setIsMenuOpen(false)
                          }}
                          onFocus={() => setShowSearchSuggestions(localSearchTerm.length > 0)}
                          onClear={clearSearch}
                          isMobile={true}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  // Mobile auth buttons quando não autenticado
                  <div className="space-y-3 px-3 py-4">
                    <button
                      onClick={() => {
                        handleLoginClick()
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-4 py-3 text-gray-300 hover:text-white transition-colors text-left"
                    >
                      Entrar
                    </button>
                    <button
                      onClick={() => {
                        handleRegisterClick()
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium text-center"
                    >
                      Cadastrar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
