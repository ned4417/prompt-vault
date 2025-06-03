'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedPrompts from '../components/FeaturedPrompts'
import PromptPacks from '../components/PromptPacks'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import PromptModal from '../components/PromptModal'

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Navigation />
      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
          <Categories />
          <FeaturedPrompts onPromptSelect={setSelectedPrompt} />
          <PromptPacks />
        </div>
        <Pricing />
      </main>
      <Footer />
      
      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </div>
  )
}
