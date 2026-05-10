'use client'

import { useState } from 'react'
import { useToast } from '@/components/admin/ToastProvider'
import { Calendar } from 'lucide-react'

interface Announcement {
  id: number
  title: string
  content: string
  date: string
  active: boolean
}

const seed: Announcement[] = [
  { id: 1, title: 'Summer Enrollment Open', content: 'Registration for summer courses is now open.', date: '2026-05-01', active: true },
  { id: 2, title: 'Holiday Notice', content: 'Center will be closed on May 15th.', date: '2026-04-28', active: true },
]

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(seed)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { showToast } = useToast()

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      showToast('error', 'Please fill in all fields.')
      return
    }
    const id = Math.max(0, ...announcements.map((a) => a.id)) + 1
    const date = new Date().toISOString().split('T')[0]
    setAnnouncements((prev) => [...prev, { id, title, content, date, active: true }])
    setTitle('')
    setContent('')
    showToast('success', 'Announcement created.')
  }

  const toggleActive = (id: number) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    )
    showToast('info', 'Announcement status toggled.')
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Announcements</h1>

      <form
        onSubmit={handleAdd}
        className="mb-8 rounded-xl border bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-800">New Announcement</h2>
        <div className="space-y-3">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
          />
          <textarea
            placeholder="Content"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-[#1A3C8F] px-4 py-2 text-sm font-medium text-white hover:bg-[#15307a] transition-colors"
        >
          Create Announcement
        </button>
      </form>

      <div className="space-y-4">
        {announcements.length === 0 && (
          <p className="text-sm text-gray-400">No announcements yet.</p>
        )}
        {announcements.map((a) => (
          <div
            key={a.id}
            className={`rounded-xl border bg-white p-5 shadow-sm ${
              !a.active ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{a.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{a.content}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5" /> {a.date}
                </p>
              </div>
              <button
                onClick={() => toggleActive(a.id)}
                className={`rounded px-3 py-1 text-xs font-medium ${
                  a.active
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {a.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
