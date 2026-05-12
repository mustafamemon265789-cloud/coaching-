import { Megaphone } from "lucide-react";
import { getHomeAnnouncements } from "@/lib/db";

export default async function AnnouncementTicker() {
  const announcements = await getHomeAnnouncements();
  const items = announcements.length > 0
    ? announcements
    : ["New session starting soon! Enroll now for 2026-27", "98% success rate in board exams this year"];

  return (
    <div className="flex items-center gap-4 overflow-hidden bg-amber-50 py-3">
      <div className="flex shrink-0 items-center gap-3 pl-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white">
          <Megaphone className="h-4 w-4" />
        </div>
        <span className="whitespace-nowrap text-sm font-semibold text-secondary">Updates:</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...items, ...items].map((text, i) => (
            <span key={i} className="text-sm font-medium text-text-dark">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
