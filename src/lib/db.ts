import { supabase } from './supabase'

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

export async function getAdmissions(): Promise<LocalAdmission[]> {
  const { data, error } = await supabase
    .from('admissions')
    .select('*, branch:branches(name), course:courses(title)')
    .order('applied_at', { ascending: false })
  if (error && !error.message?.includes('not configured')) console.warn('Supabase admissions:', error.message)
  return data || []
}

export async function addAdmission(data: Omit<LocalAdmission, 'id' | 'status' | 'applied_at'>): Promise<void> {
  const { error } = await supabase.from('admissions').insert([data])
  if (error) throw error
}

export async function updateAdmission(id: string, updates: Partial<LocalAdmission>): Promise<void> {
  const { error } = await supabase.from('admissions').update(updates).eq('id', id)
  if (error) throw error
}
