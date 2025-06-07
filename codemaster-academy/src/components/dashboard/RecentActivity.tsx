'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle, Code, BookOpen, Trophy } from 'lucide-react'
import { UserProgress } from '@/lib/supabase'

interface RecentActivityProps {
  userProgress: UserProgress[]
}

export default function RecentActivity({ userProgress }: RecentActivityProps) {
  // Use real user progress data - for now it will be empty
  const safeUserProgress = userProgress || []

  // Convert user progress to activity format (when we have real data)
  const recentActivities = safeUserProgress.slice(0, 5).map((progress, index) => ({
    id: progress.id,
    type: 'progress',
    title: `Level ${progress.level_id} Progress`,
    description: `Earned ${progress.points_earned} points`,
    points: progress.points_earned,
    timestamp: progress.completed_at ? new Date(progress.completed_at).toLocaleDateString() : 'In progress',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  }))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      {recentActivities.length > 0 ? (
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Icon */}
              <div className={`${activity.bgColor} ${activity.color} p-2 rounded-lg flex-shrink-0`}>
                {activity.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </h4>
                  {activity.points > 0 && (
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      +{activity.points} pts
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>

              {/* Completion indicator */}
              {activity.type !== 'project' && (
                <div className="flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">No recent activity</h4>
          <p className="text-xs text-gray-600">Start learning to see your progress here!</p>
        </div>
      )}

      {/* Activity Summary */}
      {recentActivities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">{recentActivities.length}</div>
              <div className="text-xs text-gray-600">Recent Activities</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {recentActivities.reduce((sum, activity) => sum + (activity.points || 0), 0)}
              </div>
              <div className="text-xs text-gray-600">Points Earned</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
