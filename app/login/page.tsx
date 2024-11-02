'use client'  // Add this line at the top of the file

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/data-entry') // Redirect to data entry or another page
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-black">Welcome to </span>
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              MarketFit.ai
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Access AI-driven Product-Market Fit insights without logging in.
          </p>
          <Button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white"
          >
            Get Started
          </Button>
        </div>
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center text-gray-600">
          <p>&copy; 2024 MarketFit.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
