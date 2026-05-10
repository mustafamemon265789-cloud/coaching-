'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import Sidebar from '@/components/admin/Sidebar'
import ToastProvider from '@/components/admin/ToastProvider'
import { isAuthenticated } from '@/lib/auth'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted && !isLoginPage) return
    if (!isLoginPage && !isAuthenticated()) {
      router.push('/admin/login')
    }
  }, [mounted, isLoginPage, router])

  if (!mounted && !isLoginPage) return null

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-50">
        {isLoginPage ? null : <Sidebar />}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </ToastProvider>
  )
}
