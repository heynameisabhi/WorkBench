'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase, User } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  supabaseUser: SupabaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if Supabase is configured
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setSupabaseUser(session.user)
        await fetchUserProfile(session.user.id)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setSupabaseUser(session.user)
          await fetchUserProfile(session.user.id)
        } else {
          setSupabaseUser(null)
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    if (!supabase) return

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setUser(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      // Demo mode - create a mock user for sign in
      const mockUser: User = {
        id: 'demo-user-signin',
        email,
        full_name: 'Demo User',
        current_level: 2,
        current_phase: 3,
        total_points: 1250,
        title: 'Water Master',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setUser(mockUser)
      setSupabaseUser({
        id: mockUser.id,
        email: mockUser.email,
        user_metadata: { full_name: 'Demo User' }
      } as any)

      return { data: { user: mockUser }, error: null }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase) {
      // Demo mode - create a mock user
      const mockUser: User = {
        id: 'demo-user-' + Date.now(),
        email,
        full_name: fullName,
        current_level: 1,
        current_phase: 1,
        total_points: 0,
        title: 'Beginner',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setUser(mockUser)
      setSupabaseUser({
        id: mockUser.id,
        email: mockUser.email,
        user_metadata: { full_name: fullName }
      } as any)

      return { data: { user: mockUser }, error: null }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
  }

  const signOut = async () => {
    if (!supabase) return

    await supabase.auth.signOut()
    setUser(null)
    setSupabaseUser(null)
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user || !supabase) return

    try {
      const { error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)

      if (error) throw error

      setUser({ ...user, ...updates })
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const value = {
    user,
    supabaseUser,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
