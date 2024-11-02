'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthError() {
  const router = useRouter()

  useEffect(() => {
    router.push('/signup?error=AuthError')
  }, [router])

  return null
} 