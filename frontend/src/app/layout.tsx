import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Melhora a performance
  preload: true,   // Garante preload correto
  fallback: ['system-ui', 'arial'] // Fonte fallback
})

export const metadata: Metadata = {
  title: 'Codify - Sua Jornada de Programação',
  description: 'Plataforma de cursos online para desenvolvedores. Aprenda programação com os melhores especialistas.',
  icons: {
    icon: "/favicon.png"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
