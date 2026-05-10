import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex flex-col min-h-screen`}>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
}
