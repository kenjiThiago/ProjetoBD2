'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlanosHero from './components/PlanosHero'
import PlanosContent from './components/PlanosContent'
import PlanosFeatures from './components/PlanosFeatures'
import PlanosFAQ from './components/PlanosFAQ'

export default function PlanosPage() {
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
