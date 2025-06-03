'use client'

import { HeartIcon, StarIcon, FireIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FeaturedPromptsProps {
  onPromptSelect: (prompt: any) => void
}

export default function FeaturedPrompts({ onPromptSelect }: FeaturedPromptsProps) {
  const [likedPrompts, setLikedPrompts] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const prompts = [
    {
      id: 1,
      title: 'Cold Email Generator That Converts',
      description: 'Generate personalized cold emails with 40%+ open rates. Includes 5 variations and follow-up sequences that actually get responses.',
      category: 'Business',
      price: 12,
      originalPrice: 24,
      rating: 5,
      reviews: 47,
      sales: 347,
      author: { name: '@salesguru', avatar: 'SG', verified: true },
      tags: ['🔥 Hot', 'Bestseller'],
      preview: 'You are an expert cold email writer. Create a personalized cold email for [INDUSTRY] targeting [ROLE]...',
      gradient: 'from-blue-500 to-cyan-500',
      successRate: '94%'
    },
    {
      id: 2,
      title: 'Code Review Assistant Pro',
      description: 'AI code reviewer that catches bugs, suggests improvements, and explains best practices across 15+ languages.',
      category: 'Coding',
      price: 15,
      originalPrice: 30,
      rating: 5,
      reviews: 89,
      sales: 203,
      author: { name: '@devmaster', avatar: 'DM', verified: true },
      tags: ['⚡ New'],
      preview: 'You are a senior software engineer conducting a thorough code review...',
      gradient: 'from-purple-500 to-pink-500',
      successRate: '98%'
    },
    {
      id: 3,
      title: 'Viral LinkedIn Post Creator',
      description: 'Generate engaging LinkedIn posts that get 10x more engagement. Includes hooks, CTAs, and hashtag strategies.',
      category: 'Writing',
      price: 8,
      originalPrice: 16,
      rating: 4,
      reviews: 34,
      sales: 156,
      author: { name: '@socialmaven', avatar: 'SM', verified: true },
      tags: ['✨ Popular'],
      preview: 'Create a viral LinkedIn post about [TOPIC] that will generate massive engagement...',
      gradient: 'from-green-500 to-teal-500',
      successRate: '87%'
    }
  ]

  const toggleLike = (promptId: number) => {
    setLikedPrompts(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    )
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full px-4 py-2 mb-4"
        >
          <FireIcon className="w-4 h-4 mr-2" />
          <span className="text-sm font-semibold">Trending This Week</span>
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Most Popular <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Prompts</span>
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Handpicked prompts that deliver exceptional results. Join thousands of satisfied users.
        </motion.p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {prompts.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Header with gradient */}
            <div className={`h-2 bg-gradient-to-r ${prompt.gradient}`}></div>
            
            <div className="p-6">
              {/* Tags and Rating */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className={`bg-gradient-to-r ${prompt.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {prompt.category}
                  </span>
                  {prompt.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid 
                        key={i} 
                        className={`w-4 h-4 ${i < prompt.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">({prompt.reviews})</span>
                </div>
              </div>
              
              {/* Title and Description */}
              <h4 className="font-bold text-xl mb-3 text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                {prompt.title}
              </h4>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {prompt.description}
              </p>
              
              {/* Success Rate */}
              <div className="flex items-center space-x-2 mb-4">
                <ChartBarIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-semibold">{prompt.successRate} Success Rate</span>
              </div>
              
              {/* Author and Price */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${prompt.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-sm font-bold">{prompt.author.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 flex items-center space-x-1">
                      <span>{prompt.author.name}</span>
                      {prompt.author.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{prompt.sales} sales</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${prompt.price}</span>
                    <span className="text-sm text-gray-500 line-through">${prompt.originalPrice}</span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">50% OFF</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPromptSelect(prompt)}
                  className={`flex-1 bg-gradient-to-r ${prompt.gradient} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Preview & Buy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleLike(prompt.id)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-red-300 transition-colors group"
                >
                  {likedPrompts.includes(prompt.id) ? (
                    <HeartIconSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          View All 1,200+ Prompts →
        </button>
      </motion.div>
    </div>
  )
}
