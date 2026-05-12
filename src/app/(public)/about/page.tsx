import type { Metadata } from 'next'
import { GraduationCap, Target, Eye } from 'lucide-react'
import { getFaculty } from '@/lib/db'

export const metadata: Metadata = {
  title: 'About Us | Sir Azan Coaching Center',
}

const achievements = [
  { year: '2018', title: 'Institute Founded', desc: 'Sir Azan Coaching Center established with 20 students.' },
  { year: '2019', title: 'First Board Toppers', desc: '3 students secured positions in Karachi Board.' },
  { year: '2020', title: 'Expanded to New Branch', desc: 'Opened North Nazimabad branch.' },
  { year: '2021', title: '100% Passing Rate', desc: 'All enrolled students passed with A grades.' },
  { year: '2022', title: 'Clifton Branch Opened', desc: 'Expanded footprint to Clifton, Karachi.' },
  { year: '2023', title: '500+ Students Enrolled', desc: 'Crossed 500 active students milestone.' },
  { year: '2024', title: 'Digital Learning Initiative', desc: 'Launched hybrid classes and online resources.' },
]

export default async function AboutPage() {
  const facultyMembers = await getFaculty()
  const faculty = facultyMembers.filter((f) => f.active).slice(0, 3).map((f) => ({
    name: f.name,
    subject: f.subject,
    qualification: f.qualification,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-16">
        <h1 className="text-3xl font-bold text-text-dark mb-6">
          About Sir Azan Coaching Center
        </h1>
        <p className="text-text-muted leading-relaxed max-w-3xl">
          Founded in 2018, Sir Azan Coaching Center has grown from a small classroom of 20 students
          to one of Karachi&apos;s most trusted coaching institutes. We specialize in preparing
          students for Matric (Class 9-10) and Intermediate (Class 11-12) examinations under the
          Karachi Board. Our proven teaching methodology, experienced faculty, and personalized
          attention have consistently produced top achievers.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white rounded-xl shadow-md p-6">
          <Target size={28} className="text-primary mb-3" />
          <h3 className="text-lg font-semibold text-text-dark mb-2">Our Mission</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            To provide accessible, high-quality education that empowers students to achieve academic
            excellence and build a strong foundation for their future careers.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <Eye size={28} className="text-primary mb-3" />
          <h3 className="text-lg font-semibold text-text-dark mb-2">Our Vision</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            To be the leading coaching institute in Pakistan, recognized for academic excellence,
            innovative teaching methods, and nurturing the next generation of leaders.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6 mb-16 flex flex-col sm:flex-row gap-6 items-center">
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <GraduationCap size={48} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-dark mb-1">Sir Azan</h3>
          <p className="text-sm text-secondary font-medium mb-2">Founder &amp; Head Instructor</p>
          <p className="text-text-muted text-sm leading-relaxed">
            With over 15 years of teaching experience, Sir Azan has guided thousands of students
            toward academic success. His passion for physics and commitment to student development
            make him a beloved mentor.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-text-dark mb-6">Our Faculty</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faculty.map((f) => (
            <div key={f.name} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={32} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-text-dark">{f.name}</h3>
              <p className="text-sm text-secondary font-medium">{f.subject}</p>
              <p className="text-xs text-text-muted mt-1">{f.qualification}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-text-dark mb-6">Our Achievements</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
          <div className="space-y-8">
            {achievements.map((a) => (
              <div key={a.year} className="relative pl-12">
                <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-white shadow" />
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                    {a.year}
                  </span>
                  <h3 className="text-base font-semibold text-text-dark mt-1">{a.title}</h3>
                  <p className="text-sm text-text-muted mt-1">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
