'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/admin/ToastProvider'
import { getAnnouncements, addAnnouncement, toggleAnnouncement, type Announcement } from '@/lib/db'
import { Calendar } from 'lucide-react'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { showToast } = useToast()

  const loadData = async () => {
    setIsLoading(true)
    const data = await getAnnouncements()
    setAnnouncements(data)
    setIsLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      showToast('error', 'Please fill in all fields.')
      return
    }
    await addAnnouncement({ title, content })
    await loadData()
    setTitle('')
    setContent('')
    showToast('success', 'Announcement created.')
  }

  const toggleActive = async (id: number) => {
    const a = announcements.find((item) => item.id === id)
    if (!a) return
    await toggleAnnouncement(a.supabaseId)
    await loadData()
    showToast('info', 'Announcement status toggled.')
  }

  if (isLoading) return <div className="p-12 text-center text-gray-500">Loading announcements...</div>

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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <textarea
            placeholder="Content"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
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
