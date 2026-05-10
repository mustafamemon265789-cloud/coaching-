const ADMISSIONS_KEY = 'azan_admissions'

function getItems<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function setItems<T>(key: string, items: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(items))
  } catch {
  }
}

export interface LocalAdmission {
  id: number
  student_name: string
  father_name: string
  phone: string
  email: string
  class_applying: string
  branch: string
  course: string
  status: 'Pending' | 'Approved' | 'Rejected'
  applied_at: string
}

let idCounter = Date.now()

export function getAdmissions(): LocalAdmission[] {
  return getItems<LocalAdmission>(ADMISSIONS_KEY)
}

export function addAdmission(data: Omit<LocalAdmission, 'id' | 'status' | 'applied_at'>): void {
  const admissions = getAdmissions()
  admissions.push({
    ...data,
    id: ++idCounter,
    status: 'Pending',
    applied_at: new Date().toISOString(),
  })
  setItems(ADMISSIONS_KEY, admissions)
}

export function updateAdmission(id: number, updates: Partial<LocalAdmission>): void {
  const admissions = getAdmissions().map((a) => (a.id === id ? { ...a, ...updates } : a))
  setItems(ADMISSIONS_KEY, admissions)
}
