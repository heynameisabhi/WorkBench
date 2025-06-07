-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  current_level INTEGER DEFAULT 1,
  current_phase INTEGER DEFAULT 1,
  total_points INTEGER DEFAULT 0,
  title TEXT DEFAULT 'Beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Levels table
CREATE TABLE public.levels (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_points INTEGER NOT NULL,
  badge_icon TEXT NOT NULL,
  color_theme TEXT NOT NULL,
  order_index INTEGER NOT NULL
);

-- Phases table
CREATE TABLE public.phases (
  id SERIAL PRIMARY KEY,
  level_id INTEGER REFERENCES levels(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  required_points INTEGER DEFAULT 0
);

-- Videos table
CREATE TABLE public.videos (
  id SERIAL PRIMARY KEY,
  phase_id INTEGER REFERENCES phases(id),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  duration INTEGER, -- in seconds
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quizzes table
CREATE TABLE public.quizzes (
  id SERIAL PRIMARY KEY,
  phase_id INTEGER REFERENCES phases(id),
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL,
  points_reward INTEGER DEFAULT 10,
  time_limit INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Puzzles table
CREATE TABLE public.puzzles (
  id SERIAL PRIMARY KEY,
  phase_id INTEGER REFERENCES phases(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  starter_code TEXT,
  solution TEXT NOT NULL,
  test_cases JSONB NOT NULL,
  points_reward INTEGER DEFAULT 20,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'easy',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id SERIAL PRIMARY KEY,
  phase_id INTEGER REFERENCES phases(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements JSONB NOT NULL,
  starter_files JSONB,
  points_reward INTEGER DEFAULT 50,
  is_major_project BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges table
CREATE TABLE public.badges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  level_id INTEGER REFERENCES levels(id),
  requirements JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE public.user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  level_id INTEGER REFERENCES levels(id),
  phase_id INTEGER REFERENCES phases(id),
  quiz_scores JSONB DEFAULT '{}',
  puzzle_completions JSONB DEFAULT '{}',
  project_submissions JSONB DEFAULT '{}',
  points_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges table
CREATE TABLE public.user_badges (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  badge_id INTEGER REFERENCES badges(id),
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Submissions table
CREATE TABLE public.submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  project_id INTEGER REFERENCES projects(id),
  code_files JSONB NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  feedback TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Points transactions table
CREATE TABLE public.points_transactions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  reference_type TEXT, -- 'quiz', 'puzzle', 'project'
  reference_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_transactions ENABLE ROW LEVEL SECURITY;

-- Users can only see and update their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- User progress policies
CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User badges policies
CREATE POLICY "Users can view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

-- Submissions policies
CREATE POLICY "Users can view own submissions" ON public.submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Points transactions policies
CREATE POLICY "Users can view own points" ON public.points_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Public read access for content tables
CREATE POLICY "Public read access" ON public.levels FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.phases FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.puzzles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.badges FOR SELECT USING (true);

-- Functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user points
CREATE OR REPLACE FUNCTION public.add_user_points(
  user_id UUID,
  points INTEGER,
  reason TEXT,
  ref_type TEXT DEFAULT NULL,
  ref_id INTEGER DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Add points transaction
  INSERT INTO public.points_transactions (user_id, points, reason, reference_type, reference_id)
  VALUES (user_id, points, reason, ref_type, ref_id);
  
  -- Update user total points
  UPDATE public.users 
  SET total_points = total_points + points,
      updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
