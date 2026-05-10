'use client'

import { useState } from 'react'
import { useToast } from '@/components/admin/ToastProvider'
import { Save } from 'lucide-react'

interface StatItem {
  key: string
  label: string
  value: number
}

const initialStats: StatItem[] = [
  { key: 'admissions_today', label: 'Admissions Today', value: 24 },
  { key: 'pending', label: 'Pending', value: 8 },
  { key: 'approved', label: 'Approved', value: 14 },
  { key: 'rejected', label: 'Rejected', value: 2 },
]

export default function StatsPage() {
  const [stats, setStats] = useState(initialStats)
  const { showToast } = useToast()

  const update = (key: string, field: 'label' | 'value', val: string | number) => {
    setStats((prev) =>
      prev.map((s) => (s.key === key ? { ...s, [field]: val } : s))
    )
  }

  const handleSave = () => {
    showToast('success', 'Stats updated.')
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Stats</h1>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2">
          {stats.map((s) => (
            <div key={s.key} className="space-y-2 rounded-lg border p-4">
              <label className="block text-sm font-medium text-gray-700">
                Label
              </label>
              <input
                value={s.label}
                onChange={(e) => update(s.key, 'label', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
              />
              <label className="block text-sm font-medium text-gray-700">
                Value
              </label>
              <input
                type="number"
                value={s.value}
                onChange={(e) =>
                  update(s.key, 'value', parseInt(e.target.value) || 0)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-6 flex items-center gap-2 rounded-lg bg-[#1A3C8F] px-4 py-2 text-sm font-medium text-white hover:bg-[#15307a] transition-colors"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  )
}
