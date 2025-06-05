// src/components/Navigation.tsx
'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, SparklesIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import AuthModal from './AuthModal'
import TokenBalance from './TokenBalance'
import TokenPurchaseModal from './TokenPurchaseModal'

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showTokenModal, setShowTokenModal] = useState(false)

  const { user, signOut, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUserMenuOpen(false)
    }
    
    if (userMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [userMenuOpen])

  const navItems = [
    { name: 'Browse', href: '#', badge: null },
    { name: 'Categories', href: '#', badge: null },
    { name: 'Trending', href: '#', badge: '🔥' },
    { name: 'Pricing', href: '#', badge: null }
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      setUserMenuOpen(false)
      // Redirect to home page after sign out
      router.push('/')
    } catch (error) {
      console.warn('Sign out error in navigation:', error)
      // Force clear and redirect even if sign out failed
      setUserMenuOpen(false)
      router.push('/')
    }
  }

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  // Show loading skeleton during hydration
  if (!mounted) {
    return (
      <nav className="backdrop-blur-xl bg-white/95 border border-white/20 shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  PromptVault
                </h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-xs">{item.badge}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Loading State */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search 1,200+ prompts..."
                  className="pl-12 pr-4 py-3 border border-gray-200 rounded-2xl w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Loading skeleton */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              </div>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="backdrop-blur-xl bg-white/95 border border-white/20 shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  PromptVault
                </h1>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex space-x-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-xs">{item.badge}</span>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Search 1,200+ prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 border border-gray-200 rounded-2xl w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>
              </div>

              {/* User Authentication */}
              {loading ? (
                <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              ) : user ? (
                /* Logged In User Menu */
                <>
                <TokenBalance onPurchaseClick={() => setShowTokenModal(true)} />
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setUserMenuOpen(!userMenuOpen)
                    }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 px-4 py-2 rounded-full transition-all duration-300"
                  >
                    <UserCircleIcon className="w-6 h-6 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600 hidden sm:block">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.user_metadata?.full_name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <a
                          href="/dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Dashboard
                        </a>
                        <a
                          href="/my-prompts"
                          className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Prompts
                        </a>
                        <button
                          onClick={() => setUserMenuOpen(false)}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          Settings
                        </button>
                        <hr className="my-2 border-gray-200" />
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                </>
              ) : (
                /* Not Logged In - Auth Buttons */
                <div className="hidden sm:flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openAuthModal('signin')}
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openAuthModal('signup')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Free Trial
                  </motion.button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {item.badge && <span className="text-sm">{item.badge}</span>}
                      </div>
                    </a>
                  ))}
                </div>

                {/* Mobile Auth/User Section */}
                {!user ? (
                  /* Mobile CTA for non-logged in users */
                  <div className="pt-4 space-y-3">
                    <button 
                      onClick={() => {
                        openAuthModal('signin')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full text-gray-700 hover:text-indigo-600 font-medium py-3 transition-colors"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        openAuthModal('signup')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg"
                    >
                      Start Free Trial
                    </button>
                  </div>
                ) : (
                  /* Mobile User Menu for logged in users */
                  <div className="pt-4 space-y-2">
                    <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200">
                      <div className="font-medium text-gray-900">
                        {user.user_metadata?.full_name || 'User'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    <a
                      href="/dashboard"
                      className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <a
                      href="/my-prompts"
                      className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Prompts
                    </a>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />

      <TokenPurchaseModal 
        isOpen={showTokenModal} 
        onClose={() => setShowTokenModal(false)} 
      />
    </>
  )
}