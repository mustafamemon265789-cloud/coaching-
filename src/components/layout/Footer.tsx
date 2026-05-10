import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Admission', href: '/admission' },
  { label: 'Branches', href: '/branches' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    label: 'Twitter',
    href: '#',
    path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5m-5 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8m5-9.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2',
  },
  {
    label: 'Youtube',
    href: '#',
    path: 'M23 9.3a3.3 3.3 0 0 0-2.3-2.3C19 6.5 12 6.5 12 6.5s-7 0-8.7.5A3.3 3.3 0 0 0 1 9.3 34 34 0 0 0 .5 12a34 34 0 0 0 .5 2.7 3.3 3.3 0 0 0 2.3 2.3c1.7.5 8.7.5 8.7.5s7 0 8.7-.5a3.3 3.3 0 0 0 2.3-2.3 34 34 0 0 0 .5-2.7 34 34 0 0 0-.5-2.7M9.8 15V9l5.8 3z',
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Sir Aazan Coaching Center</h3>
            <p className="text-white/70 text-sm">Where Students Become Toppers</p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[18px] h-[18px]"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              <li>123 Education Road, Block A, Gulshan-e-Iqbal, Karachi</li>
              <li>
                <a href="tel:+923001234567" className="hover:text-white transition-colors">
                  +92 300 1234567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@azancoaching.com"
                  className="hover:text-white transition-colors"
                >
                  info@azancoaching.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Our Mission</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Providing quality education and academic excellence to students from Class 9 to
              Intermediate. We believe in nurturing potential and building futures.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-center text-white/60 text-xs">
            &copy; {new Date().getFullYear()} Sir Aazan Coaching Center. All rights reserved.
          </p>
          <p className="text-center mt-2">
            <Link
              href="/admin/login"
              className="text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
