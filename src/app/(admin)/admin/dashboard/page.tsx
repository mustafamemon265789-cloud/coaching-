'use client'

import { useEffect, useState } from 'react'
import { Users, FileText, BookOpen, Building2, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'
import { getAdmissions, type LocalAdmission } from '@/lib/db'

export default function DashboardPage() {
  const [admissions, setAdmissions] = useState<LocalAdmission[]>([])
  
  useEffect(() => {
    getAdmissions().then(setAdmissions)
  }, [])

  const pending = admissions.filter((a) => a.status === 'pending').length
  const approved = admissions.filter((a) => a.status === 'approved').length
  const rejected = admissions.filter((a) => a.status === 'rejected').length
  const total = admissions.length

  const overviewCards = [
    { label: 'Total Admissions', value: total, icon: FileText, color: 'bg-blue-500', bg: 'bg-blue-50' },
    { label: 'Active Courses', value: 12, icon: BookOpen, color: 'bg-green-500', bg: 'bg-green-50' },
    { label: 'Faculty Members', value: 8, icon: Users, color: 'bg-purple-500', bg: 'bg-purple-50' },
    { label: 'Branches', value: 3, icon: Building2, color: 'bg-orange-500', bg: 'bg-orange-50' },
  ]

  const statusCards = [
    { label: 'Pending Admissions', value: pending, icon: Clock, color: 'bg-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Approved', value: approved, icon: CheckCircle, color: 'bg-green-500', bg: 'bg-green-50' },
    { label: 'Rejected', value: rejected, icon: XCircle, color: 'bg-red-500', bg: 'bg-red-50' },
    { label: 'Total', value: total, icon: TrendingUp, color: 'bg-indigo-500', bg: 'bg-indigo-50' },
  ]

  const recentActivity = admissions
    .slice()
    .reverse()
    .slice(0, 5)
    .map((a) => ({
      action: `New admission from ${a.student_name}`,
      time: new Date(a.applied_at).toLocaleDateString(),
      type: 'admission' as const,
    }))

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{s.label}</span>
                <div className={`${s.bg} rounded-lg p-2`}>
                  <Icon className={`h-5 w-5 ${s.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-gray-900">{s.value}</p>
            </div>
          )
        })}
      </div>

      <h2 className="mb-4 mt-8 text-lg font-semibold text-gray-800">Admission Status</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statusCards.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{s.label}</span>
                <Icon className={`h-5 w-5 ${s.color.replace('bg-', 'text-')}`} />
              </div>
              <p className="mt-3 text-3xl font-bold text-gray-900">{s.value}</p>
            </div>
          )
        })}
      </div>

      {recentActivity.length > 0 && (
        <>
          <h2 className="mb-4 mt-8 text-lg font-semibold text-gray-800">Recent Activity</h2>
          <div className="rounded-xl border bg-white shadow-sm">
            {recentActivity.map((item, i) => (
              <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i < recentActivity.length - 1 ? 'border-b' : ''}`}>
                <div className={`h-2 w-2 rounded-full ${item.type === 'admission' ? 'bg-blue-500' : item.type === 'course' ? 'bg-green-500' : item.type === 'faculty' ? 'bg-purple-500' : 'bg-orange-500'}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{item.action}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
