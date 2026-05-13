import { supabase, supabaseAdmin } from './supabase'

export interface Branch {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string | null
  map_link: string | null
}

export interface Course {
  id: string
  title: string
  description: string | null
  class_level: string
  subjects: string | null
  duration: string | null
  fee_monthly: number | null
  fee_admission: number | null
  schedule: string | null
  branch_id: string | null
  is_active: boolean
}

export interface LocalAdmission {
  id: string
  student_name: string
  father_name: string
  phone: string
  email: string | null
  class_applying: string
  branch_id?: string | null
  course_id?: string | null
  message?: string | null
  status: 'pending' | 'approved' | 'rejected'
  applied_at: string
  branch?: { name: string } | null
  course?: { title: string } | null
}

export interface FacultyMember {
  id: number
  supabaseId: string
  name: string
  qualification: string
  subject: string
  bio: string
  image_url: string
  active: boolean
}

export interface Testimonial {
  id: number
  supabaseId: string
  student_name: string
  achievement: string
  class_level: string
  quote: string
  rating: number
  visible: boolean
}

export interface StatItem {
  key: string
  label: string
  value: number
}

export interface Announcement {
  id: number
  supabaseId: string
  title: string
  content: string
  date: string
  active: boolean
}

export interface AdminCourse {
  id: number
  supabaseId: string
  title: string
  description: string
  class_level: string
  subjects: string
  duration: string
  fee_monthly: number
  fee_admission: number
  schedule: string
  branch: string
  active: boolean
}

export interface AdminBranch {
  id: number
  supabaseId: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  map_link: string
}

// ==================== BRANCHES ====================

export async function getBranches(): Promise<Branch[]> {
  const { data, error } = await supabase.from('branches').select('*')
  if (error && !error.message?.includes('not configured')) console.warn('Supabase branches:', error.message)
  if (!data || data.length === 0) {
    return [
      { id: 'mock-branch-1', name: 'Main Branch Gulshan', city: 'Karachi', address: 'Block 13-D, Gulshan-e-Iqbal', phone: '0300-1234567', email: null, map_link: 'https://maps.google.com/?q=Gulshan+e+Iqbal+Karachi' },
      { id: 'mock-branch-2', name: 'North Nazimabad', city: 'Karachi', address: 'Sector 5/B, Buffer Zone', phone: '0300-7654321', email: null, map_link: 'https://maps.google.com/?q=North+Karachi' },
      { id: 'mock-branch-3', name: 'Clifton', city: 'Karachi', address: 'Clifton Block 2', phone: '042-1112233', email: null, map_link: null },
    ]
  }
  return data
}

export async function getAdminBranches(): Promise<AdminBranch[]> {
  const branches = await getBranches()
  return branches.map((b, i) => ({
    id: i + 1,
    supabaseId: b.id,
    name: b.name,
    address: b.address,
    city: b.city,
    phone: b.phone,
    email: b.email || '',
    map_link: b.map_link || '',
  }))
}

export async function addAdminBranch(data: { name: string; address: string; city: string; phone: string; email: string; map_link: string }): Promise<void> {
  const { error } = await supabaseAdmin.from('branches').insert([{ name: data.name, address: data.address, city: data.city, phone: data.phone, email: data.email || null, map_link: data.map_link || null }])
  if (error) throw error
}

