"use client";

import { useAppStore, } from "@/store";
import { Calendar, MapPin, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventItem } from "@/lib/data";

interface EventFeedCardProps {
  event: EventItem;
}

export function EventFeedCard({ event }: EventFeedCardProps) {
  const { userRsvpEvents, rsvpEvent } = useAppStore();
  const isGoing = userRsvpEvents[event.id] === "going";

  return (
    <div className="rounded-3xl border border-blue-200/80 dark:border-blue-900/50 bg-card p-5 sm:p-6 shadow-xs warm-glow space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-xl shadow-2xs">
            {event.emoji}
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Community Event
            </span>
            <p className="text-[11px] text-muted-foreground">Hosted by {event.organizer}</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60">
          {event.date} · {event.time}
        </span>
      </div>

      {/* Title & Location */}
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
          {event.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
          <MapPin className="size-3.5 text-blue-600 dark:text-blue-400" />
          <span>{event.location}</span>
        </p>
      </div>

      {/* Footer & RSVP action */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <Users className="size-3.5 text-blue-600" />
          {event.attendees} neighbors attending
        </span>

        <Button
          onClick={() => rsvpEvent(event.id, isGoing ? "declined" : "going")}
          size="sm"
          className={cn(
            "rounded-2xl font-bold text-xs px-5 h-8.5 transition-all",
            isGoing
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
          )}
        >
          {isGoing ? (
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5" /> Going ✓
            </span>
          ) : (
            "RSVP to Attend"
          )}
        </Button>
      </div>
    </div>
  );
}
