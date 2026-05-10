'use client'

import { useState } from 'react'
import { useToast } from '@/components/admin/ToastProvider'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { GraduationCap, BookOpen, Edit2, Save, X, Trash2, Eye, EyeOff } from 'lucide-react'

interface Faculty {
  id: number
  name: string
  qualification: string
  subject: string
  bio: string
  image_url: string
  active: boolean
}

const seed: Faculty[] = [
  { id: 1, name: 'Dr. Amina Yusuf', qualification: 'PhD in Islamic Studies', subject: 'Quran & Tafsir', bio: 'Over 15 years of experience teaching Quranic sciences and Arabic linguistics.', image_url: '', active: true },
  { id: 2, name: 'Ustadh Bilal Hassan', qualification: 'Masters in Arabic Literature', subject: 'Arabic Language', bio: 'Specializes in modern and classical Arabic with a focus on conversational fluency.', image_url: '', active: true },
  { id: 3, name: 'Sr. Fatima Noor', qualification: 'BA in Islamic Jurisprudence', subject: 'Fiqh & Hadith', bio: 'Dedicated to making Islamic jurisprudence accessible to students of all levels.', image_url: '', active: false },
]

export default function FacultyPage() {
  const [faculty, setFaculty] = useState(seed)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Faculty | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [qualification, setQualification] = useState('')
  const [subject, setSubject] = useState('')
  const [bio, setBio] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const { showToast } = useToast()

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !qualification.trim() || !subject.trim() || !bio.trim()) {
      showToast('error', 'Please fill in name, qualification, subject, and bio.')
      return
    }
    const id = Math.max(0, ...faculty.map((f) => f.id)) + 1
    setFaculty((prev) => [...prev, { id, name, qualification, subject, bio, image_url: imageUrl, active: true }])
    setName('')
    setQualification('')
    setSubject('')
    setBio('')
    setImageUrl('')
    showToast('success', 'Faculty member added.')
  }

  const startEdit = (f: Faculty) => {
    setEditingId(f.id)
    setEditForm({ ...f })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const saveEdit = () => {
    if (!editForm) return
    if (!editForm.name.trim() || !editForm.qualification.trim() || !editForm.subject.trim() || !editForm.bio.trim()) {
      showToast('error', 'Name, qualification, subject, and bio are required.')
      return
    }
    setFaculty((prev) => prev.map((f) => (f.id === editForm.id ? editForm : f)))
    setEditingId(null)
    setEditForm(null)
    showToast('success', 'Faculty member updated.')
  }

  const toggleActive = (id: number) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    )
    showToast('info', 'Faculty status toggled.')
  }

  const confirmDelete = () => {
    if (deleteId === null) return
    setFaculty((prev) => prev.filter((f) => f.id !== deleteId))
    setDeleteId(null)
    showToast('success', 'Faculty member deleted.')
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Faculty</h1>

      <form
        onSubmit={handleAdd}
        className="mb-8 rounded-xl border bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Add Faculty Member</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
          />
          <input
            placeholder="Qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
          />
          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
          />
          <input
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
          />
        </div>
        <textarea
          placeholder="Bio"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
        />
        <button
          type="submit"
          className="mt-4 rounded-lg bg-[#1A3C8F] px-4 py-2 text-sm font-medium text-white hover:bg-[#15307a] transition-colors"
        >
          Add Faculty Member
        </button>
      </form>

      {faculty.length === 0 && (
        <p className="text-sm text-gray-400">No faculty members yet.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {faculty.map((f) => {
          const editing = editingId === f.id
          return (
            <div
              key={f.id}
              className={`rounded-xl border bg-white p-5 shadow-sm ${
                !f.active && !editing ? 'opacity-60' : ''
              }`}
            >
              {editing && editForm ? (
                <div className="space-y-3">
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm((ef) => ef ? { ...ef, name: e.target.value } : null)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
                    placeholder="Name"
                  />
                  <input
                    value={editForm.qualification}
                    onChange={(e) => setEditForm((ef) => ef ? { ...ef, qualification: e.target.value } : null)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
                    placeholder="Qualification"
                  />
                  <input
                    value={editForm.subject}
                    onChange={(e) => setEditForm((ef) => ef ? { ...ef, subject: e.target.value } : null)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
                    placeholder="Subject"
                  />
                  <input
                    value={editForm.image_url}
                    onChange={(e) => setEditForm((ef) => ef ? { ...ef, image_url: e.target.value } : null)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
                    placeholder="Image URL"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm((ef) => ef ? { ...ef, bio: e.target.value } : null)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
                    placeholder="Bio"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex items-center gap-1 rounded-lg bg-[#1A3C8F] px-3 py-2 text-xs font-medium text-white hover:bg-[#15307a]"
                    >
                      <Save className="h-3.5 w-3.5" /> Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <X className="h-3.5 w-3.5" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-[#1A3C8F]" />
                      <h3 className="font-bold text-gray-900">{f.name}</h3>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        f.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {f.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 shrink-0 text-[#F97316]" />
                      {f.qualification}
                    </p>
                    <p className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 shrink-0 text-[#F97316]" />
                      {f.subject}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">{f.bio}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => startEdit(f)}
                      className="flex items-center gap-1 text-sm font-medium text-[#1A3C8F] hover:underline"
                    >
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(f.id)}
                      className="flex items-center gap-1 text-sm font-medium text-red-600 hover:underline"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                    <button
                      onClick={() => toggleActive(f.id)}
                      className="ml-auto flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                      title={f.active ? 'Deactivate' : 'Activate'}
                    >
                      {f.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Faculty Member"
        message="Are you sure you want to delete this faculty member? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
