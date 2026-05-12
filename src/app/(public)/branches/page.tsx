import type { Metadata } from 'next'
import { MapPin, Phone, BookOpen } from 'lucide-react'
import { getBranches } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Our Branches | Sir Azan Coaching Center',
}

export default async function BranchesPage() {
  const branches = await getBranches()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-dark mb-10">Our Branches</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((b) => (
          <div key={b.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <h3 className="text-xl font-bold text-primary mb-4">{b.name}</h3>

            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-2 text-sm text-text-muted">
                <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>{b.address}, {b.city}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="shrink-0 text-secondary" />
                <a
                  href={`tel:${b.phone}`}
                  className="text-text-dark hover:text-primary transition-colors"
                >
                  {b.phone}
                </a>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {b.map_link && (
                <a
                  href={b.map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center border border-primary text-primary font-semibold py-2.5 rounded-md hover:bg-primary hover:text-white transition-all"
                >
                  View on Google Maps
                </a>
              )}
              <a
                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-500 text-white font-semibold py-2.5 rounded-md hover:brightness-110 transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
