'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { UserCircle, Target, PlusCircle } from 'lucide-react'

export default function PersonaProblemPage() {
  const [isBatCaveMode, setIsBatCaveMode] = useState(false)

  const personas = [
    {
      name: 'Tech-Savvy Entrepreneur',
      description: 'Young, ambitious startup founder looking for efficient tools to scale their business.',
      problems: [
        'Difficulty in managing multiple projects simultaneously',
        'Need for real-time collaboration with remote team members',
        'Struggle with data-driven decision making'
      ]
    },
    {
      name: 'Small Business Owner',
      description: 'Experienced local business owner seeking to modernize operations and expand online presence.',
      problems: [
        'Limited technical knowledge for digital transformation',
        'Time constraints in learning new technologies',
        'Budget limitations for expensive software solutions'
      ]
    }
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
    <div className={`min-h-screen ${isBatCaveMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-50 to-blue-50'} p-4 sm:p-6 md:p-8 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <h1 className={`text-2xl sm:text-3xl font-bold ${isBatCaveMode ? 'text-gray-100' : 'bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent'}`}>
            Persona & Problem Definition
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {personas.map((persona, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`h-full ${isBatCaveMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} transition-colors duration-300`}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <UserCircle className={`mr-2 h-6 w-6 ${isBatCaveMode ? 'text-yellow-400' : 'text-pink-500'}`} />
                    {persona.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`mb-4 text-sm sm:text-base ${isBatCaveMode ? 'text-gray-300' : 'text-gray-600'}`}>{persona.description}</p>
                  <h3 className={`font-semibold mb-2 flex items-center text-sm sm:text-base ${isBatCaveMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    <Target className="mr-2 h-5 w-5" /> Key Problems:
                  </h3>
                  <ul className={`list-disc pl-5 text-sm sm:text-base ${isBatCaveMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {persona.problems.map((problem, problemIndex) => (
                      <li key={problemIndex} className="mb-1">{problem}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 sm:mt-8 space-y-4">
          <Button
            onClick={() => console.log('Add new persona')}
            className={`w-full ${isBatCaveMode ? 'bg-yellow-400 text-gray-900' : 'bg-gradient-to-r from-pink-500 to-blue-500 text-white'}`}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Persona
          </Button>
          <Button
            onClick={() => console.log('Add new problem')}
            className={`w-full ${isBatCaveMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Problem
          </Button>
        </motion.div>
      </div>
    </div>
  )
}