import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[#2563EB] px-6 py-20 text-white sm:px-12 lg:px-20">
      <div className="hero-pattern relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Shaping Tomorrow&apos;s Leaders Today
          </h1>
          <p className="max-w-xl text-lg text-white/80 sm:text-xl">
            Join Sir Aazan Coaching Center — Expert teachers, proven results
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              href="/admission"
              className="rounded-xl bg-secondary px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
            >
              Apply for Admission
            </Link>
            <Link
              href="/courses"
              className="rounded-xl border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-primary"
            >
              View Courses
            </Link>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <div className="relative aspect-square w-64 sm:w-80 lg:w-96 overflow-hidden rounded-full border-8 border-white/20 bg-white shadow-2xl">
            <Image
              src="/logo.png"
              alt="Sir Aazan Coaching Center Logo"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
