import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { buildship } from '@/lib/buildship'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // This would be replaced with actual CRM API calls
    const crmData = [
      { companyName: 'Company A', industry: 'Tech', revenue: 1000000 },
      { companyName: 'Company B', industry: 'Finance', revenue: 2000000 },
    ]

    for (const data of crmData) {
      const { error } = await supabase.from('startup_data').upsert(data, {
        onConflict: 'companyName'
      })
      if (error) throw error

      // Trigger PMF calculation for each company
      await buildship.trigger('calculate-pmf', { data })
    }

    res.status(200).json({ message: 'CRM sync completed' })
  } catch (error) {
    console.error('CRM sync error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
