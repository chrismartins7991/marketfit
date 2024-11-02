'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Milestone, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react'

export default function RoadmapPage() {
  const [isBatCaveMode, setIsBatCaveMode] = useState(false)
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  const roadmapItems = [
    { title: 'International Expansion', date: '2025 Q1', completed: false, description: 'Begin expansion into international markets.' },
    { title: 'Series A Funding', date: '2024 Q4', completed: false, description: 'Secure Series A funding to scale operations.' },
    { title: 'Feature Expansion', date: '2024 Q3', completed: false, description: 'Develop and release new features based on user feedback.' },
    { title: 'User Acquisition', date: '2024 Q2', completed: false, description: 'Implement marketing strategies to acquire the first 10,000 users.' },
    { title: 'Official Launch', date: '2024 Q1', completed: false, description: 'Launch the product officially to the public.' },
    { title: 'Beta Testing', date: '2023 Q4', completed: true, description: 'Conduct beta testing with a select group of users and gather feedback.' },
    { title: 'MVP Development', date: '2023 Q3', completed: true, description: 'Develop and launch the Minimum Viable Product.' },
    { title: 'Market Research', date: '2023 Q2', completed: true, description: 'Conduct comprehensive market analysis and identify target audience.' },
  ]

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
    <div className={`min-h-screen ${isBatCaveMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-50 to-blue-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <h1 className={`text-2xl sm:text-3xl font-bold ${isBatCaveMode ? 'text-gray-100' : 'bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent'}`}>
            Startup Roadmap
          </h1>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${isBatCaveMode ? 'text-gray-300' : 'text-gray-700'}`}>Bat Cave Mode</span>
            <Switch
              checked={isBatCaveMode}
              onCheckedChange={setIsBatCaveMode}
              className="data-[state=checked]:bg-yellow-400"
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {roadmapItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-8">
              <div className="flex items-stretch mb-8">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.completed ? (isBatCaveMode ? 'bg-yellow-400' : 'bg-green-500') : (isBatCaveMode ? 'bg-gray-700' : 'bg-gray-300')}`}>
                    {item.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    ) : (
                      <Circle className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className={`flex-grow w-0.5 ${isBatCaveMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                </div>
                <Card className={`flex-grow ${isBatCaveMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} transition-colors duration-300`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        {item.title}
                      </CardTitle>
                      <p className={`text-xs ${isBatCaveMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.date}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                      aria-label={expandedItem === index ? "Collapse details" : "Expand details"}
                    >
                      {expandedItem === index ? (
                        <ChevronUp className={`h-4 w-4 ${isBatCaveMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      ) : (
                        <ChevronDown className={`h-4 w-4 ${isBatCaveMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      )}
                    </Button>
                  </CardHeader>
                  {expandedItem === index && (
                    <CardContent>
                      <p className={`text-sm ${isBatCaveMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
          <Button
            onClick={() => console.log('Add new milestone')}
            className={`w-full ${isBatCaveMode ? 'bg-yellow-400 text-gray-900' : 'bg-gradient-to-r from-pink-500 to-blue-500 text-white'}`}
          >
            <Milestone className="mr-2 h-4 w-4" /> Add New Milestone
          </Button>
        </motion.div>
      </div>
    </div>
  )
}