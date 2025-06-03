'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'

interface PromptModalProps {
  prompt: any
  onClose: () => void
}

export default function PromptModal({ prompt, onClose }: PromptModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold">{prompt.title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-2">Prompt Preview:</h4>
              <p className="text-sm text-gray-700 font-mono bg-white p-3 rounded border">
                {prompt.preview}
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">What You Get:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Main prompt (tested extensively)</li>
                <li>✓ 3 follow-up variations</li>
                <li>✓ Usage instructions</li>
                <li>✓ Best practices guide</li>
                <li>✓ Industry-specific examples</li>
              </ul>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-green-600">${prompt.price}</span>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < prompt.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">({prompt.reviews} reviews)</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
                Buy Now - ${prompt.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
