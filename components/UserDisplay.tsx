'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function UserDisplay() {
  const { data: session } = useSession()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user?.email) {
      const emailUsername = session.user.email.split('@')[0]
      setUsername(emailUsername)
    }
  }, [session])

  if (!username) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{username}</span>
    </div>
  )
}
