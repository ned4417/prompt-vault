// components/TokenPurchaseModal.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, SparklesIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../contexts/AuthContext'
import { TokenPurchaseModalProps, TokenPackage, SubscriptionPlan } from '../types/models'

const TOKEN_PACKAGES: Record<string, TokenPackage> = {
  starter: {
    id: 'starter',
    name: 'Starter Pack',
    tokens: 25,
    price: 9.99,
    description: 'Perfect for trying out prompts',
    popular: false,
    gradient: 'from-blue-500 to-blue-600',
    icon: '🌟'
  },
  popular: {
    id: 'popular',
    name: 'Popular Pack',
    tokens: 75,
    bonus: 12,
    price: 24.99,
    originalPrice: 29.99,
    description: 'Most popular choice',
    popular: true,
    gradient: 'from-purple-500 to-purple-600',
    icon: '🚀'
  },
  pro: {
    id: 'pro',
    name: 'Pro Pack',
    tokens: 200,
    bonus: 40,
    price: 59.99,
    originalPrice: 79.99,
    description: 'For serious prompt users',
    popular: false,
    gradient: 'from-emerald-500 to-emerald-600',
    icon: '💎'
  }
}

const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  basic: {
    id: 'basic',
    name: 'Basic Plan',
    tokens: 50,
    price: 19.99,
    description: 'Great for regular users',
    stripePriceId: 'price_basic',
    popular: false,
    features: ['50 tokens per month', 'Tokens roll over', 'Cancel anytime', 'Priority support']
  },
  pro: {
    id: 'pro',
    name: 'Pro Plan',
    tokens: 150,
    price: 49.99,
    description: 'Perfect for power users',
    stripePriceId: 'price_pro',
    popular: true,
    features: ['150 tokens per month', 'Tokens roll over', 'Cancel anytime', 'Priority support', 'Early access to new prompts']
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Plan',
    tokens: 500,
    price: 149.99,
    description: 'For teams and businesses',
    stripePriceId: 'price_enterprise',
    popular: false,
    features: ['500 tokens per month', 'Tokens roll over', 'Cancel anytime', 'Priority support', 'Team management', 'API access']
  }
}

export default function TokenPurchaseModal({ isOpen, onClose }: TokenPurchaseModalProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'tokens' | 'subscription'>('tokens')
  const [loading, setLoading] = useState(false)

  const handlePurchase = async (type: 'tokens' | 'subscription', id: string) => {
    if (!user) return

    setLoading(true)
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          packageId: type === 'tokens' ? id : undefined,
          planId: type === 'subscription' ? id : undefined,
          userId: user.id,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get More Tokens</h2>
              <p className="text-gray-600">Choose tokens or subscribe for the best value</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('tokens')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'tokens'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              One-time Purchase
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'subscription'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly Subscription
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'tokens' && (
            <div className="grid md:grid-cols-3 gap-6">
              {Object.values(TOKEN_PACKAGES).map((pkg) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative bg-gradient-to-br ${pkg.gradient} rounded-2xl p-6 text-white ${
                    pkg.popular ? 'ring-4 ring-yellow-400 ring-opacity-50 scale-105' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                        <StarIcon className="w-4 h-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="text-4xl mb-4">{pkg.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-white/90 text-sm mb-4">{pkg.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-3xl font-bold">
                        {pkg.tokens + (pkg.bonus || 0)} tokens
                      </div>
                      {pkg.bonus && (
                        <div className="text-sm text-white/90">
                          {pkg.tokens} + {pkg.bonus} bonus
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="text-2xl font-bold">
                        ${pkg.price}
                      </div>
                      {pkg.originalPrice && (
                        <div className="text-sm text-white/75 line-through">
                          ${pkg.originalPrice}
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePurchase('tokens', pkg.id)}
                      disabled={loading}
                      className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Buy Now'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="grid md:grid-cols-3 gap-6">
              {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative bg-white border-2 rounded-2xl p-6 ${
                    plan.popular 
                      ? 'border-indigo-500 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-indigo-300'
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900">
                        {plan.tokens} tokens
                      </div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>

                    <div className="text-2xl font-bold text-gray-900 mb-6">
                      ${plan.price}/month
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePurchase('subscription', plan.id)}
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-bold transition-colors disabled:opacity-50 ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {loading ? 'Processing...' : 'Subscribe'}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CreditCardIcon className="w-4 h-4" />
              <span>Secure payment by Stripe</span>
            </div>
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-4 h-4" />
              <span>Tokens never expire</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}