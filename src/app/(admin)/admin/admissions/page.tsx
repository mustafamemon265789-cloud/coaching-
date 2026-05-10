'use client'

import { useState } from 'react'
import DataTable from '@/components/admin/DataTable'
import { useToast } from '@/components/admin/ToastProvider'
import { getAdmissions, updateAdmission, type LocalAdmission } from '@/lib/db'

type Status = LocalAdmission['status']

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'student_name', label: 'Student Name' },
  { key: 'father_name', label: 'Father Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'course', label: 'Course' },
  { key: 'branch', label: 'Branch' },
  { key: 'class_applying', label: 'Class' },
  { key: 'applied_at', label: 'Date' },
  { key: 'status', label: 'Status' },
]

const statusColors: Record<Status, string> = {
  Pending: 'text-yellow-600 bg-yellow-50',
  Approved: 'text-green-600 bg-green-50',
  Rejected: 'text-red-600 bg-red-50',
}

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<LocalAdmission[]>(() =>
    typeof window !== 'undefined' ? getAdmissions() : []
  )
  const [filter, setFilter] = useState<Status | 'All'>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? admissions : admissions.filter((a) => a.status === filter)

  const handleStatus = (id: number, status: Status) => {
    updateAdmission(id, { status })
    setAdmissions(getAdmissions())
    showToast('success', `Admission #${id} ${status.toLowerCase()}.`)
  }

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
            {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === s
                    ? 'bg-[#1A3C8F] text-white'
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
            searchKeys={['student_name', 'father_name', 'phone', 'course', 'branch']}
            actions={(row) =>
              row.status === 'Pending' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatus(row.id, 'Approved')}
                    className="rounded bg-green-500 px-3 py-1 text-xs font-medium text-white hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatus(row.id, 'Rejected')}
                    className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[row.status as Status]}`}
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
