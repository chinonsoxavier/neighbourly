"use client";

import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Flame,
  UserPlus,
  Heart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const trendingTopics = [
  { label: "Road repairs on Admiralty Way", count: 23 },
  { label: "Community cleanup this Saturday", count: 18 },
  { label: "New security patrol schedule", count: 15 },
];

const suggestedCommunities = [
  { name: "Lekki Moms", members: 342 },
  { name: "Tech Professionals", members: 891 },
  { name: "Fitness & Wellness", members: 567 },
];

export function RightPanel({ className }: { className?: string }) {
  return (
    <aside className={cn("w-72 shrink-0 hidden xl:block space-y-6", className)}>
      {/* Trending */}
      <div className="rounded-2xl border border-border bg-card p-5 warm-glow">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="size-4 text-primary" />
          <h3 className="text-sm font-semibold">Trending Nearby</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <div
              key={topic.label}
              className="flex items-center justify-between group cursor-pointer"
            >
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                {topic.label}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Flame className="size-3" />
                {topic.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested communities */}
      <div className="rounded-2xl border border-border bg-card p-5 warm-glow">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="size-4 text-teal-500" />
          <h3 className="text-sm font-semibold">Suggested Communities</h3>
        </div>
        <div className="space-y-3">
          {suggestedCommunities.map((community) => (
            <div
              key={community.name}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">{community.name}</p>
                <p className="text-xs text-muted-foreground">
                  {community.members} members
                </p>
              </div>
              <button className="text-xs font-medium text-primary hover:underline">
                Join
              </button>
            </div>
          ))}
          <Link
            href="/communities"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            Discover more
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>

      {/* Quick Impact Stats */}
      <div className="rounded-2xl border border-border bg-card p-5 warm-glow">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="size-4 text-coral-500" />
          <h3 className="text-sm font-semibold">Your Impact</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-warm-100 dark:bg-warm-900/30 p-3 text-center">
            <p className="text-xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Reports Filed</p>
          </div>
          <div className="rounded-xl bg-teal-100 dark:bg-teal-900/30 p-3 text-center">
            <p className="text-xl font-bold text-teal-600 dark:text-teal-400">47</p>
            <p className="text-xs text-muted-foreground">People Helped</p>
          </div>
          <div className="rounded-xl bg-coral-100 dark:bg-coral-900/30 p-3 text-center">
            <p className="text-xl font-bold text-coral-600 dark:text-coral-400">3</p>
            <p className="text-xs text-muted-foreground">Incidents Verified</p>
          </div>
          <div className="rounded-xl bg-warm-100 dark:bg-warm-900/30 p-3 text-center">
            <p className="text-xl font-bold text-warm-600 dark:text-warm-400">8</p>
            <p className="text-xs text-muted-foreground">Day Streak 🔥</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
