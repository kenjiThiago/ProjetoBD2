'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AuthForm from './AuthForm'

export default function AuthPageContent() {
  const searchParams = useSearchParams()

  // Obter parâmetros da URL
  const plan = searchParams.get('plan') || 'Grátis'
  const modeFromUrl = searchParams.get('mode') as 'login' | 'register' | null

  // Estado baseado na URL, mas só lê uma vez
  const [mode, setMode] = useState<'login' | 'register'>(() => {
    return modeFromUrl || 'register'
  })

  // Função para alternar modo
  const toggleMode = () => {
    const newMode = mode === 'login' ? 'register' : 'login'
    setMode(newMode)

    // Construir nova URL
    const params = new URLSearchParams()
    params.set('mode', newMode)

    if (plan && plan !== 'Grátis') {
      params.set('plan', plan)
    }

    // Atualizar URL sem recarregar
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, '', newUrl)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Banner do plano */}
            {plan === 'Grátis' ? (
              <motion.div
                className="text-center mb-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-green-400 font-semibold mb-2">🎉 Plano Gratuito</h3>
                <p className="text-sm text-gray-300">
                  Acesso imediato a cursos gratuitos + certificados
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="text-center mb-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-purple-400 font-semibold mb-2">⭐ Plano {plan}</h3>
                <p className="text-sm text-gray-300">
                  {mode === 'register'
                    ? 'Complete seu cadastro para ativar o plano'
                    : 'Entre na sua conta para continuar'
                  }
                </p>
              </motion.div>
            )}

            {/* Formulário */}
            <AuthForm mode={mode} plan={plan} />

            {/* Toggle */}
            <div className="text-center mt-6">
              <button
                onClick={toggleMode}
                className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-200 hover:underline"
              >
                {mode === 'login'
                  ? 'Não tem conta? Criar conta'
                  : 'Já tem conta? Fazer login'
                }
              </button>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  mode === 'register' ? 'bg-purple-500' : 'bg-gray-600'
                }`} />
                <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  mode === 'login' ? 'bg-purple-500' : 'bg-gray-600'
                }`} />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
