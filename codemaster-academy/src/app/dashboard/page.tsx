'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProgressStore } from '@/store/progressStore'
import LoadingSpinner from '@/components/LoadingSpinner'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ProgressOverview from '@/components/dashboard/ProgressOverview'
import LevelCards from '@/components/dashboard/LevelCards'
import RecentActivity from '@/components/dashboard/RecentActivity'
import BadgeShowcase from '@/components/dashboard/BadgeShowcase'

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  const {
    levels,
    userProgress,
    userBadges,
    totalPoints,
    loading: progressLoading,
    fetchLevels,
    fetchPhases,
    fetchUserProgress,
    fetchUserBadges,
    fetchBadges
  } = useProgressStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user && mounted) {
      // Initialize data
      const initializeData = async () => {
        await Promise.all([
          fetchLevels(),
          fetchPhases(),
          fetchUserProgress(user.id),
          fetchUserBadges(user.id)
          // fetchBadges() - Disabled until badges table is created
        ])
      }
      
      initializeData()
    }
  }, [user, mounted, fetchLevels, fetchPhases, fetchUserProgress, fetchUserBadges])

  if (authLoading || !mounted) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.full_name}! 👋
          </h1>
          <p className="text-gray-600">
            Continue your journey to become a coding master. You're currently a{' '}
            <span className="font-semibold text-blue-600">{user.title}</span>
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <ProgressOverview
            user={user}
            levels={levels}
            userProgress={userProgress}
            totalPoints={user.total_points || 0}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Levels */}
          <div className="lg:col-span-2">
            <LevelCards 
              levels={levels}
              userProgress={userProgress}
              currentLevel={user.current_level}
              currentPhase={user.current_phase}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Badge Showcase */}
            <BadgeShowcase userBadges={userBadges} />
            
            {/* Recent Activity */}
            <RecentActivity userProgress={userProgress} />
          </div>
        </div>
      </main>
    </div>
  )
}
