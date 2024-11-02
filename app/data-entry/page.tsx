'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataEntryForm } from '@/components/DataEntryForm'
import { FileUpload } from '@/components/FileUpload'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, PenTool, Rocket, Zap, Target, TrendingUp } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function DataEntryPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('manual')
  const [showConfetti, setShowConfetti] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const handleDataSubmit = () => {
    setShowConfetti(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    setTimeout(() => setShowConfetti(false), 3000)
    // Navigation to signup page is now handled in the components
  }

  const benefits = [
    { icon: Rocket, text: "Get your PMF score instantly" },
    { icon: Zap, text: "AI-powered insights" },
    { icon: Target, text: "Tailored growth strategies" },
    { icon: TrendingUp, text: "Track your progress over time" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          onClick={() => router.push('/login')}
          className="bg-white/80 backdrop-blur-xl border-0 shadow-md hover:bg-white/90"
        >
          Login
        </Button>
      </div>
      <motion.div
        className="w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Unlock Your Startup's Potential
        </motion.h1>
        <Card className="bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-0 shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Let's Supercharge Your Growth!</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div className="grid grid-cols-2 gap-4 mb-6" variants={itemVariants}>
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-blue-100 p-3 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <benefit.icon className="w-6 h-6 text-pink-500" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
            <Tabs defaultValue="manual" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="manual" className="flex items-center justify-center">
                  <PenTool className="w-4 h-4 mr-2" />
                  Manual Entry
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center justify-center">
                  <Upload className="w-4 h-4 mr-2" />
                  File Upload
                </TabsTrigger>
              </TabsList>
              <TabsContent value="manual">
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate={activeTab === 'manual' ? 'visible' : 'hidden'}
                >
                  <DataEntryForm onSubmit={handleDataSubmit} />
                </motion.div>
              </TabsContent>
              <TabsContent value="upload">
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate={activeTab === 'upload' ? 'visible' : 'hidden'}
                >
                  <FileUpload onUploadComplete={handleDataSubmit} />
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-0 shadow-md hover:bg-white/90"
          >
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="text-4xl font-bold text-pink-500"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                Great job! 🎉
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-blue-200 opacity-30"></div>
        <div className="absolute inset-0 blur-3xl">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1/3 h-1/3 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </div>
  )
}
