'use client'

import { useState, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'
import { Loader2, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const errorRef = useRef<HTMLParagraphElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const passwordValue = password.trim()

    if (!passwordValue) {
      setError('Please enter the admin password.')
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
      setLoading(false)
      return
    }

    if (login(passwordValue)) {
      router.replace('/admin/dashboard')
      router.refresh()
    } else {
      setError('Invalid password, or this browser blocked sign-in storage.')
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-[#2D5BD6] px-4 overflow-y-auto">
      <div
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl my-auto"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
        </div>

        {error && (
          <p ref={errorRef} className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Enter admin password"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="numeric"
            autoFocus
          />
        

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        </form>
      </div>
    </div>
  )
}
