'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { LogOut, Settings, Menu, Home, BarChart2, Users, Activity, TrendingUp, Map, UserCheck } from 'lucide-react'
import { PMFScoreDisplay } from '@/components/PMFScoreDisplay'
import { SuggestionsList } from '@/components/SuggestionsList'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import '@mdi/font/css/materialdesignicons.css'
import Image from 'next/image'

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BarChart2, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Map, label: 'Roadmap', href: '/roadmap' },
  { icon: UserCheck, label: 'Persona & Problem', href: '/persona-problem' },
]

function BatmanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 8l3.5 2 2-3L12 3l3.5 4 2 3L21 8c-.7 3.8-2.5 7.2-5 9.5-1.5 1.4-3.3 2.5-5.3 3.2-.4.1-.7.2-1.1.3H14c-2.6-.4-5-1.5-7-3.2C4.5 15.2 2.7 11.8 2 8l1 .1zM12 6l-1.75 2 1.75 3 1.75-3L12 6z" />
    </svg>
  )
}

function FuturisticSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    console.log('Logging out...')
    router.push('/login')
  }

  const handleSettings = () => {
    router.push('/settings')
  }

  return (
    <motion.div
      className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50"
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <motion.div
        className="flex flex-row items-center bg-gradient-to-r from-pink-500 to-blue-500 rounded-b-full overflow-hidden"
        variants={{
          collapsed: { width: '3rem' },
          expanded: { width: 'auto' }
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white/20"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-row space-x-2 pl-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full text-white hover:bg-white/20"
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="h-6 w-6" />
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-0 shadow-lg hover:bg-white/90"
              onClick={handleSettings}
            >
              <Settings className="h-6 w-6 text-pink-500" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-0 shadow-lg hover:bg-white/90"
              onClick={handleLogout}
            >
              <LogOut className="h-6 w-6 text-pink-500" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function DashboardPage() {
  const [pmfScore, setPmfScore] = useState<number | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [historicalScores, setHistoricalScores] = useState<{ date: string; score: number }[]>([])
  const [isBatCaveMode, setIsBatCaveMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setPmfScore(75)
    setSuggestions([
      "Focus on enhancing user onboarding experience.",
      "Implement a referral program to boost user acquisition.",
      "Expand to new markets by localizing content.",
    ])
    setHistoricalScores([
      { date: '2023-06', score: 60 },
      { date: '2023-07', score: 65 },
      { date: '2023-08', score: 68 },
      { date: '2023-09', score: 70 },
      { date: '2023-10', score: 75 },
    ])
  }, [router])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className={`flex flex-col h-screen ${isBatCaveMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-50 to-blue-50'} overflow-hidden transition-colors duration-300`}>
      <FuturisticSidebar />
      <div className="flex-1 p-2 sm:p-4 overflow-hidden ml-12">
        <div className="flex justify-end mb-2 sm:mb-4">
          <div className="flex items-center space-x-2">
            <span className={`text-xs sm:text-sm font-medium ${isBatCaveMode ? 'text-gray-300' : 'text-gray-700'}`}>Bat Cave Mode</span>
            <Switch
              checked={isBatCaveMode}
              onCheckedChange={setIsBatCaveMode}
              className="data-[state=checked]:bg-yellow-400"
            />
            <i className={`mdi mdi-bat ${isBatCaveMode ? 'text-yellow-400' : 'text-gray-400'} text-lg sm:text-2xl`}></i>
          </div>
        </div>
        <motion.div
          className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr h-[calc(100vh-5rem)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-3 row-span-1">
            <Card className={`h-full ${isBatCaveMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-80 border-0 shadow-lg transition-colors duration-300`}>
              <CardHeader className="p-2 sm:p-4">
                <CardTitle className={`text-lg sm:text-xl font-bold ${isBatCaveMode ? 'text-gray-100' : 'bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent'}`}>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 h-full">
                  {[
                    { icon: Users, title: 'Total Users', value: '1,234' },
                    { icon: Activity, title: 'Active Users', value: '987' },
                    { icon: TrendingUp, title: 'Growth Rate', value: '8.5%' },
                  ].map((metric, index) => (
                    <Card key={index} className={`${isBatCaveMode ? 'bg-gray-700' : 'bg-gradient-to-br from-pink-100 to-blue-100'} hover:from-pink-200 hover:to-blue-200 transition-colors duration-300 backdrop-blur-md bg-opacity-80`}>
                      <CardContent className="flex items-center justify-between p-2 sm:p-4">
                        <div>
                          <p className={`text-xs sm:text-sm font-semibold ${isBatCaveMode ? 'text-gray-300' : 'text-gray-700'}`}>{metric.title}</p>
                          <p className={`text-sm sm:text-lg font-bold mt-1 ${isBatCaveMode ? 'text-gray-100' : 'text-gray-900'}`}>{metric.value}</p>
                        </div>
                        <metric.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${isBatCaveMode ? 'text-yellow-400' : 'text-pink-500'} opacity-80`} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-1 row-span-1">
            <Card className={`h-full ${isBatCaveMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-80 border-0 shadow-lg transition-colors duration-300`}>
              <CardHeader className="p-2 sm:p-4">
                <CardTitle className={`text-lg sm:text-xl font-bold ${isBatCaveMode ? 'text-gray-100' : 'bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent'}`}>PMF Score</CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 flex items-center justify-center h-[calc(100%-3rem)]">
                {pmfScore !== null && <PMFScoreDisplay score={pmfScore} />}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-3 row-span-2">
            <Card className={`h-full ${isBatCaveMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-80 border-0 shadow-lg transition-colors duration-300`}>
              <CardHeader className="p-2 sm:p-4">
                <CardTitle className={`text-lg sm:text-xl font-bold ${isBatCaveMode ? 'text-gray-100' : 'bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent'}`}>Historical PMF Score</CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 h-[calc(100%-3rem)]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalScores}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isBatCaveMode ? "#4a5568" : "#e0e0e0"} />
                    <XAxis dataKey="date" tick={{ fill: isBatCaveMode ? '#a0aec0' : '#4a5568', fontSize: 12 }} />
                    <YAxis tick={{ fill: isBatCaveMode ? '#a0aec0' : '#4a5568', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: isBatCaveMode ? '#2d3748' : 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="score" stroke={isBatCaveMode ? "#fbbf24" : "url(#colorGradient)"} strokeWidth={2} dot={{ fill: isBatCaveMode ? '#fbbf24' : '#8884d8', strokeWidth: 2 }} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-1 row-span-2">
            <Card className={`h-full ${isBatCaveMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-80 border-0 shadow-lg overflow-hidden transition-colors duration-300`}>
              <CardHeader className="p-2 sm:p-4">
                <CardTitle className={`text-lg sm:text-xl font-bold ${isBatCaveMode ? 'text-gray-100' : 'bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent'}`}>AI Strategies</CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 h-[calc(100%-3rem)] overflow-auto">
                {suggestions.length > 0 && <SuggestionsList suggestions={suggestions} />}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-1 row-span-1">
            <Card className={`h-full ${isBatCaveMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl border-0 shadow-lg transition-colors duration-300`}>
              <CardHeader className="p-2 sm:p-4">
                <CardTitle className={`text-lg sm:text-xl font-bold ${isBatCaveMode ? 'text-gray-100' : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500'}`}>
                  Join our Slack Community
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 flex flex-col items-center justify-center">
                <div className="flex -space-x-2">
                  {Array(5).fill('').map((_, index) => (
                    <Image
                      key={index}
                      src={`/images/avatar${index + 1}.jpg`}
                      alt={`Founder ${index + 1}`}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <Button
                  onClick={() => window.open('https://join.slack.com/your-slack-channel', '_blank')}
                  className="mt-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                >
                  Join Slack Channel
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
