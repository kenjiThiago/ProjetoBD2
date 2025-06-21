'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlanosHero from './components/PlanosHero'
import PlanosContent from './components/PlanosContent'
import PlanosFeatures from './components/PlanosFeatures'
import PlanosFAQ from './components/PlanosFAQ'
import { Suspense } from 'react'

function PlanosPageContent() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main>
        <PlanosHero />
        <PlanosContent />
        <PlanosFeatures />
        <PlanosFAQ />
      </main>

      <Footer />
    </div>
  )
}

// Loading fallback
function PlanoPageLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<PlanoPageLoading />}>
      <PlanosPageContent />
    </Suspense>
  )
}
