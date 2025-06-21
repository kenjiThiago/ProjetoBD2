'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Eye, EyeOff, Mail, Lock, User, Loader, Calendar, CreditCard,
  Check, X, Shield, AlertCircle
} from 'lucide-react'

interface AuthFormProps {
  mode: 'login' | 'register'
  plan: string
}

interface PasswordStrength {
  hasLower: boolean
  hasUpper: boolean
  hasNumber: boolean
  hasSpecial: boolean
  hasMinLength: boolean
}

export default function AuthForm({ mode, plan }: AuthFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [birthDateError, setBirthDateError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    birthDate: ''
  })

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSpecial: false,
    hasMinLength: false
  })

  const validatePassword = (password: string): PasswordStrength => {
    return {
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8
    }
  }

  const validateBirthDate = (dateString: string): string => {
    if (!dateString) return ''

    const birthDate = new Date(dateString)
    const today = new Date()
    const currentYear = today.getFullYear()
    const birthYear = birthDate.getFullYear()

    // Verificar se é uma data válida
    if (isNaN(birthDate.getTime())) {
      return 'Data inválida'
    }

    // Verificar se o ano não é muito antigo (antes de 1900)
    if (birthYear < 1900) {
      return 'Ano de nascimento deve ser posterior a 1900'
    }

    // Verificar se o ano não é muito futuro (não pode ser maior que o ano atual)
    if (birthYear > currentYear) {
      return 'Data de nascimento não pode ser no futuro'
    }

    // Verificar se não é um ano absurdo como 9999
    if (birthYear > currentYear + 1) {
      return 'Ano de nascimento inválido'
    }

    // Calcular idade
    let age = currentYear - birthYear
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    // Verificar idade mínima (deve ter pelo menos 13 anos)
    if (age < 13) {
      return 'Você deve ter pelo menos 13 anos para se cadastrar'
    }

    // Verificar idade máxima razoável (150 anos)
    if (age > 150) {
      return 'Idade não pode ser superior a 150 anos'
    }

    return '' // Sem erro
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0

    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validações básicas
    if (mode === 'register') {
      // Validar data de nascimento
      const birthDateValidation = validateBirthDate(formData.birthDate)
      if (birthDateValidation) {
        setBirthDateError(birthDateValidation)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem!')
        return
      }

      const strength = validatePassword(formData.password)
      const isPasswordStrong = Object.values(strength).every(v => v)

      if (!isPasswordStrong) {
        alert('A senha deve atender todos os critérios de segurança!')
        return
      }
    }

    // Mostrar tela de confirmação antes do envio
    if (mode === 'register' && !showConfirmation) {
      setShowConfirmation(true)
      return
    }

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
        cpf: formData.cpf,
        birthDate: formData.birthDate,
        age: calculateAge(formData.birthDate),
        plan: plan,
        registeredAt: new Date().toISOString()
      }))

      // Redirecionar baseado no plano
      router.push('/dashboard?welcome=true')
    } else {
      // Login
      router.push('/dashboard')
    }

    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Formatação especial para CPF
    if (name === 'cpf') {
      formattedValue = formatCPF(value)
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))

    // Validar senha em tempo real
    if (name === 'password') {
      setPasswordStrength(validatePassword(value))
    }

    // Validar data de nascimento em tempo real
    if (name === 'birthDate') {
      const error = validateBirthDate(value)
      setBirthDateError(error)
    }
  }

  const handleBackToForm = () => {
    setShowConfirmation(false)
  }

  // Tela de confirmação dos dados
  if (showConfirmation && mode === 'register') {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Confirme seus dados
            </h2>
            <p className="text-gray-400 text-lg">
              Verifique se todas as informações estão corretas
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Nome completo</span>
                  <span className="text-white font-medium text-lg">{formData.name}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Email</span>
                  <span className="text-white font-medium">{formData.email}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">CPF</span>
                  <span className="text-white font-medium">{formData.cpf}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Data de nascimento</span>
                  <span className="text-white font-medium">
                    {new Date(formData.birthDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Idade</span>
                  <span className="text-white font-medium">{calculateAge(formData.birthDate)} anos</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Plano escolhido</span>
                  <span className="text-purple-400 font-medium capitalize">{plan}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.button
              type="button"
              onClick={handleBackToForm}
              className="flex-1 bg-gray-700 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voltar
            </motion.button>
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-orange-600 transition-all duration-300 text-lg"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="w-6 h-6 animate-spin" />
                  <span>Criando conta...</span>
                </div>
              ) : (
                'Confirmar e criar conta'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Entrar na sua conta' : 'Criar sua conta'}
          </h2>
          <p className="text-gray-400 text-lg">
            {mode === 'login'
              ? 'Continue sua jornada de aprendizado'
              : 'Comece sua jornada na programação'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mode === 'register' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>
          )}

          <div className={mode === 'login' ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CPF *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                  maxLength={14}
                  className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Data de nascimento *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  min="1900-01-01"
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-4 py-4 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg ${
                    birthDateError ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {formData.birthDate && !birthDateError && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                )}
              </div>
              {birthDateError && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {birthDateError}
                </p>
              )}
              {formData.birthDate && !birthDateError && (
                <p className="text-green-400 text-sm mt-2 flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Idade: {calculateAge(formData.birthDate)} anos
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Senha *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                placeholder="Sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-10 py-4 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500'
                      : 'border-gray-600'
                  }`}
                  placeholder="Confirme sua senha"
                />
                {formData.confirmPassword && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {formData.password === formData.confirmPassword ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  As senhas não coincidem
                </p>
              )}
            </div>
          )}
        </div>

        {/* Indicadores de força da senha */}
        {mode === 'register' && formData.password && (
          <div className="p-4 bg-gray-800/50 rounded-xl">
            <p className="text-sm text-gray-300 mb-3 font-medium">Requisitos da senha:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className={`flex items-center space-x-2 ${passwordStrength.hasMinLength ? 'text-green-400' : 'text-red-400'}`}>
                {passwordStrength.hasMinLength ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Mínimo 8 caracteres</span>
              </div>
              <div className={`flex items-center space-x-2 ${passwordStrength.hasUpper ? 'text-green-400' : 'text-red-400'}`}>
                {passwordStrength.hasUpper ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Letra maiúscula</span>
              </div>
              <div className={`flex items-center space-x-2 ${passwordStrength.hasLower ? 'text-green-400' : 'text-red-400'}`}>
                {passwordStrength.hasLower ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Letra minúscula</span>
              </div>
              <div className={`flex items-center space-x-2 ${passwordStrength.hasNumber ? 'text-green-400' : 'text-red-400'}`}>
                {passwordStrength.hasNumber ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Número</span>
              </div>
              <div className={`flex items-center space-x-2 ${passwordStrength.hasSpecial ? 'text-green-400' : 'text-red-400'}`}>
                {passwordStrength.hasSpecial ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Caractere especial</span>
              </div>
            </div>
          </div>
        )}

        {mode === 'register' && (
          <div className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-xl">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-5 h-5 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
              Aceito os{' '}
              <a href="/termos" className="text-purple-400 hover:text-purple-300 underline">
                termos de uso
              </a>{' '}
              e a{' '}
              <a href="/privacidade" className="text-purple-400 hover:text-purple-300 underline">
                política de privacidade
              </a>
            </label>
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader className="w-6 h-6 animate-spin" />
              <span>{mode === 'login' ? 'Entrando...' : 'Criando conta...'}</span>
            </div>
          ) : (
            mode === 'login' ? 'Entrar' : 'Continuar'
          )}
        </motion.button>

        {mode === 'login' && (
          <div className="text-center">
            <a href="/esqueci-senha" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Esqueci minha senha
            </a>
          </div>
        )}
      </motion.form>
    </div>
  )
}
