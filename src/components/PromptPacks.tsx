'use client'

import { motion } from 'framer-motion'
import { CheckIcon, SparklesIcon, RocketLaunchIcon, StarIcon } from '@heroicons/react/24/solid'

export default function PromptPacks() {
  const packs = [
    {
      title: 'Complete Marketing Suite',
      description: '50+ marketing prompts: ads, emails, social media, landing pages, conversion optimization, and more.',
      price: 49,
      originalPrice: 147,
      discount: '67% OFF',
      badge: '🎯 Best Seller',
      gradient: 'from-blue-600 to-purple-600',
      features: ['50+ Premium Prompts', 'Email Templates', 'Social Media Kit', 'Landing Page Copy', 'A/B Test Variations'],
      icon: '🎯',
      popular: true
    },
    {
      title: "Developer's Toolkit",
      description: '40+ coding prompts: debugging, documentation, testing, architecture, code review, and optimization.',
      price: 39,
      originalPrice: 120,
      discount: 'Save $81',
      badge: '⚡ New',
      gradient: 'from-purple-600 to-pink-600',
      features: ['40+ Code Prompts', 'Debug Assistant', 'Documentation Generator', 'Code Review Templates', 'Architecture Patterns'],
      icon: '⚡',
      popular: false
    },
    {
      title: 'Content Creator Pack',
      description: '35+ content prompts: blog posts, social media, newsletters, video scripts, and engagement strategies.',
      price: 29,
      originalPrice: 87,
      discount: 'Limited Time',
      badge: '✨ Popular',
      gradient: 'from-green-600 to-teal-600',
      features: ['35+ Content Prompts', 'Blog Post Templates', 'Video Scripts', 'Newsletter Ideas', 'Engagement Hooks'],
      icon: '✨',
      popular: false
    }
  ]

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full px-4 py-2 mb-4"
        >
          <SparklesIcon className="w-4 h-4 mr-2" />
          <span className="text-sm font-semibold">Premium Collections</span>
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          💎 Curated <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Prompt Bundles</span>
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Save up to 70% with our expertly curated prompt collections. Everything you need for your specific use case.
        </motion.p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packs.map((pack, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className={`relative bg-gradient-to-br ${pack.gradient} rounded-3xl p-8 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 ${pack.popular ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}`}
          >
            {/* Popular Badge */}
            {pack.popular && (
              <div className="absolute -top-3 -right-3">
                <div className="bg-yellow-400 text-yellow-900 rounded-full p-3 shadow-lg">
                  <StarIcon className="w-6 h-6" />
                </div>
              </div>
            )}

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-2xl mr-2">{pack.icon}</span>
                <span className="text-sm font-semibold">{pack.badge}</span>
              </div>
              
              {/* Title and Description */}
              <h4 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
                {pack.title}
              </h4>
              <p className="mb-6 opacity-90 leading-relaxed text-sm">
                {pack.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-2 mb-6">
                {pack.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.1) }}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <CheckIcon className="w-4 h-4 text-green-300 flex-shrink-0" />
                    <span className="opacity-90">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              {/* Pricing */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold">${pack.price}</span>
                  <span className="text-lg opacity-75 line-through">${pack.originalPrice}</span>
                </div>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  {pack.discount}
                </div>
              </div>
              
              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <RocketLaunchIcon className="w-5 h-5" />
                <span>Get {pack.title.split(' ')[0]} Pack</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600 mb-1">5,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">30-Day</div>
              <div className="text-sm text-gray-600">Money Back</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600 mb-1">Instant</div>
              <div className="text-sm text-gray-600">Download</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
