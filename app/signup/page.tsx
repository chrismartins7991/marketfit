'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function SignupPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  useEffect(() => {
    if (error) {
      toast.error("Authentication Error", {
        description: "There was a problem signing in. Please try again."
      })
    }
  }, [error])

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: true,
      })
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error("Error", {
        description: "Failed to sign in with Google. Please try again."
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-black">Join </span>
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              MarketFit.ai
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Start your journey towards achieving Product-Market Fit.
          </p>
          <Button
            onClick={handleGoogleSignIn}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white"
          >
            Sign up with Google
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
