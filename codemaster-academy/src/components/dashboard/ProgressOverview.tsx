'use client'

import { motion } from 'framer-motion'
import { Trophy, Target, Zap, Star } from 'lucide-react'
import { User, Level, UserProgress } from '@/lib/supabase'
import { calculateLevelCompletion } from '@/store/progressStore'

interface ProgressOverviewProps {
  user: User
  levels: Level[]
  userProgress: UserProgress[]
  totalPoints: number
}

export default function ProgressOverview({ user, levels, userProgress, totalPoints }: ProgressOverviewProps) {
  // Ensure we have valid data before processing
  const safeUser = user || { current_level: 1, current_phase: 1 }
  const safeLevels = levels || []
  const safeUserProgress = userProgress || []
  const safeTotalPoints = totalPoints || 0

  const currentLevel = safeLevels.find(l => l.id === safeUser.current_level)
  const nextLevel = safeLevels.find(l => l.id === safeUser.current_level + 1)

  const currentLevelProgress = currentLevel
    ? calculateLevelCompletion(safeUserProgress, [], safeUser.current_level)
    : 0

  const pointsToNextLevel = nextLevel && nextLevel.required_points
    ? nextLevel.required_points - safeTotalPoints
    : 0
  const progressToNextLevel = nextLevel && nextLevel.required_points
    ? Math.min((safeTotalPoints / nextLevel.required_points) * 100, 100)
    : 100

  const stats = [
    {
      label: 'Total Points',
      value: safeTotalPoints.toLocaleString(),
      icon: <Star className="w-5 h-5" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Current Level',
      value: currentLevel?.title || 'Beginner',
      icon: <Trophy className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Level Progress',
      value: `${Math.round(currentLevelProgress)}%`,
      icon: <Target className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Streak',
      value: '0 days', // Real streak calculation would go here
      icon: <Zap className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Progress</h2>
        <p className="text-gray-600">Track your journey to becoming a code master</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-lg p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Level Progress Bar */}
      {nextLevel && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress to {nextLevel.title}
            </span>
            <span className="text-sm text-gray-500">
              {pointsToNextLevel > 0 ? `${pointsToNextLevel} points to go` : 'Level Complete!'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Current Level Info */}
      {currentLevel && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">
              {currentLevel.badge_icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {currentLevel.title}
              </h3>
              <p className="text-sm text-gray-600">
                {currentLevel.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
