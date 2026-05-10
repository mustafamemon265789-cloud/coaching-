import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[#2563EB] px-6 py-20 text-white sm:px-12 lg:px-20">
      <style>{`
        .hero-pattern::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(30deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%),
            linear-gradient(150deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%),
            linear-gradient(30deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%),
            linear-gradient(150deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%);
          background-size: 80px 140px;
          background-position: 0 0, 0 0, 40px 70px, 40px 70px;
          pointer-events: none;
        }
      `}</style>
      <div className="hero-pattern relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Pakistan Ka Future Starts Here
          </h1>
          <p className="max-w-xl text-lg text-white/80 sm:text-xl">
            Join Sir Azan Coaching Center — Expert teachers, proven results
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
        <div className="flex-1">
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-white/10 text-white/60 backdrop-blur-sm">
            Hero Image
          </div>
        </div>
      </div>
    </section>
  );
}
