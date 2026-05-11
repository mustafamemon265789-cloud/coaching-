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
  const [authChecked, setAuthChecked] = useState(false)
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) return

    if (isAuthenticated()) {
      queueMicrotask(() => setAuthChecked(true))
    } else {
      router.replace('/admin/login')
    }
  }, [isLoginPage, router])

  if (!isLoginPage && !authChecked) return null

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-50 flex-col lg:flex-row">
        {/* Mobile Header */}
        {!isLoginPage && (
          <div className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 lg:hidden">
            <span className="flex-1 text-lg font-bold text-[#1A3C8F]">Azan Coaching</span>
            {/* The actual toggle button is inside Sidebar.tsx but we'll ensure layout space here */}
          </div>
        )}
        
        {isLoginPage ? null : <Sidebar />}
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">{children}</main>
      </div>
    </ToastProvider>
  )
}
