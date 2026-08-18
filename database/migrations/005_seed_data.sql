-- Insert subjects
INSERT INTO public.subjects (name, description, color, display_order) VALUES
('Matemáticas', 'Álgebra, geometría, aritmética, probabilidad y estadística', '#3B82F6', 1),
('Comunicación', 'Comprensión lectora, gramática, vocabulario y redacción', '#10B981', 2),
('Historia del Perú y Mundo', 'Historia del Perú, historia universal, geografía', '#F59E0B', 3),
('Razonamiento', 'Razonamiento lógico, verbal y matemático', '#8B5CF6', 4),
('Ciencias Naturales', 'Física, química y biología', '#EF4444', 5);

-- Insert topics for Matemáticas
INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Aritmética', 'Operaciones básicas, fracciones, porcentajes', 1, 1
FROM public.subjects WHERE name = 'Matemáticas';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Álgebra', 'Ecuaciones, desigualdades, sistemas', 2, 2
FROM public.subjects WHERE name = 'Matemáticas';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Geometría', 'Figuras, áreas, perímetros, volúmenes', 3, 2
FROM public.subjects WHERE name = 'Matemáticas';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Probabilidad y Estadística', 'Análisis de datos, probabilidades', 4, 3
FROM public.subjects WHERE name = 'Matemáticas';

-- Insert topics for Comunicación
INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Comprensión Lectora', 'Interpretación de textos', 1, 1
FROM public.subjects WHERE name = 'Comunicación';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Gramática', 'Ortografía, sintaxis, semántica', 2, 2
FROM public.subjects WHERE name = 'Comunicación';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Redacción', 'Estructura de textos argumentativos', 3, 3
FROM public.subjects WHERE name = 'Comunicación';

-- Insert topics for Historia
INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Historia del Perú', 'Culturas preincaicas, Inca, Colonia, República', 1, 2
FROM public.subjects WHERE name = 'Historia del Perú y Mundo';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Historia Universal', 'Revolución Francesa, Guerras Mundiales', 2, 2
FROM public.subjects WHERE name = 'Historia del Perú y Mundo';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Geografía', 'Mapas, relieve, clima, población', 3, 1
FROM public.subjects WHERE name = 'Historia del Perú y Mundo';

-- Insert topics for Razonamiento
INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Razonamiento Lógico', 'Secuencias, patrones, deducción', 1, 2
FROM public.subjects WHERE name = 'Razonamiento';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Razonamiento Verbal', 'Analogías, clasificación, seriación', 2, 2
FROM public.subjects WHERE name = 'Razonamiento';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Razonamiento Matemático', 'Problemas de enunciado, cálculo rápido', 3, 3
FROM public.subjects WHERE name = 'Razonamiento';

-- Insert topics for Ciencias Naturales
INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Física', 'Mecánica, termodinámica, electricidad', 1, 3
FROM public.subjects WHERE name = 'Ciencias Naturales';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Química', 'Elementos, reacciones, orgánica', 2, 3
FROM public.subjects WHERE name = 'Ciencias Naturales';

INSERT INTO public.topics (subject_id, name, description, display_order, difficulty_level)
SELECT id, 'Biología', 'Célula, genética, ecología', 3, 2
FROM public.subjects WHERE name = 'Ciencias Naturales';

-- Insert achievements
INSERT INTO public.achievements (name, description, icon_url, category, requirement_type, requirement_value, xp_reward) VALUES
('Primeros pasos', 'Mantén una racha de 3 días', '/icons/streak-3.png', 'streak', 'streak_days', 3, 100),
('Semana perfecta', 'Mantén una racha de 7 días', '/icons/streak-7.png', 'streak', 'streak_days', 7, 250),
('¡Imparable!', 'Mantén una racha de 30 días', '/icons/streak-30.png', 'streak', 'streak_days', 30, 1000),
('Aprendiz dedicado', 'Gana 1,000 XP en total', '/icons/xp-1000.png', 'xp', 'xp_total', 1000, 100),
('Maestro en formación', 'Gana 10,000 XP en total', '/icons/xp-10000.png', 'xp', 'xp_total', 10000, 500),
('Primer simulacro', 'Completa tu primer simulacro', '/icons/first-exam.png', 'exam', 'exams_passed', 1, 200),
('As del examen', 'Obtén más del 80% en 5 simulacros', '/icons/exam-ace.png', 'exam', 'exams_passed', 5, 1000);

-- Insert sample mock exam
INSERT INTO public.mock_exams (title, description, total_questions, time_limit_minutes, difficulty_level, subject_distribution) VALUES
('Simulacro General UNMSM', 'Simula el examen real de ingreso a San Marcos', 50, 120, 3, '{"matematicas": 10, "comunicacion": 10, "historia": 10, "razonamiento": 10, "ciencias": 10}'),
('Simulacro Rápido', 'Practica rápida de 20 minutos', 20, 20, 2, '{"matematicas": 4, "comunicacion": 4, "historia": 4, "razonamiento": 4, "ciencias": 4}');
