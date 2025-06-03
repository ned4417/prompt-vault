'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [userCount, setUserCount] = useState(12847)
  const [promptCount, setPromptCount] = useState(1247)
  const [successRate, setSuccessRate] = useState(94)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Reset to 0 and animate only after component mounts
    setUserCount(0)
    setPromptCount(0)
    setSuccessRate(0)

    // Animated counters
    const animateCounter = (setter: any, target: number, duration: number) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
      }, 16)
    }

    // Small delay to ensure smooth animation
    setTimeout(() => {
      animateCounter(setUserCount, 12847, 2000)
      animateCounter(setPromptCount, 1247, 2000)
      animateCounter(setSuccessRate, 94, 2000)
    }, 100)
  }, [])

  // Show static values during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full px-6 py-2 mb-8 shadow-lg">
              <span className="text-sm font-semibold">🎉 Join 12,000+ creators using our prompts daily!</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Prompts
              </span>
              <br />
              <span className="text-gray-800">That Convert</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stop wasting hours crafting prompts. Get <span className="font-semibold text-indigo-600">proven, tested prompts</span> that deliver exceptional results every time.
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-8 md:space-x-12 mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600">12,847+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600">1,247+</div>
                <div className="text-sm text-gray-600 font-medium">AI Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-600">94%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>

            {/* AI Platform Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { name: 'ChatGPT', icon: '🤖', color: 'from-green-400 to-green-600' },
                { name: 'Claude', icon: '🧠', color: 'from-blue-400 to-blue-600' },
                { name: 'Gemini', icon: '✨', color: 'from-purple-400 to-purple-600' },
                { name: 'GPT-4', icon: '⚡', color: 'from-orange-400 to-orange-600' }
              ].map((item) => (
                <div key={item.name} className={`flex items-center space-x-2 bg-gradient-to-r ${item.color} text-white rounded-full px-4 py-2 shadow-lg`}>
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-semibold">{item.name} Ready</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <span className="relative z-10">Start Free Trial →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-lg border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Browse Free Samples
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>30-day money back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full px-6 py-2 mb-8 shadow-lg"
          >
            <span className="text-sm font-semibold">🎉 Join 12,000+ creators using our prompts daily!</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Prompts
            </span>
            <br />
            <span className="text-gray-800">That Convert</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Stop wasting hours crafting prompts. Get <span className="font-semibold text-indigo-600">proven, tested prompts</span> that deliver exceptional results every time.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-8 md:space-x-12 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">{userCount.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">{promptCount.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 font-medium">AI Prompts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600">{successRate}%</div>
              <div className="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
          </motion.div>

          {/* AI Platform Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { name: 'ChatGPT', icon: '🤖', color: 'from-green-400 to-green-600' },
              { name: 'Claude', icon: '🧠', color: 'from-blue-400 to-blue-600' },
              { name: 'Gemini', icon: '✨', color: 'from-purple-400 to-purple-600' },
              { name: 'GPT-4', icon: '⚡', color: 'from-orange-400 to-orange-600' }
            ].map((item) => (
              <div key={item.name} className={`flex items-center space-x-2 bg-gradient-to-r ${item.color} text-white rounded-full px-4 py-2 shadow-lg`}>
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-semibold">{item.name} Ready</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <span className="relative z-10">Start Free Trial →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-lg border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Browse Free Samples
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>30-day money back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Instant access</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
