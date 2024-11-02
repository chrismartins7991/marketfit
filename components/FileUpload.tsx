'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface FileUploadProps {
  onUploadComplete?: () => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      toast.error('Please select a file first')
      return
    }

    setLoading(true)
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${session?.user?.id || 'anonymous'}/${fileName}`

      // Upload file to Supabase Storage
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('data-uploads')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      if (!fileData?.path) {
        throw new Error('File upload failed - no path returned')
      }

      // Store file metadata in the database
      const { error: dbError } = await supabase
        .from('user_files')
        .insert([{
          user_id: session?.user?.id || null,
          file_path: fileData.path,
          file_name: file.name,
          status: 'uploaded'
        }])

      if (dbError) {
        // If database insert fails, try to clean up the uploaded file
        await supabase.storage
          .from('data-uploads')
          .remove([fileData.path])
        throw dbError
      }

      toast.success('File uploaded successfully!')
      
      if (onUploadComplete) {
        onUploadComplete()
      }

      // Redirect based on authentication status
      if (!session) {
        router.push('/signup')
      } else {
        router.push('/dashboard')
      }

    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Error uploading file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".csv,.xlsx,.xls"
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-pink-50 file:text-pink-700
          hover:file:bg-pink-100"
      />
      <Button 
        onClick={handleSubmit}
        disabled={!file || loading}
        className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white"
      >
        {loading ? 'Uploading...' : 'Upload File'}
      </Button>
    </div>
  )
}
