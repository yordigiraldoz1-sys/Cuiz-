-- Performance indexes
CREATE INDEX idx_topics_subject_id ON public.topics(subject_id);
CREATE INDEX idx_lessons_topic_id ON public.lessons(topic_id);
CREATE INDEX idx_exercises_lesson_id ON public.exercises(lesson_id);

CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON public.user_progress(lesson_id);
CREATE INDEX idx_user_progress_status ON public.user_progress(status);

CREATE INDEX idx_exercise_attempts_user_id ON public.exercise_attempts(user_id);
CREATE INDEX idx_exercise_attempts_exercise_id ON public.exercise_attempts(exercise_id);
CREATE INDEX idx_exercise_attempts_date ON public.exercise_attempts(attempt_date);

CREATE INDEX idx_sr_cards_user_id ON public.spaced_repetition_cards(user_id);
CREATE INDEX idx_sr_cards_next_review ON public.spaced_repetition_cards(next_review_date);
CREATE INDEX idx_sr_cards_user_review ON public.spaced_repetition_cards(user_id, next_review_date);

CREATE INDEX idx_user_achievements_user_id ON public.user_achievements(user_id);

CREATE INDEX idx_exam_attempts_user_id ON public.mock_exam_attempts(user_id);
CREATE INDEX idx_exam_attempts_exam_id ON public.mock_exam_attempts(exam_id);

CREATE INDEX idx_daily_activity_user_id ON public.daily_activity(user_id);
CREATE INDEX idx_daily_activity_date ON public.daily_activity(activity_date);
CREATE INDEX idx_daily_activity_user_date ON public.daily_activity(user_id, activity_date);

CREATE INDEX idx_leaderboard_period ON public.leaderboard_entries(period_type, period_start);
CREATE INDEX idx_leaderboard_rank ON public.leaderboard_entries(period_type, period_start, rank_position);
