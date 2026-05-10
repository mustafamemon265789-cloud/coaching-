'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  type: ToastType
  message: string
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const iconMap = {
  success: { icon: CheckCircle, bg: 'bg-green-500', border: 'border-green-600' },
  error: { icon: XCircle, bg: 'bg-red-500', border: 'border-red-600' },
  info: { icon: Info, bg: 'bg-blue-500', border: 'border-blue-600' },
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => {
          const { icon: Icon, bg } = iconMap[t.type]
          return (
            <div
              key={t.id}
              className={`${bg} flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-sm">{t.message}</span>
              <button onClick={() => remove(t.id)} className="ml-auto">
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
