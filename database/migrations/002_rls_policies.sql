-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaced_repetition_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles, update only their own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Content tables: Read-only for authenticated users
CREATE POLICY "Content is viewable by authenticated users" ON public.subjects
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Content is viewable by authenticated users" ON public.topics
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Content is viewable by authenticated users" ON public.lessons
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Content is viewable by authenticated users" ON public.exercises
  FOR SELECT USING (auth.role() = 'authenticated');

-- User-specific tables: Users can only access their own data
CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own attempts" ON public.exercise_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON public.exercise_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own SR cards" ON public.spaced_repetition_cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own SR cards" ON public.spaced_repetition_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own SR cards" ON public.spaced_repetition_cards
  FOR UPDATE USING (auth.uid() = user_id);

-- Achievements: Read-only for all, user_achievements user-specific
CREATE POLICY "Achievements are viewable by authenticated users" ON public.achievements
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mock exams: Read-only, attempts user-specific
CREATE POLICY "Mock exams are viewable by authenticated users" ON public.mock_exams
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view own exam attempts" ON public.mock_exam_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam attempts" ON public.mock_exam_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exam attempts" ON public.mock_exam_attempts
  FOR UPDATE USING (auth.uid() = user_id);

-- Daily activity: User-specific
CREATE POLICY "Users can view own daily activity" ON public.daily_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily activity" ON public.daily_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily activity" ON public.daily_activity
  FOR UPDATE USING (auth.uid() = user_id);

-- Leaderboard: Read-only for all authenticated users
CREATE POLICY "Leaderboard is viewable by authenticated users" ON public.leaderboard_entries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert own leaderboard entries" ON public.leaderboard_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own leaderboard entries" ON public.leaderboard_entries
  FOR UPDATE USING (auth.uid() = user_id);
