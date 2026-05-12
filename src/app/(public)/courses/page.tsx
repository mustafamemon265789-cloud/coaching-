import type { Metadata } from 'next'
import Link from 'next/link'
import { getCourses } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Our Courses | Sir Azan Coaching Center',
}

export default async function CoursesPage() {
  const dbCourses = await getCourses()

  const mapped = dbCourses.map((c) => ({
    id: c.id,
    title: c.title + (c.class_level ? ' (Class ' + c.class_level + ')' : ''),
    subjects: (c.subjects || '').split(',').map((s) => s.trim()).filter(Boolean),
    schedule: c.schedule || 'Mon/Wed/Fri',
    monthlyFee: c.fee_monthly || 3000,
    admissionFee: c.fee_admission || 1000,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-dark mb-8">Our Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mapped.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-text-dark mb-3">{course.title}</h3>

            {course.subjects.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Subjects
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {course.subjects.map((s) => (
                    <span key={s} className="text-xs bg-blue-50 text-primary px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-text-muted mb-1">
              <span className="font-medium text-text-dark">Schedule:</span> {course.schedule}
            </p>
            <p className="text-sm text-text-muted mb-1">
              <span className="font-medium text-text-dark">Monthly Fee:</span> Rs. {course.monthlyFee.toLocaleString()}
            </p>
            <p className="text-sm text-text-muted mb-4">
              <span className="font-medium text-text-dark">Admission Fee:</span> Rs. {course.admissionFee.toLocaleString()}
            </p>

            <div className="mt-auto">
              <Link
                href="/admission"
                className="inline-block w-full text-center bg-primary text-white font-semibold py-2.5 rounded-md hover:brightness-110 transition-all"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