export async function updateAdminBranch(id: string, data: { name: string; address: string; city: string; phone: string; email: string; map_link: string }): Promise<void> {
  const { error } = await supabaseAdmin.from('branches').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteAdminBranch(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from('branches').delete().eq('id', id)
  if (error) throw error
}

// ==================== COURSES ====================

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase.from('courses').select('*')
  if (error && !error.message?.includes('not configured')) console.warn('Supabase courses:', error.message)
  if (!data || data.length === 0) {
    return [
      { id: 'mock-course-9m', title: 'Matric Science', class_level: '9', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-9a', title: 'Matric Arts', class_level: '9', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-9c', title: 'Computer Science', class_level: '9', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-10m', title: 'Matric Science', class_level: '10', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-10a', title: 'Matric Arts', class_level: '10', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-10c', title: 'Computer Science', class_level: '10', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-11pm', title: 'Pre-Medical', class_level: '11', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-11pe', title: 'Pre-Engineering', class_level: '11', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-11c', title: 'Commerce', class_level: '11', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-12pm', title: 'Pre-Medical', class_level: '12', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-12pe', title: 'Pre-Engineering', class_level: '12', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
      { id: 'mock-course-12c', title: 'Commerce', class_level: '12', description: null, subjects: null, duration: null, fee_monthly: null, fee_admission: null, schedule: null, branch_id: null, is_active: true },
    ]
  }
  return data
}

export async function getAdminCourses(): Promise<AdminCourse[]> {
  const [courses, branches] = await Promise.all([getCourses(), getBranches()])
  return courses.map((c, i) => {
    const branch = branches.find((b) => b.id === c.branch_id)
    return {
      id: i + 1,
      supabaseId: c.id,
      title: c.title,
      description: c.description || '',
      class_level: c.class_level,
      subjects: c.subjects || '',
      duration: c.duration || '',
      fee_monthly: c.fee_monthly || 0,
      fee_admission: c.fee_admission || 0,
      schedule: c.schedule || '',
      branch: branch?.name || '',
      active: c.is_active,
    }
  })
}

export async function addAdminCourse(data: { title: string; description: string; class_level: string; subjects: string; duration: string; fee_monthly: number; fee_admission: number; schedule: string; branch: string }): Promise<void> {
  const branches = await getBranches()
  const branch = branches.find((b) => b.name === data.branch)
  const { error } = await supabaseAdmin.from('courses').insert([{
    title: data.title,
    description: data.description || null,
    class_level: data.class_level,
    subjects: data.subjects || null,
    duration: data.duration || null,
    fee_monthly: data.fee_monthly || null,
    fee_admission: data.fee_admission || null,
    schedule: data.schedule || null,
    branch_id: branch?.id || null,
    is_active: true,
  }])
  if (error) throw error
}

export async function updateAdminCourse( courseId: string, data: { title: string; description: string; class_level: string; subjects: string; duration: string; fee_monthly: number; fee_admission: number; schedule: string; branch: string; active: boolean }): Promise<void> {
  const branches = await getBranches()
  const branch = branches.find((b) => b.name === data.branch)
  const { error } = await supabaseAdmin.from('courses').update({
    title: data.title,
    description: data.description || null,
    class_level: data.class_level,
    subjects: data.subjects || null,
    duration: data.duration || null,
    fee_monthly: data.fee_monthly || null,
    fee_admission: data.fee_admission || null,
    schedule: data.schedule || null,
    branch_id: branch?.id || null,
    is_active: data.active,
  }).eq('id', courseId)
  if (error) throw error
}

export async function deleteAdminCourse(courseId: string): Promise<void> {
  const { error } = await supabaseAdmin.from('courses').delete().eq('id', courseId)
  if (error) throw error
}

// ==================== FACULTY ====================

const mockFaculty: FacultyMember[] = [
  { id: 1, supabaseId: 'mock-fac-1', name: 'Dr. Amina Yusuf', qualification: 'PhD in Islamic Studies', subject: 'Quran & Tafsir', bio: 'Over 15 years of experience teaching Quranic sciences and Arabic linguistics.', image_url: '', active: true },
  { id: 2, supabaseId: 'mock-fac-2', name: 'Ustadh Bilal Hassan', qualification: 'Masters in Arabic Literature', subject: 'Arabic Language', bio: 'Specializes in modern and classical Arabic with a focus on conversational fluency.', image_url: '', active: true },
  { id: 3, supabaseId: 'mock-fac-3', name: 'Sr. Fatima Noor', qualification: 'BA in Islamic Jurisprudence', subject: 'Fiqh & Hadith', bio: 'Dedicated to making Islamic jurisprudence accessible to students of all levels.', image_url: '', active: false },
]

export async function getFaculty(): Promise<FacultyMember[]> {
  const { data, error } = await supabase.from('faculty').select('*')
  if (error && !error.message?.includes('not configured')) console.warn('Supabase faculty:', error.message)
  if (!data || data.length === 0) return mockFaculty
  return data.map((f: Record<string, unknown>, i: number) => ({
    id: i + 1,
    supabaseId: f.id as string,
    name: f.name as string,
    qualification: f.qualification as string,
    subject: f.subject as string,
    bio: f.bio as string || '',
    image_url: f.image_url as string || '',
    active: f.is_active as boolean ?? true,
  }))
}

export async function addFaculty(data: { name: string; qualification: string; subject: string; bio: string; image_url: string }): Promise<void> {
  const { error } = await supabaseAdmin.from('faculty').insert([{ ...data, is_active: true, image_url: data.image_url || null }])
  if (error) throw error
}

export async function updateFaculty(supabaseId: string, data: { name: string; qualification: string; subject: string; bio: string; image_url: string; active: boolean }): Promise<void> {
  const { error } = await supabaseAdmin.from('faculty').update({ name: data.name, qualification: data.qualification, subject: data.subject, bio: data.bio, image_url: data.image_url || null, is_active: data.active }).eq('id', supabaseId)
  if (error) throw error
}

export async function deleteFaculty(supabaseId: string): Promise<void> {
  const { error } = await supabaseAdmin.from('faculty').delete().eq('id', supabaseId)
  if (error) throw error
}

// ==================== TESTIMONIALS ====================

const mockTestimonials: Testimonial[] = [
  { id: 1, supabaseId: 'mock-ts-1', student_name: 'Ahmed Khan', achievement: 'Got 95% in Board Exams', class_level: 'Class 10', quote: 'Sir Azan Coaching Center changed my life. The teachers are incredibly supportive.', rating: 5, visible: true },
  { id: 2, supabaseId: 'mock-ts-2', student_name: 'Fatima Ali', achievement: 'Scored 1080/1100', class_level: 'Intermediate', quote: 'The regular test system and personalized attention helped me achieve my dream score.', rating: 5, visible: true },
  { id: 3, supabaseId: 'mock-ts-3', student_name: 'Usman Raza', achievement: 'Topper in City', class_level: 'Class 12', quote: 'The small batch sizes mean every student gets individual attention.', rating: 4, visible: true },
]

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase.from('testimonials').select('*')
  if (error && !error.message?.includes('not configured')) console.warn('Supabase testimonials:', error.message)
  if (!data || data.length === 0) return mockTestimonials
  return data.map((t: Record<string, unknown>, i: number) => ({
    id: i + 1,
    supabaseId: t.id as string,
    student_name: t.student_name as string,
    achievement: t.achievement as string || '',
    class_level: t.class_level as string || '',
    quote: t.quote as string,
    rating: 5,
    visible: t.is_active as boolean ?? true,
  }))
}

