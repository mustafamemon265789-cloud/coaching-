import {
  GraduationCap,
  IndianRupee,
  Building2,
  Award,
  Users,
  ClipboardCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    description: "Highly qualified teachers with years of experience in their subjects",
  },
  {
    icon: IndianRupee,
    title: "Affordable Fee",
    description: "Quality education at fees that every family can afford",
  },
  {
    icon: Building2,
    title: "3 Branches",
    description: "Conveniently located branches across the city",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "98% success rate with students securing top positions",
  },
  {
    icon: Users,
    title: "Small Batch Size",
    description: "Personalized attention with limited students per batch",
  },
  {
    icon: ClipboardCheck,
    title: "Regular Tests",
    description: "Weekly tests and monthly exams to track progress",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-background px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-text-dark sm:text-4xl">Why Choose Us</h2>
          <p className="mt-3 text-text-muted">
            What makes Sir Azan Coaching Center the right choice for your future
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:border-secondary"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text-dark">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
