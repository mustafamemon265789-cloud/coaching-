import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import CoursesPreview from '@/components/home/CoursesPreview'
import WhyUs from '@/components/home/WhyUs'
import AnnouncementTicker from '@/components/home/AnnouncementTicker'
import Testimonials from '@/components/home/Testimonials'
import BranchCards from '@/components/home/BranchCards'

export const metadata: Metadata = {
  title: 'Sir Azan Coaching Center | Where Students Become Toppers',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CoursesPreview />
      <WhyUs />
      <AnnouncementTicker />
      <Testimonials />
      <BranchCards />
    </>
  )
}
