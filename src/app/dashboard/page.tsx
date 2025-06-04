// src/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  CreditCardIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  BookmarkIcon,
  CalendarIcon,
  UserIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import Navigation from '../../components/Navigation'
import PromptViewModal from '../../components/PromptViewModal'

interface PurchasedPrompt {
  id: string
  title: string
  description: string
  content: string
  price: number
  category: string
  purchased_at: string
  tags: string[]
  success_rate: number
}

interface UserStats {
  totalPurchases: number
  totalSpent: number
  promptsOwned: number
  favoriteCategory: string
}

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [purchasedPrompts, setPurchasedPrompts] = useState<PurchasedPrompt[]>([])
  const [stats, setStats] = useState<UserStats>({
    totalPurchases: 0,
    totalSpent: 0,
    promptsOwned: 0,
    favoriteCategory: 'Business'
  })
  const [loadingData, setLoadingData] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPrompt, setSelectedPrompt] = useState<PurchasedPrompt | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      // Fetch purchased prompts
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select(`
          id,
          amount,
          purchased_at,
          prompts!inner (
            id,
            title,
            description,
            content,
            price,
            tags,
            success_rate,
            categories!inner (
              name
            )
          )
        `)
        .eq('user_id', user?.id)
        .not('prompt_id', 'is', null)
        .order('purchased_at', { ascending: false })

      if (purchasesError) throw purchasesError

      // Fetch free prompts (available to all users)
      const { data: freePrompts, error: freePromptsError } = await supabase
        .from('prompts')
        .select(`
          id,
          title,
          description,
          content,
          price,
          tags,
          success_rate,
          categories (
            name
          )
        `)
        .eq('is_free', true)
        .order('created_at', { ascending: false })

      if (freePromptsError) throw freePromptsError

      // Transform purchased prompts
      const purchasedPromptsData = purchases?.map(purchase => {
        const prompt = purchase.prompts as any
        const category = prompt.categories as any
        return {
          id: prompt.id,
          title: prompt.title,
          description: prompt.description,
          content: prompt.content,
          price: purchase.amount,
          category: category?.name || 'General',
          purchased_at: purchase.purchased_at,
          tags: prompt.tags || [],
          success_rate: prompt.success_rate || 0
        }
      }) || []

      // Transform free prompts
      const freePromptsData = freePrompts?.map(prompt => {
        const category = prompt.categories as any
        return {
          id: prompt.id,
          title: prompt.title,
          description: prompt.description,
          content: prompt.content,
          price: 0, // Free prompts are $0
          category: category?.name || 'General',
          purchased_at: new Date().toISOString(), // Use current date for free prompts
          tags: prompt.tags || [],
          success_rate: prompt.success_rate || 0
        }
      }) || []

      // Combine purchased and free prompts, removing duplicates
      const allPrompts = [...purchasedPromptsData]
      freePromptsData.forEach(freePrompt => {
        // Only add free prompt if it's not already purchased
        if (!purchasedPromptsData.find(p => p.id === freePrompt.id)) {
          allPrompts.push(freePrompt)
        }
      })

      setPurchasedPrompts(allPrompts)

      // Calculate user stats (only from actual purchases)
      const totalSpent = purchases?.reduce((sum, p) => sum + p.amount, 0) || 0
      const categories = allPrompts.map(p => p.category)
      const favoriteCategory = categories.length > 0 
        ? categories.reduce((a, b, i, arr) => 
            arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
          )
        : 'Business'

      setStats({
        totalPurchases: purchases?.length || 0,
        totalSpent,
        promptsOwned: allPrompts.length,
        favoriteCategory
      })

    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoadingData(false)
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded-2xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-300 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your dashboard</h1>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    )
  }

  const statsData = [
    {
      title: 'Prompts Owned',
      value: stats.promptsOwned,
      icon: DocumentTextIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Total Spent',
      value: `$${stats.totalSpent.toFixed(2)}`,
      icon: CreditCardIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'Total Purchases',
      value: stats.totalPurchases,
      icon: ChartBarIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Favorite Category',
      value: stats.favoriteCategory,
      icon: BookmarkIcon,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}! 👋
            </h1>
            <p className="text-gray-600">Here's your prompt collection and account overview.</p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'My Prompts', icon: DocumentTextIcon },
                { id: 'subscription', name: 'Subscription', icon: CreditCardIcon },
                { id: 'settings', name: 'Settings', icon: CogIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {purchasedPrompts.length === 0 ? (
                <div className="text-center py-16">
                  <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No prompts yet</h3>
                  <p className="text-gray-600 mb-6">Start building your collection by purchasing some amazing prompts!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/'}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Browse Prompts
                  </motion.button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedPrompts.map((prompt, index) => (
                    <motion.div
                      key={prompt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
                              {prompt.category}
                            </div>
                            {prompt.price === 0 && (
                              <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                                FREE
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600">{prompt.success_rate}%</span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {prompt.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {prompt.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex flex-wrap gap-1">
                            {prompt.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${prompt.price}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {prompt.price === 0 
                              ? 'Free prompt' 
                              : `Purchased ${new Date(prompt.purchased_at).toLocaleDateString()}`
                            }
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedPrompt(prompt)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                          >
                            View Prompt
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'subscription' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="text-center">
                <CreditCardIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Subscription</h3>
                <p className="text-gray-600 mb-6">Subscribe to get unlimited access to all prompts and exclusive benefits.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Subscription Plans
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user.user_metadata?.full_name || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Prompt View Modal */}
      <PromptViewModal
        isOpen={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        prompt={selectedPrompt}
      />
    </div>
  )
}