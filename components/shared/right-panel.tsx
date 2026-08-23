"use client";

import Link from "next/link";
import { useModalStore, useAppStore } from "@/store";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Flame,
  Calendar,
  Heart,
  ArrowRight,
  ShieldCheck,
  Users,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function RightPanel({ className }: { className?: string }) {
  const { openDonateModal } = useModalStore();
  const { incidents, fundraisers, events, userRsvpEvents, rsvpEvent } = useAppStore();

  const activeFundraiser = fundraisers[0]; // Nguyen family

  return (
    <aside className={cn("w-80 shrink-0 hidden xl:block space-y-5 select-none", className)}>
      {/* 1. Trending Nearby Widget */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-bold tracking-tight">Trending nearby</h3>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-rose-100 dark:bg-rose-900/40 px-2.5 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="space-y-2.5">
          {incidents.slice(0, 3).map((inc) => {
            const isHigh = inc.severity === "high" || inc.severity === "critical";
            return (
              <Link
                key={inc.id}
                href={`/incidents/${inc.id}`}
                className="group block p-2 rounded-2xl hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-[11px] mb-1">
                  <span
                    className={cn(
                      "font-bold",
                      isHigh
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-amber-600 dark:text-amber-400"
                    )}
                  >
                    {isHigh ? "Urgent" : "Heads up"}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground capitalize">{inc.type}</span>
                </div>
                <p className="text-xs font-semibold text-foreground/90 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {inc.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. Upcoming Events Widget */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold tracking-tight">Upcoming events</h3>
          </div>
          <Link
            href="/events"
            className="text-[11px] font-semibold text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="space-y-3">
          {events.slice(0, 3).map((event) => {
            const isRsvpd = userRsvpEvents[event.id] === "going";
            return (
              <div
                key={event.id}
                className="flex items-center justify-between gap-2 p-1.5 rounded-2xl hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="size-9 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-base flex items-center justify-center shrink-0 shadow-2xs">
                    {event.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">
                      {event.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {event.date} · {event.time}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => rsvpEvent(event.id, isRsvpd ? "declined" : "going")}
                  className={cn(
                    "rounded-xl px-2.5 py-1 text-[11px] font-semibold transition-all shrink-0",
                    isRsvpd
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-muted hover:bg-primary hover:text-white text-muted-foreground"
                  )}
                >
                  {isRsvpd ? (
                    <span className="flex items-center gap-1">
                      <Check className="size-3" /> Going
                    </span>
                  ) : (
                    "RSVP"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Active Fundraiser Spotlight Widget (matching reference) */}
      {activeFundraiser && (
        <div className="rounded-3xl border border-purple-200/80 dark:border-purple-900/60 bg-gradient-to-b from-card to-purple-50/40 dark:to-purple-950/20 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Active Fundraiser
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300">
              {activeFundraiser.daysLeft} days left
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-32 border border-border">
            <img
              src={activeFundraiser.cover}
              alt={activeFundraiser.title}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <p className="text-xs font-bold line-clamp-1">{activeFundraiser.title}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-primary">${activeFundraiser.raised.toLocaleString()}</span>
              <span className="text-muted-foreground">Goal: ${activeFundraiser.goal.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{
                  width: `${Math.min(
                    100,
                    (activeFundraiser.raised / activeFundraiser.goal) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          <Button
            onClick={() => openDonateModal(activeFundraiser.id)}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 h-9"
          >
            <Heart className="size-3.5 mr-1.5 fill-current" /> Donate to Support
          </Button>
        </div>
      )}

      {/* 4. Your Impact Stats Widget */}
      <div className="rounded-3xl border border-border/80 bg-card p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-emerald-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Your Community Impact
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 p-2.5">
            <p className="text-lg font-bold text-primary">12</p>
            <p className="text-[10px] text-muted-foreground font-medium">Reports Filed</p>
          </div>
          <div className="rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 p-2.5">
            <p className="text-lg font-bold text-teal-600 dark:text-teal-400">47</p>
            <p className="text-[10px] text-muted-foreground font-medium">People Helped</p>
          </div>
          <div className="rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 p-2.5">
            <p className="text-lg font-bold text-rose-600 dark:text-rose-400">3</p>
            <p className="text-[10px] text-muted-foreground font-medium">Verified Alert</p>
          </div>
          <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 p-2.5">
            <p className="text-lg font-bold text-amber-600 dark:text-amber-400">8</p>
            <p className="text-[10px] text-muted-foreground font-medium">Day Streak 🔥</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
