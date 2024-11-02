'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PMFScoreDisplay } from '@/components/PMFScoreDisplay'
import { SuggestionsList } from '@/components/SuggestionsList'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Activity, TrendingUp } from 'lucide-react'

export default function DashboardContent() {
  const [pmfScore, setPmfScore] = useState<number | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [historicalScores, setHistoricalScores] = useState<{ date: string; score: number }[]>([])
  const router = useRouter()

  useEffect(() => {
    // Instead of fetching data, use dummy data
    // Set PMF Score to a dummy value
    setPmfScore(75) // For example

    // Set suggestions to dummy data
    setSuggestions([
      "Focus on enhancing user onboarding experience.",
      "Implement a referral program to boost user acquisition.",
      "Expand to new markets by localizing content.",
    ])

    // Set historical scores to dummy data
    setHistoricalScores([
      { date: '2023-06', score: 60 },
      { date: '2023-07', score: 65 },
      { date: '2023-08', score: 68 },
      { date: '2023-09', score: 70 },
      { date: '2023-10', score: 75 },
    ])
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto space-y-8"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
        >
          Your AI-Powered Dashboard
        </motion.h1>

        <motion.div>
          <Card className="bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Product-Market Fit Score</CardTitle>
            </CardHeader>
            <CardContent>
              {pmfScore !== null && <PMFScoreDisplay score={pmfScore} />}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div>
          <Card className="bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Historical PMF Score</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div>
          <Card className="bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">AI-Generated Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              {suggestions.length > 0 && <SuggestionsList suggestions={suggestions} />}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div>
          <Card className="bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Users, title: 'Total Users', value: '1,234' },
                  { icon: Activity, title: 'Active Users', value: '987' },
                  { icon: TrendingUp, title: 'Growth Rate', value: '8.5%' },
                ].map((metric, index) => (
                  <Card key={index} className="bg-gradient-to-br from-pink-100 to-blue-100">
                    <CardContent className="flex items-center p-4">
                      <metric.icon className="w-8 h-8 mr-4 text-pink-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="flex justify-center">
          <Button
            onClick={() => router.push('/data-entry')}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white"
          >
            Update Your Data
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
