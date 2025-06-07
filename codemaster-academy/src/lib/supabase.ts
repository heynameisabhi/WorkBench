import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// For client-side operations
export const supabase = supabaseUrl.includes('placeholder') ? null : createClient(supabaseUrl, supabaseAnonKey)

// For browser client with SSR support
export function createSupabaseClient() {
  if (supabaseUrl.includes('placeholder')) {
    return null
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Database types
export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  current_level: number
  current_phase: number
  total_points: number
  title: string
  created_at: string
  updated_at: string
}

export interface Level {
  id: number
  name: string
  title: string
  description: string
  required_points: number
  badge_icon: string
  color_theme: string
  order_index: number
}

export interface Phase {
  id: number
  level_id: number
  name: string
  description: string
  order_index: number
  required_points: number
}

export interface Quiz {
  id: number
  phase_id: number
  title: string
  description: string
  questions: QuizQuestion[]
  points_reward: number
  time_limit?: number
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number
  explanation: string
}

export interface Puzzle {
  id: number
  phase_id: number
  title: string
  description: string
  starter_code: string
  solution: string
  test_cases: TestCase[]
  points_reward: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface TestCase {
  input: string
  expected_output: string
  description: string
}

export interface Project {
  id: number
  phase_id: number
  title: string
  description: string
  requirements: string[]
  starter_files?: any
  points_reward: number
  is_major_project: boolean
}

export interface UserProgress {
  id: number
  user_id: string
  level_id: number
  phase_id: number
  quiz_scores: any
  puzzle_completions: any
  project_submissions: any
  points_earned: number
  completed_at?: string
}

export interface Badge {
  id: number
  name: string
  description: string
  icon: string
  level_id?: number
  requirements: any
}

export interface UserBadge {
  id: number
  user_id: string
  badge_id: number
  earned_at: string
}

export interface Video {
  id: number
  phase_id: number
  title: string
  description: string
  url: string
  duration: number
  order_index: number
}

export interface Submission {
  id: number
  user_id: string
  project_id: number
  code_files: any
  description: string
  status: 'pending' | 'approved' | 'rejected'
  feedback?: string
  submitted_at: string
  reviewed_at?: string
}
