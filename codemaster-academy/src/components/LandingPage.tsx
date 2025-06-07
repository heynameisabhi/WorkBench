'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Trophy, Users, Zap, Star, BookOpen, Target, Award } from 'lucide-react'
import AuthModal from './AuthModal'

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const levels = [
    {
      title: 'Water Master',
      subtitle: 'Frontend Development',
      icon: '💧',
      color: 'from-blue-400 to-blue-600',
      description: 'Master HTML5, CSS3, and JavaScript fundamentals',
      skills: ['HTML5 Semantics', 'CSS Grid & Flexbox', 'JavaScript ES6+', 'React Components']
    },
    {
      title: 'Fire Master',
      subtitle: 'Backend Development',
      icon: '🔥',
      color: 'from-red-400 to-red-600',
      description: 'Build powerful server-side applications',
      skills: ['Node.js & Express', 'Database Design', 'API Development', 'Authentication']
    },
    {
      title: 'Air Master',
      subtitle: 'Full-Stack Integration',
      icon: '💨',
      color: 'from-green-400 to-green-600',
      description: 'Combine frontend and backend mastery',
      skills: ['Cloud Deployment', 'CI/CD Pipelines', 'Full-Stack Projects', 'DevOps Basics']
    },
    {
      title: 'Earth Master',
      subtitle: 'Advanced Mastery',
      icon: '🌍',
      color: 'from-amber-400 to-amber-600',
      description: 'Achieve ultimate coding mastery',
      skills: ['System Design', 'Performance Optimization', 'Team Leadership', 'Innovation']
    }
  ]

  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Gamified Learning',
      description: 'Earn points, badges, and unlock new levels as you progress through your coding journey.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Structured Path',
      description: 'Follow a carefully designed curriculum from beginner to advanced developer.'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Hands-on Practice',
      description: 'Learn by doing with interactive quizzes, coding puzzles, and real projects.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Join a community of learners and get help when you need it.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SMVITM
              </span>
              <br />
              WorkBench
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Learn coding effectively through gamification. Progress through levels, earn badges, 
              and become a coding master with our structured learning path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openAuth('signup')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openAuth('signin')}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SMVITM-WorkBench?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our unique approach combines effective learning with engaging gamification
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Levels Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Master Four Levels of Coding</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Progress through our carefully designed levels to become a complete developer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{level.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{level.title}</h3>
                    <p className="text-gray-300">{level.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{level.description}</p>
                <div className="flex flex-wrap gap-2">
                  {level.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Master Coding?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students who are already mastering coding through our gamified platform
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openAuth('signup')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Start Learning Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  )
}
