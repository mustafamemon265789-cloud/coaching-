import type { Metadata } from 'next'
import { MapPin, Phone, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Branches | Sir Azan Coaching Center',
}

const branches = [
  {
    name: 'Main Branch Gulshan',
    address: '123 Education Road, Block A, Gulshan-e-Iqbal, Karachi',
    phone: '+92 300 1234567',
    waNumber: '923001234567',
    courses: ['Matric Science (9-10)', 'Pre-Medical (11-12)', 'Pre-Engineering (11-12)', 'ICS (11-12)'],
    mapUrl: 'https://maps.google.com/?q=Gulshan-e-Iqbal+Karachi',
  },
  {
    name: 'North Nazimabad Branch',
    address: '456 Learning Avenue, Block B, North Nazimabad, Karachi',
    phone: '+92 300 7654321',
    waNumber: '923007654321',
    courses: ['Matric Science (9-10)', 'Pre-Medical (11-12)', 'Commerce (11-12)'],
    mapUrl: 'https://maps.google.com/?q=North+Nazimabad+Karachi',
  },
  {
    name: 'Clifton Branch',
    address: '789 Knowledge Street, Block 5, Clifton, Karachi',
    phone: '+92 300 9876543',
    waNumber: '923009876543',
    courses: ['Matric Science (9-10)', 'Pre-Engineering (11-12)', 'ICS (11-12)', 'Commerce (11-12)'],
    mapUrl: 'https://maps.google.com/?q=Clifton+Karachi',
  },
]

export default function BranchesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-dark mb-10">Our Branches</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((b) => (
          <div key={b.name} className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <h3 className="text-xl font-bold text-primary mb-4">{b.name}</h3>

            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-2 text-sm text-text-muted">
                <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>{b.address}</span>
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

              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                  <BookOpen size={16} className="text-secondary" />
                  <span>Active Courses</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {b.courses.map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-blue-50 text-primary px-2 py-0.5 rounded"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <a
                href={b.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border border-primary text-primary font-semibold py-2.5 rounded-md hover:bg-primary hover:text-white transition-all"
              >
                View on Google Maps
              </a>
              <a
                href={`https://wa.me/${b.waNumber}`}
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
