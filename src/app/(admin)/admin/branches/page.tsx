'use client'

import { useState } from 'react'
import { useToast } from '@/components/admin/ToastProvider'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { MapPin, Phone, Mail, Edit2, Save, X, Plus, Trash2, Globe } from 'lucide-react'

interface Branch {
  id: number
  name: string
  address: string
  city: string
  phone: string
  email: string
  map_link: string
}

const initialBranches: Branch[] = [
  { id: 1, name: 'Main Campus', address: '123 Main Street', city: 'Lahore', phone: '042-1111111', email: 'main@azancoaching.com', map_link: 'https://maps.google.com/?q=Lahore' },
  { id: 2, name: 'City Branch', address: '456 City Road', city: 'Lahore', phone: '042-2222222', email: 'city@azancoaching.com', map_link: 'https://maps.google.com/?q=Lahore' },
  { id: 3, name: 'Town Branch', address: '789 Town Avenue', city: 'Lahore', phone: '042-3333333', email: 'town@azancoaching.com', map_link: 'https://maps.google.com/?q=Lahore' },
]

export default function BranchesPage() {
  const [branches, setBranches] = useState(initialBranches)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [form, setForm] = useState<Branch>({ id: 0, name: '', address: '', city: '', phone: '', email: '', map_link: '' })
  const { showToast } = useToast()

  const startEdit = (b: Branch) => {
    setEditingId(b.id)
    setForm({ ...b })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm({ id: 0, name: '', address: '', city: '', phone: '', email: '', map_link: '' })
  }

  const saveEdit = () => {
    if (!form) return
    if (!form.name.trim() || !form.address.trim() || !form.city.trim() || !form.phone.trim()) {
      showToast('error', 'Name, address, city, and phone are required.')
      return
    }
    setBranches((prev) => prev.map((b) => (b.id === form.id ? form : b)))
    setEditingId(null)
    showToast('success', 'Branch updated.')
  }

  const handleAdd = () => {
    if (!form.name.trim() || !form.address.trim() || !form.city.trim() || !form.phone.trim()) {
      showToast('error', 'Name, address, city, and phone are required.')
      return
    }
    const id = Math.max(0, ...branches.map((b) => b.id)) + 1
    setBranches((prev) => [...prev, { ...form, id }])
    setShowAddForm(false)
    setForm({ id: 0, name: '', address: '', city: '', phone: '', email: '', map_link: '' })
    showToast('success', 'Branch added.')
  }

  const handleDelete = () => {
    if (deleteId === null) return
    setBranches((prev) => prev.filter((b) => b.id !== deleteId))
    setDeleteId(null)
    showToast('success', 'Branch deleted.')
  }

  const openAddForm = () => {
    setForm({ id: 0, name: '', address: '', city: '', phone: '', email: '', map_link: '' })
    setShowAddForm(true)
  }

  const formFields = () => (
    <div className="space-y-3">
      <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Branch name *" />
      <div className="grid grid-cols-2 gap-3">
        <input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Address *" />
        <input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="City *" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Phone *" />
        <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Email" />
      </div>
      <input value={form.map_link} onChange={(e) => setForm((f) => ({ ...f, map_link: e.target.value }))}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Google Maps link" />
    </div>
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Branches</h1>
        <button onClick={openAddForm}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Branch
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">New Branch</h2>
          {formFields()}
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={handleAdd} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
              Save Branch
            </button>
            <button type="button" onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {branches.map((b) => {
          const editing = editingId === b.id
          return (
            <div key={b.id} className="rounded-xl border bg-white p-6 shadow-sm">
              {editing ? (
                <>
                  {formFields()}
                  <div className="mt-4 flex gap-2">
                    <button onClick={saveEdit}
                      className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary/90">
                      <Save className="h-3.5 w-3.5" /> Save
                    </button>
                    <button onClick={cancelEdit}
                      className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50">
                      <X className="h-3.5 w-3.5" /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-900">{b.name}</h3>
                  <span className="inline-block mt-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{b.city}</span>
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-secondary" /> {b.address}</p>
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-secondary" /> {b.phone}</p>
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-secondary" /> {b.email}</p>
                    {b.map_link && <p className="flex items-center gap-2"><Globe className="h-4 w-4 shrink-0 text-secondary" /> <a href={b.map_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on Map</a></p>}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => startEdit(b)}
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button onClick={() => setDeleteId(b.id)}
                      className="flex items-center gap-1 text-sm font-medium text-red-600 hover:underline">
                      <Trash2 className="h-4 w-4" /> Delete
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
        title="Delete Branch"
        message="Are you sure you want to delete this branch? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
