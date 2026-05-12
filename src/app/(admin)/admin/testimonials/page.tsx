'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/admin/ToastProvider'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, type Testimonial } from '@/lib/db'
import { Quote, Edit2, Trash2, Eye, EyeOff, Star } from 'lucide-react'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const [student_name, setName] = useState('')
  const [achievement, setAchievement] = useState('')
  const [class_level, setClassLevel] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(5)

  const { showToast } = useToast()

  const loadData = async () => {
    setIsLoading(true)
    const data = await getTestimonials()
    setTestimonials(data)
    setIsLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const resetForm = () => {
    setName(''); setAchievement(''); setClassLevel(''); setQuote(''); setRating(5); setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!student_name.trim() || !quote.trim()) {
      showToast('error', 'Student name and quote are required.')
      return
    }

    if (editingId !== null) {
      const t = testimonials.find((item) => item.id === editingId)
      if (!t) return
      await updateTestimonial(t.supabaseId, { student_name, achievement, class_level, quote, rating, visible: t.visible })
      await loadData()
      showToast('success', 'Testimonial updated.')
      resetForm()
      return
    }

    await addTestimonial({ student_name, achievement, class_level, quote, rating })
    await loadData()
    resetForm()
    showToast('success', 'Testimonial added.')
  }

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id)
    setName(t.student_name); setAchievement(t.achievement); setClassLevel(t.class_level)
    setQuote(t.quote); setRating(t.rating)
  }

  const toggleVisible = async (id: number) => {
    const t = testimonials.find((item) => item.id === id)
    if (!t) return
    await updateTestimonial(t.supabaseId, { student_name: t.student_name, achievement: t.achievement, class_level: t.class_level, quote: t.quote, rating: t.rating, visible: !t.visible })
    await loadData()
    showToast('info', 'Visibility toggled.')
  }

  const handleDelete = async () => {
    if (deleteId === null) return
    const t = testimonials.find((item) => item.id === deleteId)
    if (!t) return
    await deleteTestimonial(t.supabaseId)
    await loadData()
    setDeleteId(null)
    showToast('success', 'Testimonial deleted.')
  }

  if (isLoading) return <div className="p-12 text-center text-gray-500">Loading testimonials...</div>

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Testimonials</h1>

      <form onSubmit={handleSubmit} className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <input placeholder="Student Name *" value={student_name} onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <input placeholder="Achievement (e.g. Got 95%)" value={achievement} onChange={(e) => setAchievement(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <input placeholder="Class Level (e.g. Class 10)" value={class_level} onChange={(e) => setClassLevel(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        </div>
        <div className="mt-3 flex items-center gap-1">
          <span className="mr-2 text-sm text-gray-600">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)}>
              <Star className={`h-5 w-5 ${star <= rating ? 'fill-secondary text-secondary' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>
        <textarea placeholder="Testimonial quote *" rows={3} value={quote} onChange={(e) => setQuote(e.target.value)}
          className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            {editingId ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {testimonials.length === 0 && <p className="text-sm text-gray-400">No testimonials yet.</p>}
        {testimonials.map((t) => (
          <div key={t.id} className={`rounded-xl border bg-white p-5 shadow-sm ${!t.visible ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Quote className="h-4 w-4 text-secondary" />
                  <h3 className="font-semibold text-gray-900">{t.student_name}</h3>
                  <span className="text-xs text-gray-400">| {t.class_level}</span>
                </div>
                {t.achievement && (
                  <span className="mt-1 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    {t.achievement}
                  </span>
                )}
                <div className="mt-1 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-4 w-4 ${star <= t.rating ? 'fill-secondary text-secondary' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="mt-2 text-sm italic text-gray-600">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="ml-4 flex gap-2">
                <button onClick={() => startEdit(t)}
                  className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200">
                  <Edit2 className="inline h-3.5 w-3.5" />
                </button>
                <button onClick={() => toggleVisible(t.id)}
                  className={`rounded px-3 py-1 text-xs font-medium ${t.visible ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                  {t.visible ? <EyeOff className="inline h-3.5 w-3.5" /> : <Eye className="inline h-3.5 w-3.5" />}
                </button>
                <button onClick={() => setDeleteId(t.id)}
                  className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200">
                  <Trash2 className="inline h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