export async function addTestimonial(data: { student_name: string; achievement: string; class_level: string; quote: string; rating: number }): Promise<void> {
  const { error } = await supabaseAdmin.from('testimonials').insert([{ student_name: data.student_name, achievement: data.achievement || null, class_level: data.class_level || null, quote: data.quote, is_active: true }])
  if (error) throw error
}

export async function updateTestimonial(supabaseId: string, data: { student_name: string; achievement: string; class_level: string; quote: string; rating: number; visible: boolean }): Promise<void> {
  const { error } = await supabaseAdmin.from('testimonials').update({ student_name: data.student_name, achievement: data.achievement || null, class_level: data.class_level || null, quote: data.quote, is_active: data.visible }).eq('id', supabaseId)
  if (error) throw error
}

export async function deleteTestimonial(supabaseId: string): Promise<void> {
  const { error } = await supabaseAdmin.from('testimonials').delete().eq('id', supabaseId)
  if (error) throw error
}

// ==================== STATS ====================

const mockStats: StatItem[] = [
  { key: 'admissions_today', label: 'Admissions Today', value: 24 },
  { key: 'pending', label: 'Pending', value: 8 },
  { key: 'approved', label: 'Approved', value: 14 },
  { key: 'rejected', label: 'Rejected', value: 2 },
]

export async function getStats(): Promise<StatItem[]> {
  const { data, error } = await supabase.from('site_settings').select('*').in('key', ['stat_admissions_today', 'stat_pending', 'stat_approved', 'stat_rejected'])
  if (error && !error.message?.includes('not configured')) console.warn('Supabase stats:', error.message)
  if (!data || data.length === 0) return mockStats
  const map: Record<string, string> = {}
  for (const row of data) map[row.key] = row.value
  return [
    { key: 'admissions_today', label: 'Admissions Today', value: parseInt(map.stat_admissions_today) || 0 },
    { key: 'pending', label: 'Pending', value: parseInt(map.stat_pending) || 0 },
    { key: 'approved', label: 'Approved', value: parseInt(map.stat_approved) || 0 },
    { key: 'rejected', label: 'Rejected', value: parseInt(map.stat_rejected) || 0 },
  ]
}

