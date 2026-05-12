"use client";

import { useEffect, useState } from "react";
import { getHomeStats } from "@/lib/db";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-4xl font-bold text-secondary">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    getHomeStats().then(setStats);
  }, []);

  const items = stats.length > 0 ? stats : [
    { value: 1200, suffix: "+", label: "Students Enrolled" },
    { value: 98, suffix: "%", label: "Success Rate" },
    { value: 3, suffix: "", label: "Branches" },
    { value: 10, suffix: "+", label: "Years of Excellence" },
  ];

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-6 rounded-xl bg-white px-6 py-8 shadow-lg sm:px-12 lg:grid-cols-4">
        {items.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center space-y-1 text-center">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <span className="text-sm text-text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
