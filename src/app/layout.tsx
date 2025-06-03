import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PromptVault - 1000+ AI Prompts That Actually Work',
  description: 'Stop wasting time crafting prompts. Get proven, tested prompts that deliver results.',
  keywords: 'AI prompts, ChatGPT prompts, Claude prompts, AI tools, prompt engineering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}