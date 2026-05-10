import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Courses | Sir Azan Coaching Center',
}

const courses = [
  {
    id: 1,
    title: 'Matric Science (Class 9)',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Urdu', 'Pak Studies'],
    schedule: 'Mon/Wed/Fri 4-7PM',
    monthlyFee: 3000,
    admissionFee: 1000,
  },
  {
    id: 2,
    title: 'Matric Science (Class 10)',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Urdu', 'Pak Studies'],
    schedule: 'Tue/Thu/Sat 4-7PM',
    monthlyFee: 3500,
    admissionFee: 1000,
  },
  {
    id: 3,
    title: 'Intermediate Pre-Medical (Class 11)',
    subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Islamic Studies'],
    schedule: 'Mon/Wed/Fri 2-5PM',
    monthlyFee: 4000,
    admissionFee: 1500,
  },
  {
    id: 4,
    title: 'Intermediate Pre-Medical (Class 12)',
    subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Islamic Studies'],
    schedule: 'Tue/Thu/Sat 2-5PM',
    monthlyFee: 4500,
    admissionFee: 1500,
  },
  {
    id: 5,
    title: 'Intermediate Pre-Engineering (Class 11)',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Urdu', 'Islamic Studies'],
    schedule: 'Mon/Wed/Fri 8-11AM',
    monthlyFee: 4000,
    admissionFee: 1500,
  },
  {
    id: 6,
    title: 'Intermediate Pre-Engineering (Class 12)',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Urdu', 'Islamic Studies'],
    schedule: 'Tue/Thu/Sat 8-11AM',
    monthlyFee: 4500,
    admissionFee: 1500,
  },
]

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-dark mb-8">Our Courses</h1>

      <div className="flex flex-wrap gap-4 mb-10">
        <select className="border border-gray-300 rounded-md px-4 py-2 text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option>All Branches</option>
          <option>Main Branch Gulshan</option>
          <option>North Nazimabad</option>
          <option>Clifton</option>
        </select>
        <select className="border border-gray-300 rounded-md px-4 py-2 text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option>All Classes</option>
          <option>Class 9</option>
          <option>Class 10</option>
          <option>Class 11</option>
          <option>Class 12</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-text-dark mb-3">{course.title}</h3>

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
