-- Function to update user XP and level
CREATE OR REPLACE FUNCTION public.add_xp_to_user(
  p_user_id UUID,
  p_xp_amount INTEGER
)
RETURNS VOID AS $$
DECLARE
  v_current_xp INTEGER;
  v_current_level INTEGER;
  v_new_xp INTEGER;
  v_new_level INTEGER;
BEGIN
  SELECT total_xp, current_level INTO v_current_xp, v_current_level
  FROM public.profiles
  WHERE id = p_user_id
  FOR UPDATE;

  v_new_xp := v_current_xp + p_xp_amount;
  
  -- Level formula: level = floor(sqrt(xp / 100)) + 1
  v_new_level := FLOOR(SQRT(v_new_xp / 100.0)) + 1;

  UPDATE public.profiles
  SET total_xp = v_new_xp,
      current_level = v_new_level,
      updated_at = NOW()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update daily activity
CREATE OR REPLACE FUNCTION public.update_daily_activity(
  p_user_id UUID,
  p_xp_earned INTEGER DEFAULT 0,
  p_lessons_completed INTEGER DEFAULT 0,
  p_exercises_completed INTEGER DEFAULT 0,
  p_correct_answers INTEGER DEFAULT 0,
  p_total_answers INTEGER DEFAULT 0
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.daily_activity (
    user_id, activity_date, xp_earned, lessons_completed,
    exercises_completed, correct_answers, total_answers
  )
  VALUES (
    p_user_id, CURRENT_DATE, p_xp_earned, p_lessons_completed,
    p_exercises_completed, p_correct_answers, p_total_answers
  )
  ON CONFLICT (user_id, activity_date)
  DO UPDATE SET
    xp_earned = daily_activity.xp_earned + p_xp_earned,
    lessons_completed = daily_activity.lessons_completed + p_lessons_completed,
    exercises_completed = daily_activity.exercises_completed + p_exercises_completed,
    correct_answers = daily_activity.correct_answers + p_correct_answers,
    total_answers = daily_activity.total_answers + p_total_answers,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update streak
CREATE OR REPLACE FUNCTION public.update_user_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  v_last_active DATE;
  v_current_streak INTEGER;
  v_longest_streak INTEGER;
  v_days_diff INTEGER;
BEGIN
  SELECT last_active_date, current_streak, longest_streak
  INTO v_last_active, v_current_streak, v_longest_streak
  FROM public.profiles
  WHERE id = p_user_id
  FOR UPDATE;

  IF v_last_active IS NULL THEN
    v_current_streak := 1;
  ELSE
    v_days_diff := CURRENT_DATE - v_last_active;
    
    IF v_days_diff = 0 THEN
      NULL;
    ELSIF v_days_diff = 1 THEN
      v_current_streak := v_current_streak + 1;
    ELSE
      v_current_streak := 1;
    END IF;
  END IF;

  v_longest_streak := GREATEST(v_longest_streak, v_current_streak);

  UPDATE public.profiles
  SET current_streak = v_current_streak,
      longest_streak = v_longest_streak,
      last_active_date = CURRENT_DATE,
      updated_at = NOW()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION public.check_achievements(p_user_id UUID)
RETURNS TABLE(achievement_id UUID, achievement_name TEXT) AS $$
DECLARE
  v_user RECORD;
  v_achievement RECORD;
  v_metric_value INTEGER;
BEGIN
  SELECT * INTO v_user FROM public.profiles WHERE id = p_user_id;

  FOR v_achievement IN
    SELECT * FROM public.achievements WHERE is_active = TRUE
  LOOP
    IF EXISTS (
      SELECT 1 FROM public.user_achievements
      WHERE user_id = p_user_id AND achievement_id = v_achievement.id
    ) THEN
      CONTINUE;
    END IF;

    CASE v_achievement.requirement_type
      WHEN 'streak_days' THEN
        v_metric_value := v_user.current_streak;
      WHEN 'xp_total' THEN
        v_metric_value := v_user.total_xp;
      WHEN 'lessons_completed' THEN
        SELECT COUNT(*) INTO v_metric_value
        FROM public.user_progress
        WHERE user_id = p_user_id AND status = 'completed';
      WHEN 'exercises_completed' THEN
        SELECT COUNT(*) INTO v_metric_value
        FROM public.exercise_attempts
        WHERE user_id = p_user_id;
      WHEN 'perfect_lessons' THEN
        SELECT COUNT(*) INTO v_metric_value
        FROM public.user_progress
        WHERE user_id = p_user_id AND best_score = 100;
      ELSE
        v_metric_value := 0;
    END CASE;

    IF v_metric_value >= v_achievement.requirement_value THEN
      INSERT INTO public.user_achievements (user_id, achievement_id)
      VALUES (p_user_id, v_achievement.id)
      ON CONFLICT DO NOTHING;

      PERFORM public.add_xp_to_user(p_user_id, v_achievement.xp_reward);

      RETURN QUERY SELECT v_achievement.id, v_achievement.name;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
