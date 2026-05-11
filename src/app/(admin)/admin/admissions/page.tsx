'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/admin/DataTable'
import { useToast } from '@/components/admin/ToastProvider'
import { getAdmissions, updateAdmission, type LocalAdmission } from '@/lib/db'

type Status = LocalAdmission['status']
type AdminAdmission = LocalAdmission & {
  branch_name: string
  course_name: string
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'student_name', label: 'Student Name' },
  { key: 'father_name', label: 'Father Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'course_name', label: 'Course' },
  { key: 'branch_name', label: 'Branch' },
  { key: 'class_applying', label: 'Class' },
  { key: 'applied_at', label: 'Date' },
  { key: 'status', label: 'Status' },
]

const statusColors: Record<string, string> = {
  pending: 'text-yellow-600 bg-yellow-50',
  approved: 'text-green-600 bg-green-50',
  rejected: 'text-red-600 bg-red-50',
}

const mapAdmission = (admission: LocalAdmission): AdminAdmission => ({
  ...admission,
  branch_name: admission.branch?.name || '-',
  course_name: admission.course?.title || '-',
})

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<AdminAdmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<Status | 'All'>('All')
  const { showToast } = useToast()

  const loadData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true)
    const rawData = await getAdmissions()
    setAdmissions(rawData.map(mapAdmission))
    setIsLoading(false)
  }

  useEffect(() => {
    let isMounted = true

    void getAdmissions()
      .then((rawData) => {
        if (!isMounted) return
        setAdmissions(rawData.map(mapAdmission))
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filtered = filter === 'All' ? admissions : admissions.filter((a) => a.status === filter)

  const handleStatus = async (id: string, status: Status) => {
    try {
      await updateAdmission(id, { status })
      await loadData(false)
      showToast('success', `Admission status updated to ${status}.`)
    } catch {
      showToast('error', 'Failed to update admission.')
    }
  }

  if (isLoading) return <div className="p-12 text-center text-gray-500">Loading admissions...</div>

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Admissions ({admissions.length})
      </h1>

      {admissions.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center text-gray-400">
          No admissions yet. Students will appear here after they submit the admission form.
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Filter:</span>
            {(['All', 'pending', 'approved', 'rejected'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors capitalize ${
                  filter === s
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s} {s === 'All' ? `(${admissions.length})` : `(${admissions.filter(a => a.status === s).length})`}
              </button>
            ))}
          </div>

          <DataTable
            columns={columns}
            data={filtered}
            searchKeys={['student_name', 'father_name', 'phone', 'course_name', 'branch_name']}
            actions={(row) =>
              row.status === 'pending' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatus(row.id, 'approved')}
                    className="rounded bg-green-500 px-3 py-1 text-xs font-medium text-white hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatus(row.id, 'rejected')}
                    className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[row.status]}`}
                >
                  {row.status}
                </span>
              )
            }
          />
        </>
      )}
    </div>
  )
}
