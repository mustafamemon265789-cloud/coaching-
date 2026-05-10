-- Sir Azan Coaching Center — Supabase Schema

-- Branches
CREATE TABLE branches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  map_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Courses
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  class_level TEXT NOT NULL,
  subjects TEXT,
  duration TEXT,
  fee_monthly DECIMAL(10,2),
  fee_admission DECIMAL(10,2),
  schedule TEXT,
  branch_id UUID REFERENCES branches(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admissions
CREATE TABLE admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  class_applying TEXT NOT NULL,
  branch_id UUID REFERENCES branches(id),
  course_id UUID REFERENCES courses(id),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  applied_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Announcements
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  branch_id UUID REFERENCES branches(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  achievement TEXT,
  class_level TEXT,
  quote TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Stats
CREATE TABLE stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  "order" INTEGER DEFAULT 0
);

-- Seed Data: Branches
INSERT INTO branches (name, address, city, phone, email) VALUES
  ('Main Campus', '123 Main Street', 'Lahore', '042-1111111', 'main@azancoaching.com'),
  ('City Branch', '456 City Road', 'Lahore', '042-2222222', 'city@azancoaching.com'),
  ('Town Branch', '789 Town Avenue', 'Lahore', '042-3333333', 'town@azancoaching.com');

-- Seed Data: Stats
INSERT INTO stats (label, value, icon, "order") VALUES
  ('Students Enrolled', '1200+', 'Users', 1),
  ('Success Rate', '98%', 'Award', 2),
  ('Branches', '3', 'Building2', 3),
  ('Years of Excellence', '10+', 'Calendar', 4);

-- Faculty
CREATE TABLE faculty (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  qualification TEXT NOT NULL,
  subject TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Data: Faculty
INSERT INTO faculty (name, qualification, subject, bio) VALUES
  ('Sir Azan', 'M.Sc. Mathematics, B.Ed', 'Mathematics', 'Founder and lead faculty with over 10 years of teaching experience. Specializes in making complex math concepts easy for students.'),
  ('Prof. Ahmed Ali', 'M.A. English, M.Phil', 'English', 'Expert in English literature and grammar. Known for his engaging teaching style that helps students excel in board exams.'),
  ('Dr. Sarah Khan', 'Ph.D. Physics', 'Physics', 'Doctorate in Physics with 8 years of teaching experience. Focuses on conceptual understanding and application-based learning.');

-- Seed Data: Site Settings
INSERT INTO site_settings (key, value) VALUES
  ('institute_name', 'Sir Azan Coaching Center'),
  ('tagline', 'Where Students Become Toppers'),
  ('hero_headline', 'Pakistan Ka Future Starts Here'),
  ('hero_subheadline', 'Join Sir Azan Coaching Center — Expert teachers, proven results'),
  ('primary_phone', '042-1111111'),
  ('secondary_phone', '042-2222222'),
  ('email', 'info@azancoaching.com'),
  ('address', '123 Main Street, Lahore, Pakistan'),
  ('whatsapp_number', '923001234567'),
  ('facebook_url', 'https://facebook.com/azancoaching'),
  ('twitter_url', 'https://twitter.com/azancoaching'),
  ('instagram_url', 'https://instagram.com/azancoaching'),
  ('youtube_url', 'https://youtube.com/@azancoaching'),
  ('stat_students', '1200+'),
  ('stat_success_rate', '98%'),
  ('stat_branches', '3'),
  ('stat_years', '10+');

-- Seed Data: Testimonials
INSERT INTO testimonials (student_name, achievement, class_level, quote) VALUES
  ('Ahmed Khan', 'Got 95% in Board Exams', 'Class 10', 'Sir Azan Coaching Center changed my life. The teachers are incredibly supportive and the study material is top-notch.'),
  ('Fatima Ali', 'Scored 1080/1100', 'Intermediate', 'The regular test system and personalized attention helped me achieve my dream score. Highly recommended!'),
  ('Usman Raza', 'Topper in City', 'Class 12', 'The small batch sizes mean every student gets individual attention. That made all the difference for me.');
