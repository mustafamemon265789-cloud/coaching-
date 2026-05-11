'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Building2,
  Megaphone,
  Quote,
  BarChart3,
  GraduationCap,
  Settings,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/admissions', label: 'Admissions', icon: FileText },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/faculty', label: 'Faculty', icon: GraduationCap },
  { href: '/admin/branches', label: 'Branches', icon: Building2 },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/admin/stats', label: 'Stats', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = (href: string) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? 'bg-primary text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed right-4 top-3 z-40 rounded-md border bg-white p-2 shadow-sm lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-white shadow-2xl transition-transform duration-300 lg:static lg:w-64 lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <span className="text-xl font-bold text-primary">Azan Coaching</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-1 hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden md:flex lg:hidden">
          <nav className="flex flex-col items-center gap-2 p-3">
            {navItems.map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg p-2.5 transition-colors ${
                  pathname === href
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={navItems.find((i) => i.href === href)!.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </nav>
        </div>

        <nav className="hidden flex-1 flex-col gap-1 overflow-y-auto p-4 lg:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="lg:hidden">
          <nav className="flex flex-col gap-1 overflow-y-auto p-4">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={linkClass(href)}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}
