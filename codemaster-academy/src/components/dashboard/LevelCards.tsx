'use client'

import { motion } from 'framer-motion'
import { Lock, Play, CheckCircle, ArrowRight } from 'lucide-react'
import { Level, UserProgress } from '@/lib/supabase'
import { calculateLevelCompletion } from '@/store/progressStore'

interface LevelCardsProps {
  levels: Level[]
  userProgress: UserProgress[]
  currentLevel: number
  currentPhase: number
}

export default function LevelCards({ levels, userProgress, currentLevel, currentPhase }: LevelCardsProps) {
  // Ensure we have valid data
  const safeLevels = levels || []
  const safeUserProgress = userProgress || []
  const safeCurrentLevel = currentLevel || 1

  const getLevelStatus = (level: Level) => {
    if (level.id < safeCurrentLevel) return 'completed'
    if (level.id === safeCurrentLevel) return 'current'
    return 'locked'
  }

  const getLevelProgress = (level: Level) => {
    return calculateLevelCompletion(safeUserProgress, [], level.id)
  }

  const getStatusIcon = (status: string, progress: number) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'current':
        return <Play className="w-6 h-6 text-blue-500" />
      default:
        return <Lock className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50'
      case 'current':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getGradientColor = (colorTheme: string) => {
    switch (colorTheme) {
      case 'blue':
        return 'from-blue-400 to-blue-600'
      case 'red':
        return 'from-red-400 to-red-600'
      case 'green':
        return 'from-green-400 to-green-600'
      case 'brown':
        return 'from-amber-400 to-amber-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Learning Path</h2>
        <p className="text-gray-600">Master all levels to become a Space Master</p>
      </div>

      <div className="grid gap-6">
        {safeLevels.map((level, index) => {
          const status = getLevelStatus(level)
          const progress = getLevelProgress(level)
          const isAccessible = status === 'current' || status === 'completed'

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                getStatusColor(status)
              } ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              {/* Level Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getGradientColor(level.color_theme)} flex items-center justify-center text-2xl`}>
                      {level.badge_icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Level {level.order_index}: {level.title}
                      </h3>
                      <p className="text-gray-600">{level.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status, progress)}
                    {isAccessible && (
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{level.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`bg-gradient-to-r ${getGradientColor(level.color_theme)} h-2 rounded-full`}
                    />
                  </div>
                </div>

                {/* Points Required */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Required Points: {(level.required_points || 0).toLocaleString()}
                  </span>
                  {status === 'current' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 bg-gradient-to-r ${getGradientColor(level.color_theme)} text-white rounded-lg font-medium text-sm hover:shadow-md transition-all duration-300`}
                    >
                      Continue Learning
                    </motion.button>
                  )}
                  {status === 'completed' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Completed ✓
                    </span>
                  )}
                  {status === 'locked' && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      Locked 🔒
                    </span>
                  )}
                </div>
              </div>

              {/* Phases Preview (for current level) */}
              {status === 'current' && (
                <div className="border-t border-gray-200 p-4 bg-gray-50/50">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Current Phase:</h4>
                  <div className="text-sm text-gray-600">
                    Phase {currentPhase} - Continue your learning journey
                  </div>
                </div>
              )}

              {/* Completion Badge */}
              {status === 'completed' && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              {/* Lock Overlay */}
              {status === 'locked' && (
                <div className="absolute inset-0 bg-gray-100/80 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Complete previous level to unlock</p>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Space Master Final Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: safeLevels.length * 0.1 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            🚀
          </div>
          <div>
            <h3 className="text-xl font-bold">Space Master</h3>
            <p className="text-purple-100">Ultimate Achievement</p>
          </div>
        </div>
        <p className="text-purple-100 mb-4">
          Complete all levels and submit a major project to earn the prestigious Space Master title!
        </p>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm">
            🎯 Complete all 4 levels<br />
            📝 Submit a major capstone project<br />
            🏆 Demonstrate mastery across all technologies
          </p>
        </div>
      </motion.div>
    </div>
  )
}
