import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  try {
    // Create the user in Supabase
    const { user, error } = await supabase.auth.admin.createUser({
      email,
      password,
    })

    if (error) {
      console.error('Error creating user:', error)
      return res.status(400).json({ error: error.message })
    }

    res.status(200).json({ message: 'User created successfully', user })
  } catch (error) {
    console.error('Unexpected error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
