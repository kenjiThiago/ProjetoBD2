'use client'

import { motion } from 'framer-motion'
import { Check, X, Star, Crown, Code2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface PlanFeature {
  text: string
  included: boolean
}

interface Plan {
  id: string
  name: string
  description: string
  price: string
  originalPrice?: string
  period: string
  popular?: boolean
  features: PlanFeature[]
  buttonText: string
  buttonStyle: string
  icon: any
  highlight?: string
}

export default function PlanosContent() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const router = useRouter()

  const handlePlanoClick = (planoId: string) => {
    if (planoId === 'free') {
      // Redirecionar para página de cadastro com plano gratuito
      router.push('/auth?plan=free')
    } else {
      // Redirecionar para página de cadastro com plano pro
      router.push('/auth?plan=pro')
    }
  }

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Plano Gratuito',
      description: 'Perfeito para começar sua jornada na programação',
      price: 'R$ 0',
      period: billingPeriod === 'monthly' ? '/mês' : '/ano',
      features: [
        { text: 'Acesso aos cursos grátis', included: true },
        { text: 'Exercícios práticos', included: true },
        { text: 'Comunidade no Discord', included: true },
        { text: 'Certificados básicos', included: true },
        { text: 'Suporte por email', included: true },
        { text: 'Acesso a projetos premium', included: false },
        { text: 'Mentoria 1:1', included: false },
        { text: 'Acesso prioritário a novos cursos', included: false },
        { text: 'Preparação para entrevistas', included: false },
        { text: 'Portfolio profissional', included: false },
      ],
      buttonText: 'Começar Gratuitamente',
      buttonStyle: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600',
      icon: Code2,
    },
    {
      id: 'pro',
      name: 'Plano Pro',
      description: 'Acelere seu aprendizado com recursos premium',
      price: billingPeriod === 'monthly' ? 'R$ 49' : 'R$ 490',
      originalPrice: billingPeriod === 'yearly' ? 'R$ 588' : undefined,
      period: billingPeriod === 'monthly' ? '/mês' : '/ano',
      popular: true,
      highlight: billingPeriod === 'yearly' ? '2 meses grátis' : undefined,
      features: [
        { text: 'Acesso completo a todos os cursos', included: true },
        { text: 'Projetos práticos premium', included: true },
        { text: 'Mentoria em grupo semanal', included: true },
        { text: 'Certificados reconhecidos', included: true },
        { text: 'Preparação para entrevistas técnicas', included: true },
        { text: 'Portfolio profissional personalizado', included: true },
        { text: 'Acesso prioritário a novos conteúdos', included: true },
        { text: 'Suporte prioritário 24/7', included: true },
        { text: 'Networking com outros profissionais', included: true },
        { text: 'Mentoria individual 1:1 (2x/mês)', included: true },
      ],
      buttonText: 'Começar Agora',
      buttonStyle: 'btn-primary',
      icon: Crown,
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="planos-content" className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Billing Toggle */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-800/50 rounded-xl p-1 border border-gray-700">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                billingPeriod === 'yearly'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={`relative rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-purple-500 bg-gradient-to-br from-gray-900 to-purple-950/20 shadow-2xl shadow-purple-500/20'
                    : 'border-gray-700 bg-gray-900/50'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Mais Popular</span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-orange-500'
                        : 'bg-gray-800'
                    }`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  {plan.originalPrice && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="text-gray-500 line-through text-lg">{plan.originalPrice}</span>
                      {plan.highlight && (
                        <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                          {plan.highlight}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`rounded-full p-1 mt-0.5 ${
                        feature.included
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {feature.included ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${plan.buttonStyle}`}
                  onClick={() => handlePlanoClick(plan.id)}
                >
                  <span>{plan.buttonText}</span>
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-4">
            💡 Todos os planos incluem acesso vitalício ao conteúdo adquirido
          </p>
          <p className="text-sm text-gray-500">
            Cancele a qualquer momento • Sem taxas de cancelamento • Garantia de 30 dias
          </p>
        </motion.div>
      </div>
    </section>
  )
}
