'use client'

import { motion } from 'framer-motion'
import { Award, Plus } from 'lucide-react'
import { UserBadge } from '@/lib/supabase'

interface BadgeShowcaseProps {
  userBadges: UserBadge[]
}

export default function BadgeShowcase({ userBadges }: BadgeShowcaseProps) {
  // Use real user badges data
  const safeUserBadges = userBadges || []
  const earnedBadges = safeUserBadges

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Badges</h3>
        <Award className="w-5 h-5 text-yellow-500" />
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 ? (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Earned ({earnedBadges.length})</h4>
          <div className="grid grid-cols-2 gap-3">
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 text-center group hover:shadow-md transition-all duration-300"
              >
                <div className="text-2xl mb-1">{badge.badge?.icon || '🏆'}</div>
                <div className="text-xs font-medium text-gray-900 mb-1">{badge.badge?.name || 'Badge'}</div>
                <div className="text-xs text-gray-600 leading-tight">{badge.badge?.description || 'Achievement unlocked'}</div>

                {/* Earned indicator */}
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Earned
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">No badges earned yet</h4>
            <p className="text-xs text-gray-600">Complete quizzes and projects to earn your first badge!</p>
          </div>
        </div>
      )}

      {/* Badge Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Earned:</span>
          <span className="font-semibold text-gray-900">{earnedBadges.length}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Available:</span>
          <span className="font-semibold text-gray-900">Coming Soon</span>
        </div>
      </div>
    </div>
  )
}
