"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { getTestimonials, type Testimonial as DbTestimonial } from "@/lib/db";

interface Testimonial {
  name: string;
  achievement: string;
  classLevel: string;
  quote: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    name: "Ayesha Khan",
    achievement: "Secured 1st Position in Board Exams",
    classLevel: "Class 12 (Pre-Medical)",
    quote: "Sir Azan Coaching Center transformed my academic journey. The teachers are incredibly supportive and the regular test system helped me stay on track.",
  },
  {
    name: "Bilal Ahmed",
    achievement: "Scored 92% in Pre-Engineering",
    classLevel: "Class 12 (Pre-Engineering)",
    quote: "The small batch sizes meant I got personal attention whenever I struggled with a concept. The faculty goes above and beyond.",
  },
  {
    name: "Fatima Ali",
    achievement: "Top in City - Arts Group",
    classLevel: "Class 12 (Arts)",
    quote: "I was hesitant about joining a coaching center, but this place felt like a second home. Highly recommended!",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getTestimonials().then((data) => {
      const visible = data.filter((t) => t.visible)
      if (visible.length > 0) {
        setTestimonials(visible.map((t) => ({
          name: t.student_name,
          achievement: t.achievement,
          classLevel: t.class_level,
          quote: t.quote,
        })))
      }
    })
  }, []);

  const items = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="bg-background px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-text-dark sm:text-4xl">What Our Students Say</h2>
          <p className="mt-3 text-text-muted">
            Hear from students who achieved their dreams with us
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-xl bg-white p-8 shadow sm:p-12">
            <Quote className="absolute left-6 top-6 h-10 w-10 text-secondary/20" />
            <p className="relative z-10 mb-8 mt-4 text-lg leading-relaxed text-text-dark">
              &ldquo;{items[active].quote}&rdquo;
            </p>
            <div className="border-t border-gray-100 pt-6">
              <p className="font-semibold text-text-dark">{items[active].name}</p>
              <p className="text-sm font-medium text-secondary">{items[active].achievement}</p>
              <p className="text-xs text-text-muted">{items[active].classLevel}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === active ? "bg-secondary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
