'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, Loader } from 'lucide-react'

interface AuthFormProps {
  mode: 'login' | 'register'
  plan: string
}

export default function AuthForm({ mode, plan }: AuthFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular processo de auth
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Aqui você integraria com seu backend
    // const response = await authAPI.register/login(formData)

    // Por enquanto, simular sucesso
    if (mode === 'register') {
      // Salvar dados do usuário no localStorage (temporário)
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        plan: plan,
        registeredAt: new Date().toISOString()
      }))

      // Redirecionar baseado no plano
      if (plan === 'free') {
        router.push('/dashboard?welcome=true')
      } else {
        router.push('/checkout?plan=' + plan)
      }
    } else {
      // Login
      router.push('/dashboard')
    }

    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {mode === 'login' ? 'Entrar na sua conta' : 'Criar sua conta'}
        </h2>
        <p className="text-gray-400">
          {mode === 'login'
            ? 'Continue sua jornada de aprendizado'
            : 'Comece sua jornada na programação'
          }
        </p>
      </div>

      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Seu nome completo"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Sua senha"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirmar senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Confirme sua senha"
            />
          </div>
        </div>
      )}

      {mode === 'register' && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            required
            className="w-4 h-4 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
          />
          <label htmlFor="terms" className="ml-3 text-sm text-gray-300">
            Aceito os{' '}
            <a href="/termos" className="text-purple-400 hover:text-purple-300">
              termos de uso
            </a>{' '}
            e{' '}
            <a href="/privacidade" className="text-purple-400 hover:text-purple-300">
              política de privacidade
            </a>
          </label>
        </div>
      )}

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-orange-600 transition-all duration-200"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader className="w-5 h-5 animate-spin" />
            <span>{mode === 'login' ? 'Entrando...' : 'Criando conta...'}</span>
          </div>
        ) : (
          mode === 'login' ? 'Entrar' : 'Criar conta gratuita'
        )}
      </motion.button>

      {mode === 'login' && (
        <div className="text-center">
          <a href="/esqueci-senha" className="text-sm text-purple-400 hover:text-purple-300">
            Esqueci minha senha
          </a>
        </div>
      )}
    </form>
  )
}
