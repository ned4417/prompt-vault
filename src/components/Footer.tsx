'use client'

import { motion } from 'framer-motion'
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Browse Prompts', href: '#' },
      { name: 'Categories', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'API Access', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Status', href: '#' },
      { name: 'Community', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: 'f', href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: '📷', href: '#', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: 'in', href: '#', color: 'hover:text-blue-700' },
    { name: 'GitHub', icon: '⚡', href: '#', color: 'hover:text-gray-300' }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Latest Prompts</span>
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Get weekly updates on new prompts, tips, and exclusive offers. Join 10,000+ creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <SparklesIcon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">PromptVault</h2>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The world's largest marketplace for AI prompts. Discover, create, and share prompts that deliver exceptional results.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 transition-colors duration-300 ${social.color} flex items-center justify-center w-10 h-10 font-bold`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 capitalize text-white">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4 text-gray-300">
              <span>© 2024 PromptVault. All rights reserved.</span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" />
                <span>for creators</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>•</span>
              <span>99.9% uptime</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
