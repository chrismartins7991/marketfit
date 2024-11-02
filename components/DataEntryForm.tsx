'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useSession } from 'next-auth/react'

interface DataEntryFormProps {
  onSubmit?: () => void
}

export function DataEntryForm({ onSubmit }: DataEntryFormProps) {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const onSubmitForm = async (data: any) => {
    setLoading(true)
    try {
      // Store the data in Supabase
      const { error } = await supabase
        .from('startup_data')
        .insert([
          {
            user_id: session?.user?.id,
            data: data,
          },
        ])
      if (error) {
        throw error
      }
      // Trigger any additional actions
      if (onSubmit) {
        onSubmit()
      }
      // Navigate to the signup page if not authenticated, otherwise to dashboard
      if (!session) {
        router.push('/signup')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <Input {...register('startup_name')} placeholder="Startup Name" required />
      <Input {...register('startup_stage')} placeholder="Startup Stage" required />
      <Input {...register('industry')} placeholder="Industry" required />
      <Input {...register('revenue')} placeholder="Revenue" type="number" step="0.01" required />
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