export async function upsertStat(key: string, label: string, value: number): Promise<void> {
  const dbKey = 'stat_' + key
  const { error } = await supabaseAdmin.from('site_settings').upsert({ key: dbKey, value: String(value) }, { onConflict: 'key' })
  if (error) throw error
}

// ==================== ANNOUNCEMENTS ====================

const mockAnnouncements: Announcement[] = [
  { id: 1, supabaseId: 'mock-ann-1', title: 'Summer Enrollment Open', content: 'Registration for summer courses is now open.', date: '2026-05-01', active: true },
  { id: 2, supabaseId: 'mock-ann-2', title: 'Holiday Notice', content: 'Center will be closed on May 15th.', date: '2026-04-28', active: true },
]

export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase.from('announcements').select('*')
  if (error && !error.message?.includes('not configured')) console.warn('Supabase announcements:', error.message)
  if (!data || data.length === 0) return mockAnnouncements
  return data.filter((a: Record<string, unknown>) => a.is_active !== false).map((a: Record<string, unknown>, i: number) => ({
    id: i + 1,
    supabaseId: a.id as string,
    title: a.title as string,
    content: a.message as string,
    date: (a.created_at as string || '').split('T')[0],
    active: a.is_active as boolean ?? true,
  }))
}

export async function getHomeAnnouncements(): Promise<string[]> {
  const announcements = await getAnnouncements()
  return announcements.filter((a) => a.active).map((a) => a.title + ': ' + a.content)
}

export async function addAnnouncement(data: { title: string; content: string }): Promise<void> {
  const { error } = await supabaseAdmin.from('announcements').insert([{
    title: data.title,
    message: data.content,
    is_active: true,
    created_at: new Date().toISOString()
  }])
  if (error) throw error
}

export async function toggleAnnouncement(supabaseId: string): Promise<void> {
  const announcements = await getAnnouncements()
  const target = announcements.find((a) => a.supabaseId === supabaseId)
  if (!target) return
  const { error } = await supabaseAdmin.from('announcements').update({ is_active: !target.active }).eq('id', supabaseId)
  if (error) throw error
}

// ==================== SETTINGS ====================

const defaultSettings: Record<string, string> = {
  instituteName: 'Sir Azan Coaching Center',
  tagline: 'Excellence in Education, Rooted in Values',
  heroHeadline: 'Unlock Your Academic Potential with Expert Guidance',
  heroSubheadline: 'Personalized coaching for Matric, Intermediate, and Competitive Exams across Pakistan',
  primaryPhone: '+92 333 1234567',
  secondaryPhone: '+92 333 7654321',
  email: 'info@azancoaching.edu.pk',
  address: 'Main Boulevard, Block B, near Al-Faisal Market, Gulberg III, Lahore, Punjab',
  whatsappNumber: '+92 333 1234567',
  facebookUrl: 'https://facebook.com/azancoaching',
  twitterUrl: 'https://twitter.com/azancoaching',
  instagramUrl: 'https://instagram.com/azancoaching',
  youtubeUrl: 'https://youtube.com/@azancoaching',
  studentsEnrolled: '1200+',
  successRate: '98%',
  numberOfBranches: '3',
  yearsOfExcellence: '10+',
}

export async function getSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from('site_settings').select('*')
  if (error && !error.message?.includes('not configured')) console.warn('Supabase settings:', error.message)
  if (!data || data.length === 0) return { ...defaultSettings }

  const dbMap: Record<string, string> = {}
  for (const row of data) dbMap[row.key] = row.value

  return {
    instituteName: dbMap.institute_name || defaultSettings.instituteName,
    tagline: dbMap.tagline || defaultSettings.tagline,
    heroHeadline: dbMap.hero_headline || defaultSettings.heroHeadline,
    heroSubheadline: dbMap.hero_subheadline || defaultSettings.heroSubheadline,
    primaryPhone: dbMap.primary_phone || defaultSettings.primaryPhone,
    secondaryPhone: dbMap.secondary_phone || defaultSettings.secondaryPhone,
    email: dbMap.email || defaultSettings.email,
    address: dbMap.address || defaultSettings.address,
    whatsappNumber: dbMap.whatsapp_number || defaultSettings.whatsappNumber,
    facebookUrl: dbMap.facebook_url || defaultSettings.facebookUrl,
    twitterUrl: dbMap.twitter_url || defaultSettings.twitterUrl,
    instagramUrl: dbMap.instagram_url || defaultSettings.instagramUrl,
    youtubeUrl: dbMap.youtube_url || defaultSettings.youtubeUrl,
    studentsEnrolled: dbMap.stat_students || defaultSettings.studentsEnrolled,
    successRate: dbMap.stat_success_rate || defaultSettings.successRate,
    numberOfBranches: dbMap.stat_branches || defaultSettings.numberOfBranches,
    yearsOfExcellence: dbMap.stat_years || defaultSettings.yearsOfExcellence,
  }
}

