export interface Branch {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  map_link: string
  created_at: string
}

export interface Course {
  id: string
  title: string
  description: string
  class_level: string
  subjects: string
  duration: string
  fee_monthly: number
  fee_admission: number
  schedule: string
  branch_id: string
  is_active: boolean
  created_at: string
}

export interface Admission {
  id: string
  student_name: string
  father_name: string
  phone: string
  email: string
  class_applying: string
  branch_id: string
  course_id: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  applied_at: string
  updated_at: string
}

export interface Announcement {
  id: string
  title: string
  message: string
  branch_id: string | null
  is_active: boolean
  created_at: string
}

export interface Testimonial {
  id: string
  student_name: string
  achievement: string
  class_level: string
  quote: string
  is_active: boolean
  created_at: string
}

export interface Stat {
  id: string
  label: string
  value: string
  icon: string
  order: number
}

export interface Faculty {
  id: string
  name: string
  qualification: string
  subject: string
  bio: string
  image_url: string
  is_active: boolean
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  updated_at: string
}
