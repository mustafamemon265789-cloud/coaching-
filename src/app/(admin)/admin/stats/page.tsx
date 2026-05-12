'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/admin/ToastProvider'
import { getStats, upsertStat, type StatItem } from '@/lib/db'
import { Save } from 'lucide-react'

export default function StatsPage() {
  const [stats, setStats] = useState<StatItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  const loadData = async () => {
    setIsLoading(true)
    const data = await getStats()
    setStats(data)
    setIsLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const update = (key: string, field: 'label' | 'value', val: string | number) => {
    setStats((prev) =>
      prev.map((s) => (s.key === key ? { ...s, [field]: val } : s))
    )
  }

  const handleSave = async () => {
    for (const s of stats) {
      await upsertStat(s.key, s.label, s.value)
    }
    showToast('success', 'Stats updated.')
  }

  if (isLoading) return <div className="p-12 text-center text-gray-500">Loading stats...</div>

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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-6 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  )
}
