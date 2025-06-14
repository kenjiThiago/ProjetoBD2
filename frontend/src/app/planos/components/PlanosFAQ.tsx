'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function PlanosFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: 'Posso mudar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se fizer upgrade, pagará apenas a diferença proporcional. Se fizer downgrade, o valor será creditado para o próximo ciclo.'
    },
    {
      question: 'O que acontece se eu cancelar minha assinatura?',
      answer: 'Você manterá acesso a todos os recursos até o final do período pago. Após isso, sua conta será convertida automaticamente para o plano gratuito, mantendo acesso ao conteúdo básico.'
    },
    {
      question: 'Os certificados são reconhecidos pelo mercado?',
      answer: 'Sim! Nossos certificados são reconhecidos por centenas de empresas parceiras e incluem validação digital. Eles demonstram suas habilidades práticas através dos projetos realizados.'
    },
    {
      question: 'Como funciona a mentoria?',
      answer: 'No plano Pro, você tem acesso a sessões de mentoria em grupo semanais. As mentorias individuais estão disponíveis em planos enterprise ou podem ser adquiridas separadamente.'
    },
    {
      question: 'Posso acessar o conteúdo offline?',
      answer: 'Sim! Através do nosso app móvel, você pode baixar as aulas e acessá-las offline. Perfeito para estudar em qualquer lugar, mesmo sem internet.'
    },
    {
      question: 'Existe garantia de satisfação?',
      answer: 'Oferecemos 30 dias de garantia incondicional. Se não ficar satisfeito por qualquer motivo, devolvemos 100% do valor pago, sem perguntas.'
    }
  ]

  return (
    <section className="py-16 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="text-xl text-gray-400">
            Tire suas dúvidas sobre nossos planos e serviços
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 mb-4">
            Ainda tem dúvidas? Entre em contato conosco!
          </p>
          <button className="btn-secondary">
            Falar com Suporte
          </button>
        </motion.div>
      </div>
    </section>
  )
}
