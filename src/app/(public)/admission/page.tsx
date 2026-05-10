'use client'

import { useState } from 'react'
import { Check, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { addAdmission } from '@/lib/db'

const branches = ['Main Branch Gulshan', 'North Nazimabad', 'Clifton']
const classOptions = ['9', '10', '11', '12']
const coursesByClass: Record<string, string[]> = {
  '9': ['Matric Science', 'Matric Arts', 'Computer Science'],
  '10': ['Matric Science', 'Matric Arts', 'Computer Science'],
  '11': ['Pre-Medical', 'Pre-Engineering', 'ICS', 'Commerce'],
  '12': ['Pre-Medical', 'Pre-Engineering', 'ICS', 'Commerce'],
}

type FormData = {
  student_name: string
  father_name: string
  phone: string
  email: string
  class: string
  branch: string
  course: string
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('92')) {
    return '0' + digits.slice(2)
  }
  return digits
}

export default function AdmissionPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    student_name: '',
    father_name: '',
    phone: '',
    email: '',
    class: '',
    branch: '',
    course: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [apiError, setApiError] = useState('')

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const validateStep1 = () => {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (!form.student_name.trim()) errs.student_name = 'Student name is required'
    if (!form.father_name.trim()) errs.father_name = "Father's name is required"
    const normalized = normalizePhone(form.phone)
    if (!/^03\d{9}$/.test(normalized))
      errs.phone = 'Enter a valid Pakistani phone number (03XXXXXXXXX)'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (!form.class) errs.class = 'Please select a class'
    if (!form.branch) errs.branch = 'Please select a branch'
    if (!form.course) errs.course = 'Please select a course'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2)
      } else {
        const el = document.querySelector('[data-error="true"]')
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3)
      } else {
        const el = document.querySelector('[data-error="true"]')
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setApiError('')

    const normalizedPhone = normalizePhone(form.phone)
    const payload = {
      student_name: form.student_name.trim(),
      father_name: form.father_name.trim(),
      phone: normalizedPhone,
      email: form.email.trim() || undefined,
      class_applying: form.class,
      branch_name: form.branch,
      course_name: form.course,
    }

    addAdmission({
      student_name: form.student_name.trim(),
      father_name: form.father_name.trim(),
      phone: normalizedPhone,
      email: form.email.trim(),
      class_applying: form.class,
      branch: form.branch,
      course: form.course,
    })

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 10000)

    try {
      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      clearTimeout(timer)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Submission failed')
      }
      setSubmitted(true)
    } catch (e: unknown) {
      clearTimeout(timer)
      const message = e instanceof Error ? e.message : 'Something went wrong'
      setApiError(message)
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    const msg = `Assalam-o-Alaikum! I want to enroll ${form.student_name} in ${form.course} (Class ${form.class}) at ${form.branch}.`
    const waLink = `https://wa.me/923001234567?text=${encodeURIComponent(msg)}`
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} />
        </div>
        <h2 className="text-2xl font-bold text-text-dark mb-2">Application Submitted!</h2>
        {apiError && (
          <p className="text-sm text-amber-600 bg-amber-50 rounded-lg px-4 py-2 mb-4">
            {apiError}. You can still reach us directly on WhatsApp.
          </p>
        )}
        <p className="text-text-muted mb-6">
          We will contact you shortly. You can also reach us directly on WhatsApp.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:brightness-110 transition-all"
        >
          Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-dark mb-8 text-center">Admission Form</h1>

      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-text-muted'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div className={`w-12 h-1 rounded ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold text-text-dark mb-4">Step 1: Student Information</h2>
          <Input
            label="Student Name"
            value={form.student_name}
            onChange={(v) => update('student_name', v)}
            error={errors.student_name}
          />
          <Input
            label="Father's Name"
            value={form.father_name}
            onChange={(v) => update('father_name', v)}
            error={errors.father_name}
          />
          <Input
            label="Phone (03XXXXXXXXX)"
            value={form.phone}
            onChange={(v) => update('phone', v)}
            error={errors.phone}
            type="tel"
          />
          <Input
            label="Email (optional)"
            value={form.email}
            onChange={(v) => update('email', v)}
            error={errors.email}
            type="email"
          />
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-primary text-white font-semibold py-3 rounded-md active:scale-95 active:opacity-90 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            style={{ touchAction: 'manipulation' }}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold text-text-dark mb-4">Step 2: Course Selection</h2>
          <Select
            label="Class"
            value={form.class}
            onChange={(v) => {
              update('class', v)
              update('course', '')
            }}
            options={classOptions}
            error={errors.class}
          />
          <Select
            label="Branch"
            value={form.branch}
            onChange={(v) => update('branch', v)}
            options={branches}
            error={errors.branch}
          />
          {form.class && (
            <Select
              label="Course"
              value={form.course}
              onChange={(v) => update('course', v)}
              options={coursesByClass[form.class] || []}
              error={errors.course}
            />
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 border border-gray-300 text-text-dark font-semibold py-3 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-primary text-white font-semibold py-3 rounded-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold text-text-dark mb-4">Step 3: Confirm & Submit</h2>
          <div className="space-y-3 text-sm bg-gray-50 rounded-lg p-4">
            <Row label="Student Name" value={form.student_name} />
            <Row label="Father's Name" value={form.father_name} />
            <Row label="Phone" value={form.phone} />
            <Row label="Email" value={form.email || '-'} />
            <Row label="Class" value={form.class} />
            <Row label="Branch" value={form.branch} />
            <Row label="Course" value={form.course} />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 border border-gray-300 text-text-dark font-semibold py-3 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              disabled={submitting}
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-secondary text-white font-semibold py-3 rounded-md hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-medium text-text-dark">{label}:</span>{' '}
      <span className="text-text-muted">{value}</span>
    </p>
  )
}

function Input({
  label,
  value,
  onChange,
  error,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-dark mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={type === 'tel' ? 'tel' : type === 'email' ? 'email' : undefined}
        data-error={error ? 'true' : undefined}
        className={`w-full border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md px-3 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  error?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-dark mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md px-3 py-2 text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/50`}
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