export async function upsertSetting(key: string, value: string): Promise<void> {
  const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
  const { error } = await supabaseAdmin.from('site_settings').upsert({ key: dbKey, value }, { onConflict: 'key' })
  if (error) throw error
}

export async function saveSettings(settings: Record<string, string>): Promise<void> {
  const mapping: Record<string, string> = {
    instituteName: 'institute_name',
    tagline: 'tagline',
    heroHeadline: 'hero_headline',
    heroSubheadline: 'hero_subheadline',
    primaryPhone: 'primary_phone',
    secondaryPhone: 'secondary_phone',
    email: 'email',
    address: 'address',
    whatsappNumber: 'whatsapp_number',
    facebookUrl: 'facebook_url',
    twitterUrl: 'twitter_url',
    instagramUrl: 'instagram_url',
    youtubeUrl: 'youtube_url',
    studentsEnrolled: 'stat_students',
    successRate: 'stat_success_rate',
    numberOfBranches: 'stat_branches',
    yearsOfExcellence: 'stat_years',
  }
  for (const [key, value] of Object.entries(settings)) {
    const dbKey = mapping[key] || key
    const { error } = await supabaseAdmin.from('site_settings').upsert({ key: dbKey, value }, { onConflict: 'key' })
    if (error) throw error
  }
}

// ==================== ADMISSIONS ====================

const mockAdmissions: LocalAdmission[] = [
  { id: 'mock-adm-1', student_name: 'Ali Raza', father_name: 'Mohammad Raza', phone: '03001234567', email: 'ali@test.com', class_applying: '11', branch_id: null, course_id: null, message: 'Test admission', status: 'pending', applied_at: new Date().toISOString(), branch: null, course: null },
  { id: 'mock-adm-2', student_name: 'Sara Khan', father_name: 'Ahmed Khan', phone: '03007654321', email: null, class_applying: '10', branch_id: null, course_id: null, message: 'Demo entry', status: 'pending', applied_at: new Date().toISOString(), branch: null, course: null },
  { id: 'mock-adm-3', student_name: 'Usman Ali', father_name: 'Farhan Ali', phone: '03009998877', email: 'usman@test.com', class_applying: '12', branch_id: null, course_id: null, message: 'Sample', status: 'approved', applied_at: new Date(Date.now() - 86400000).toISOString(), branch: null, course: null },
]

export async function getAdmissions(): Promise<LocalAdmission[]> {
  const { data, error } = await supabaseAdmin
    .from('admissions')
    .select('*, branch:branches(name), course:courses(title)')
    .order('applied_at', { ascending: false })
  if (error && !error.message?.includes('not configured')) console.warn('Supabase admissions:', error.message)
  if (!data || data.length === 0) return mockAdmissions
  return data as unknown as LocalAdmission[]
}

export async function addAdmission(data: Omit<LocalAdmission, 'id'>): Promise<void> {
  const { error } = await supabaseAdmin.from('admissions').insert([data])
  if (error) throw error
}

export async function updateAdmission(id: string, updates: Partial<LocalAdmission>): Promise<void> {
  const { error } = await supabaseAdmin.from('admissions').update(updates).eq('id', id)
  if (error) throw error
}

// ==================== HOME PAGE STATS ====================

export async function getHomeStats(): Promise<{ value: number; suffix: string; label: string }[]> {
  const settings = await getSettings()
  return [
    { value: parseInt(settings.studentsEnrolled) || 1200, suffix: '+', label: 'Students Enrolled' },
    { value: parseInt(settings.successRate) || 98, suffix: '%', label: 'Success Rate' },
    { value: parseInt(settings.numberOfBranches) || 3, suffix: '', label: 'Branches' },
    { value: parseInt(settings.yearsOfExcellence) || 10, suffix: '+', label: 'Years of Excellence' },
  ]
}
