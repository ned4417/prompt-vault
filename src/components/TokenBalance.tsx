// components/TokenBalance.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { TokenBalanceProps, UserTokenBalance } from '../types/models'

export default function TokenBalance({ onPurchaseClick, showPurchaseButton = true }: TokenBalanceProps) {
  const { user } = useAuth()
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchTokenBalance()
    }
  }, [user])

  const fetchTokenBalance = async () => {
    try {
      const response = await fetch(`/api/tokens/balance?userId=${user?.id}`)
      if (response.ok) {
        const data: UserTokenBalance = await response.json()
        setBalance(data.balance)
      }
    } catch (error) {
      console.error('Error fetching token balance:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-full border border-yellow-200">
        <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="w-12 h-4 bg-yellow-300 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-full border border-yellow-200">
        <SparklesIcon className="w-4 h-4 text-yellow-600" />
        <span className="font-semibold text-yellow-800">{balance} tokens</span>
      </div>
      
      {showPurchaseButton && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPurchaseClick}
          className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Buy</span>
        </motion.button>
      )}
    </div>
  )
}