import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cursos - Codify | Aprenda Programação do Zero ao Avançado',
  description: 'Explore nossa biblioteca com centenas de cursos de programação. JavaScript, React, Python, Node.js e muito mais. Aprenda com os melhores instrutores.',
  keywords: 'cursos programação, javascript, react, python, nodejs, desenvolvimento web, codify',
}

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
