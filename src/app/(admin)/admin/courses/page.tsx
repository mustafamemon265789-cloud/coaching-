'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { useToast } from '@/components/admin/ToastProvider'
import { getAdminCourses, addAdminCourse, updateAdminCourse, deleteAdminCourse, type AdminCourse } from '@/lib/db'

const classLevels = ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Intermediate']

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'class_level', label: 'Class' },
  { key: 'fee_monthly', label: 'Monthly Fee' },
  { key: 'branch', label: 'Branch' },
  { key: 'active', label: 'Status' },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<AdminCourse[]>([])
  const [branches, setBranches] = useState<string[]>(['Main Campus', 'City Branch', 'Town Branch'])
  const [isLoading, setIsLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [class_level, setClassLevel] = useState('')
  const [subjects, setSubjects] = useState('')
  const [duration, setDuration] = useState('')
  const [fee_monthly, setFeeMonthly] = useState('')
  const [fee_admission, setFeeAdmission] = useState('')
  const [schedule, setSchedule] = useState('')
  const [branch, setBranch] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { showToast } = useToast()

  const loadData = async () => {
    setIsLoading(true)
    const data = await getAdminCourses()
    setCourses(data)
    const branchNames = [...new Set(data.map((c) => c.branch).filter(Boolean))] as string[]
    if (branchNames.length > 0) setBranches(branchNames)
    setIsLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const resetForm = () => {
    setTitle(''); setDescription(''); setClassLevel(''); setSubjects('')
    setDuration(''); setFeeMonthly(''); setFeeAdmission(''); setSchedule('')
    setBranch(''); setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !class_level || !duration.trim() || !fee_monthly) {
      showToast('error', 'Please fill in required fields.')
      return
    }

    if (editingId !== null) {
      const course = courses.find((c) => c.id === editingId)
      if (!course) return
      await updateAdminCourse(course.supabaseId, { title, description, class_level, subjects, duration, fee_monthly: Number(fee_monthly), fee_admission: Number(fee_admission) || 0, schedule, branch, active: course.active })
      await loadData()
      showToast('success', 'Course updated.')
      resetForm()
      return
    }

    await addAdminCourse({ title, description, class_level, subjects, duration, fee_monthly: Number(fee_monthly), fee_admission: Number(fee_admission) || 0, schedule, branch })
    await loadData()
    resetForm()
    showToast('success', 'Course added.')
  }

  const startEdit = (course: AdminCourse) => {
    setEditingId(course.id)
    setTitle(course.title); setDescription(course.description); setClassLevel(course.class_level)
    setSubjects(course.subjects); setDuration(course.duration)
    setFeeMonthly(String(course.fee_monthly)); setFeeAdmission(String(course.fee_admission))
    setSchedule(course.schedule); setBranch(course.branch)
  }

  const toggleActive = async (id: number) => {
    const course = courses.find((c) => c.id === id)
    if (!course) return
    await updateAdminCourse(course.supabaseId, { ...course, active: !course.active })
    await loadData()
    showToast('info', 'Course status toggled.')
  }

  const handleDelete = async () => {
    if (deleteId === null) return
    const course = courses.find((c) => c.id === deleteId)
    if (!course) return
    await deleteAdminCourse(course.supabaseId)
    await loadData()
    setDeleteId(null)
    showToast('success', 'Course deleted.')
  }

  if (isLoading) return <div className="p-12 text-center text-gray-500">Loading courses...</div>

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Courses</h1>

      <form onSubmit={handleSubmit} className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {editingId ? 'Edit Course' : 'Add Course'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input placeholder="Course title *" value={title} onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <input placeholder="Description *" value={description} onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <select value={class_level} onChange={(e) => setClassLevel(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
            <option value="">Select Class *</option>
            {classLevels.map((cl) => <option key={cl} value={cl}>{cl}</option>)}
          </select>
          <input placeholder="Subjects (comma separated)" value={subjects} onChange={(e) => setSubjects(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <input placeholder="Duration * (e.g. 6 months)" value={duration} onChange={(e) => setDuration(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <input placeholder="Schedule (e.g. Mon/Wed/Fri 4-6 PM)" value={schedule} onChange={(e) => setSchedule(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <input type="number" placeholder="Monthly Fee * (PKR)" value={fee_monthly} onChange={(e) => setFeeMonthly(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <input type="number" placeholder="Admission Fee (PKR)" value={fee_admission} onChange={(e) => setFeeAdmission(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <select value={branch} onChange={(e) => setBranch(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
            <option value="">Select Branch</option>
            {branches.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            {editingId ? 'Update Course' : 'Add Course'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      <DataTable
        columns={columns}
        data={courses}
        searchKeys={['title', 'class_level', 'subjects', 'branch']}
        actions={(row: AdminCourse) => (
          <div className="flex gap-2">
            <button onClick={() => startEdit(row)}
              className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200">
              Edit
            </button>
            <button onClick={() => toggleActive(row.id)}
              className={`rounded px-3 py-1 text-xs font-medium ${row.active ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
              {row.active ? 'Deactivate' : 'Activate'}
            </button>
            <button onClick={() => setDeleteId(row.id)}
              className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200">
              Delete
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
