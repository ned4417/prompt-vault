// components/PromptViewModal.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { XMarkIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

interface PromptViewModalProps {
  isOpen: boolean
  onClose: () => void
  prompt: {
    id: string
    title: string
    description: string
    content: string
    category: string
    tags: string[]
    success_rate: number
    purchased_at: string
  } | null
}

export default function PromptViewModal({ isOpen, onClose, prompt }: PromptViewModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen || !prompt) return null

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {prompt.category}
                </span>
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">{prompt.success_rate}% Success Rate</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{prompt.title}</h2>
              <p className="text-gray-600">{prompt.description}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {prompt.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Prompt Content</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-5 h-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="w-5 h-5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {prompt.content}
            </pre>
          </div>

          {/* Usage Instructions */}
          <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">💡 How to Use This Prompt</h4>
            <div className="text-blue-800 text-sm space-y-2">
              <p>1. <strong>Copy the prompt</strong> using the button above</p>
              <p>2. <strong>Replace the bracketed placeholders</strong> [LIKE THIS] with your specific information</p>
              <p>3. <strong>Paste into your AI tool</strong> (ChatGPT, Claude, etc.)</p>
              <p>4. <strong>Review and refine</strong> the output as needed</p>
            </div>
          </div>

          {/* Purchase Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Purchased on {new Date(prompt.purchased_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}