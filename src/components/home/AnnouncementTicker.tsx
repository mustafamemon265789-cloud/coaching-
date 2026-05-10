import { Megaphone } from "lucide-react";

const announcements = [
  "📢 New session starting soon! Enroll now for 2026-27",
  "🎯 98% success rate in board exams this year",
  "🏆 Congratulations to our toppers!",
  "📚 Free trial classes available for new students",
  "⭐ Special discount on early admissions",
];

export default function AnnouncementTicker() {
  return (
    <div className="flex items-center gap-4 overflow-hidden bg-amber-50 py-3">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex shrink-0 items-center gap-3 pl-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white">
          <Megaphone className="h-4 w-4" />
        </div>
        <span className="whitespace-nowrap text-sm font-semibold text-secondary">Updates:</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...announcements, ...announcements].map((text, i) => (
            <span key={i} className="text-sm font-medium text-text-dark">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
