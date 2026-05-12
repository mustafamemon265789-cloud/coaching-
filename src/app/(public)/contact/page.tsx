'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Send, MessageCircle } from 'lucide-react'
import { getBranches, type Branch } from '@/lib/db'

export default function ContactPage() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    getBranches().then(setBranches)
  }, [])

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-dark mb-10">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          {sent ? (
            <div className="text-center py-10">
              <Send size={40} className="text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-dark mb-2">Message Sent!</h3>
              <p className="text-text-muted text-sm">
                We will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-text-dark mb-4">Send us a Message</h2>

              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-text-dark">Our Branches</h2>
          {branches.map((b) => (
            <div key={b.id} className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold text-primary mb-2">{b.name}</h3>
              <div className="flex items-start gap-2 text-sm text-text-muted mb-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>{b.address}, {b.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-3">
                <Phone size={16} className="shrink-0 text-secondary" />
                <a
                  href={`tel:${b.phone}`}
                  className="text-text-dark hover:text-primary transition-colors"
                >
                  {b.phone}
                </a>
              </div>
              <a
                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
