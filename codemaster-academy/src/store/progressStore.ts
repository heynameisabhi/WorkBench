import { create } from 'zustand'
import { supabase, Level, Phase, UserProgress, Badge, UserBadge } from '@/lib/supabase'

interface ProgressState {
  levels: Level[]
  phases: Phase[]
  userProgress: UserProgress[]
  userBadges: UserBadge[]
  badges: Badge[]
  currentLevel: number
  currentPhase: number
  totalPoints: number
  loading: boolean
  
  // Actions
  fetchLevels: () => Promise<void>
  fetchPhases: () => Promise<void>
  fetchUserProgress: (userId: string) => Promise<void>
  fetchUserBadges: (userId: string) => Promise<void>
  fetchBadges: () => Promise<void>
  updateProgress: (userId: string, levelId: number, phaseId: number, points: number) => Promise<void>
  awardBadge: (userId: string, badgeId: number) => Promise<void>
  addPoints: (userId: string, points: number, reason: string, refType?: string, refId?: number) => Promise<void>
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  levels: [],
  phases: [],
  userProgress: [],
  userBadges: [],
  badges: [],
  currentLevel: 1,
  currentPhase: 1,
  totalPoints: 0,
  loading: false,

  fetchLevels: async () => {
    try {
      set({ loading: true })
      const { data, error } = await supabase
        .from('levels')
        .select('*')
        .order('order_index')

      if (error) throw error
      set({ levels: data || [] })
    } catch (error) {
      console.error('Error fetching levels:', error)
    } finally {
      set({ loading: false })
    }
  },

  fetchPhases: async () => {
    try {
      const { data, error } = await supabase
        .from('phases')
        .select('*')
        .order('level_id, order_index')

      if (error) throw error
      set({ phases: data || [] })
    } catch (error) {
      console.error('Error fetching phases:', error)
    }
  },

  fetchUserProgress: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error
      set({ userProgress: data || [] })
    } catch (error) {
      console.error('Error fetching user progress:', error)
    }
  },

  fetchUserBadges: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          *,
          badge:badges(*)
        `)
        .eq('user_id', userId)

      if (error) throw error
      set({ userBadges: data || [] })
    } catch (error) {
      console.error('Error fetching user badges:', error)
    }
  },

  fetchBadges: async () => {
    try {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('level_id, id')

      if (error) throw error
      set({ badges: data || [] })
    } catch (error) {
      console.error('Error fetching badges:', error)
    }
  },

  updateProgress: async (userId: string, levelId: number, phaseId: number, points: number) => {
    try {
      // Check if progress record exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('level_id', levelId)
        .eq('phase_id', phaseId)
        .single()

      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('user_progress')
          .update({
            points_earned: existingProgress.points_earned + points,
          })
          .eq('id', existingProgress.id)

        if (error) throw error
      } else {
        // Create new progress record
        const { error } = await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            level_id: levelId,
            phase_id: phaseId,
            points_earned: points,
          })

        if (error) throw error
      }

      // Refresh user progress
      await get().fetchUserProgress(userId)
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  },

  awardBadge: async (userId: string, badgeId: number) => {
    try {
      // Check if user already has this badge
      const { data: existingBadge } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', userId)
        .eq('badge_id', badgeId)
        .single()

      if (!existingBadge) {
        const { error } = await supabase
          .from('user_badges')
          .insert({
            user_id: userId,
            badge_id: badgeId,
          })

        if (error) throw error

        // Refresh user badges
        await get().fetchUserBadges(userId)
      }
    } catch (error) {
      console.error('Error awarding badge:', error)
    }
  },

  addPoints: async (userId: string, points: number, reason: string, refType?: string, refId?: number) => {
    try {
      // Call the database function to add points
      const { error } = await supabase.rpc('add_user_points', {
        user_id: userId,
        points: points,
        reason: reason,
        ref_type: refType,
        ref_id: refId,
      })

      if (error) throw error

      // Update local state
      set(state => ({
        totalPoints: state.totalPoints + points
      }))
    } catch (error) {
      console.error('Error adding points:', error)
    }
  },
}))

// Helper functions for checking progress
export const getPhaseProgress = (userProgress: UserProgress[], levelId: number, phaseId: number) => {
  return userProgress.find(p => p.level_id === levelId && p.phase_id === phaseId)
}

export const getLevelProgress = (userProgress: UserProgress[], levelId: number) => {
  return userProgress.filter(p => p.level_id === levelId)
}

export const calculateLevelCompletion = (userProgress: UserProgress[], phases: Phase[], levelId: number) => {
  const levelPhases = phases.filter(p => p.level_id === levelId)
  const completedPhases = userProgress.filter(p => p.level_id === levelId && p.completed_at)
  
  return levelPhases.length > 0 ? (completedPhases.length / levelPhases.length) * 100 : 0
}

export const checkBadgeEligibility = (userProgress: UserProgress[], userBadges: UserBadge[], badge: Badge) => {
  // Check if user already has this badge
  if (userBadges.some(ub => ub.badge_id === badge.id)) {
    return false
  }

  const requirements = badge.requirements as any
  
  // Example badge requirement checking logic
  if (requirements.quizzes_completed) {
    const quizCount = userProgress.reduce((count, progress) => {
      const quizScores = progress.quiz_scores as any
      return count + (quizScores ? Object.keys(quizScores).length : 0)
    }, 0)
    
    if (quizCount < requirements.quizzes_completed) return false
  }

  if (requirements.puzzles_solved) {
    const puzzleCount = userProgress.reduce((count, progress) => {
      const puzzleCompletions = progress.puzzle_completions as any
      return count + (puzzleCompletions ? Object.keys(puzzleCompletions).length : 0)
    }, 0)
    
    if (puzzleCount < requirements.puzzles_solved) return false
  }

  if (requirements.projects_completed) {
    const projectCount = userProgress.reduce((count, progress) => {
      const projectSubmissions = progress.project_submissions as any
      return count + (projectSubmissions ? Object.keys(projectSubmissions).length : 0)
    }, 0)
    
    if (projectCount < requirements.projects_completed) return false
  }

  return true
}
