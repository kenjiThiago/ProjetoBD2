'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AuthForm from './components/AuthForm'

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'free'
  const [mode, setMode] = useState<'login' | 'register'>('register')

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="py-20">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {plan === 'free' && (
              <div className="text-center mb-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <h3 className="text-green-400 font-semibold mb-2">🎉 Plano Gratuito</h3>
                <p className="text-sm text-gray-300">
                  Acesso imediato a 5 cursos básicos + certificados
                </p>
              </div>
            )}

            <AuthForm mode={mode} plan={plan} />

            <div className="text-center mt-6">
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                {mode === 'login'
                  ? 'Não tem conta? Criar conta'
                  : 'Já tem conta? Fazer login'
                }
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
