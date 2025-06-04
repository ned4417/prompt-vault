// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
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
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  // Show loading state while checking auth or during redirect
  if (loading || user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">
            {loading ? 'Loading...' : 'Redirecting to dashboard...'}
          </p>
        </div>
      </div>
    )
  }

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