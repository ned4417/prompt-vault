'use client'

import { motion } from 'framer-motion'
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for trying out our platform',
      features: [
        '10 free prompts per month',
        'Basic categories access',
        'Community support',
        'Standard quality prompts'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      popular: false
    },
    {
      name: 'Pro',
      price: 19,
      period: 'month',
      description: 'Most popular for serious creators',
      features: [
        'Unlimited prompt access',
        'All premium categories',
        'Priority support',
        'Advanced prompt variations',
        'Custom prompt requests',
        'Early access to new prompts',
        'Download in multiple formats'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700',
      popular: true
    },
    {
      name: 'Team',
      price: 49,
      period: 'month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration tools',
        'Shared prompt libraries',
        'Usage analytics',
        'Custom branding',
        'Dedicated account manager',
        'API access',
        'White-label options'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-gray-900 text-white hover:bg-gray-800',
      popular: false
    }
  ]

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Choose Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Perfect Plan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join thousands of creators who've transformed their workflow with our AI prompts
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl shadow-xl border-2 p-8 ${
                plan.popular 
                  ? 'border-indigo-500 transform scale-105' 
                  : 'border-gray-200 hover:border-indigo-300'
              } transition-all duration-300 hover:shadow-2xl`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <StarIcon className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">30-Day</div>
                <div className="text-gray-600">Money Back Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Have questions about our plans?</p>
          <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
            View FAQ →
          </button>
        </motion.div>
      </div>
    </div>
  )
}
