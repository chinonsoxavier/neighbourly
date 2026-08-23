"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore, useAuthStore } from "@/store";
import { PostComposer } from "@/components/feed/post-composer";
import { IncidentFeedCard } from "@/components/feed/incident-feed-card";
import { SocialPostCard } from "@/components/feed/social-post-card";
import { PollFeedCard } from "@/components/feed/poll-feed-card";
import { FundraiserFeedCard } from "@/components/feed/fundraiser-feed-card";
import { EventFeedCard } from "@/components/feed/event-feed-card";
import { AidFeedCard } from "@/components/feed/aid-feed-card";
import { CommunityScoreBadge } from "@/components/feed/community-score-dialog";
import {
  AlertTriangle,
  TrendingUp,
  Heart,
  Calendar,
  Sparkles,
  Flame,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeedFilter = "for-you" | "my-block" | "city-wide" | "alerts" | "polls" | "fundraisers";

export default function FeedPage() {
  const [filter, setFilter] = useState<FeedFilter>("for-you");
  const {
    currentLocation,
    posts,
    incidents,
    fundraisers,
    polls,
    events,
    aidRequests,
  } = useAppStore();
  const { user } = useAuthStore();

  // Active items counts for the top 4 metric cards
  const activeIncidentsCount = incidents.filter((i) => i.status === "active" || i.status === "responding").length;
  const aidRequestsCount = aidRequests.length;
  const totalFundraised = fundraisers.reduce((acc, f) => acc + f.raised, 0);
  const upcomingEventsCount = events.length;

  return (
    <div className="space-y-6 select-none max-w-3x">
      {/* ── 1. Header Greeting & Community Score (matching reference) ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
            {currentLocation}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Good morning, {user.name.split(" ")[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            3 things happening on your block this morning.
          </p>
        </div>

        {/* Community Score Badge */}
        <CommunityScoreBadge />
      </div>

      {/* ── 2. Top 4 Metric Cards (matching reference image) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Active incidents */}
        <button
          type="button"
          onClick={() => setFilter("alerts")}
          className={cn(
            "rounded-3xl border p-4 text-left transition-all group focus:outline-none",
            filter === "alerts"
              ? "border-rose-300 bg-rose-50/70 dark:bg-rose-950/40 ring-2 ring-rose-300"
              : "border-border/80 bg-card hover:border-rose-200 hover:bg-rose-50/20 shadow-2xs"
          )}
        >
          <div className="flex items-center justify-between text-muted-foreground mb-1.5">
            <span className="text-[11px] font-semibold">Active incidents</span>
            <span className="flex size-6 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="size-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-foreground">{activeIncidentsCount}</p>
          <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">+1 today</p>
        </button>

        {/* Card 2: Aid requests */}
        <Link
          href="/aid-requests"
          className="rounded-3xl border border-border/80 bg-card p-4 text-left hover:border-amber-200 hover:bg-amber-50/20 shadow-2xs transition-all group"
        >
          <div className="flex items-center justify-between text-muted-foreground mb-1.5">
            <span className="text-[11px] font-semibold">Aid requests</span>
            <span className="flex size-6 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
              <TrendingUp className="size-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-foreground">{aidRequestsCount}</p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">2 urgent</p>
        </Link>

        {/* Card 3: Fundraisers */}
        <button
          type="button"
          onClick={() => setFilter("fundraisers")}
          className={cn(
            "rounded-3xl border p-4 text-left transition-all group focus:outline-none",
            filter === "fundraisers"
              ? "border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-300"
              : "border-border/80 bg-card hover:border-emerald-200 hover:bg-emerald-50/20 shadow-2xs"
          )}
        >
          <div className="flex items-center justify-between text-muted-foreground mb-1.5">
            <span className="text-[11px] font-semibold">Fundraisers</span>
            <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-foreground">
            ${(totalFundraised).toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">raised this week</p>
        </button>

        {/* Card 4: Upcoming events */}
        <Link
          href="/events"
          className="rounded-3xl border border-border/80 bg-card p-4 text-left hover:border-purple-200 hover:bg-purple-50/20 shadow-2xs transition-all group"
        >
          <div className="flex items-center justify-between text-muted-foreground mb-1.5">
            <span className="text-[11px] font-semibold">Upcoming events</span>
            <span className="flex size-6 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
              <Calendar className="size-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-foreground">{upcomingEventsCount}</p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5">Next: Sat 4PM</p>
        </Link>
      </div>

      {/* ── 3. Feed Filter Tabs (matching reference image) ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "for-you", label: "For you" },
          { id: "my-block", label: "My block" },
          { id: "city-wide", label: "City-wide" },
          { id: "alerts", label: "Alerts" },
          { id: "polls", label: "Polls" },
          { id: "fundraisers", label: "Fundraisers" },
        ].map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as FeedFilter)}
              className={cn(
                "rounded-2xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all",
                active
                  ? "bg-card text-foreground shadow-xs border border-purple-200 dark:border-purple-800"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── 4. Interactive Post Composer ── */}
      <PostComposer />

      {/* ── 5. Main Feed Stream ── */}
      <div className="space-y-4 pt-1">
        {/* Alerts view only */}
        {filter === "alerts" && (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <IncidentFeedCard key={incident.id} incident={incident} />
            ))}
          </div>
        )}

        {/* Polls view only */}
        {filter === "polls" && (
          <div className="space-y-4">
            {polls.map((poll) => (
              <PollFeedCard key={poll.id} poll={poll} />
            ))}
          </div>
        )}

        {/* Fundraisers view only */}
        {filter === "fundraisers" && (
          <div className="space-y-4">
            {fundraisers.map((fundraiser) => (
              <FundraiserFeedCard key={fundraiser.id} fundraiser={fundraiser} />
            ))}
          </div>
        )}

        {/* General / For You / My Block / City-wide mixed feed */}
        {(filter === "for-you" || filter === "my-block" || filter === "city-wide") && (
          <>
            {/* Primary Incident Alert (matching reference top card) */}
            {incidents.length > 0 && (
              <IncidentFeedCard incident={incidents[3] || incidents[0]} />
            )}

            {/* Social Lifestyle Post (matching Hana Sato duck pond card) */}
            {posts.length > 0 && (
              <SocialPostCard post={posts[0]} />
            )}

            {/* Community Fundraiser Card */}
            {fundraisers.length > 0 && (
              <FundraiserFeedCard fundraiser={fundraisers[0]} />
            )}

            {/* Interactive Poll Card */}
            {polls.length > 0 && (
              <PollFeedCard poll={polls[0]} />
            )}

            {/* Mutual Aid Request Card */}
            {aidRequests.length > 0 && (
              <AidFeedCard aid={aidRequests[0]} />
            )}

            {/* Event Card */}
            {events.length > 0 && (
              <EventFeedCard event={events[0]} />
            )}

            {/* Second Social Post */}
            {posts.length > 1 && (
              <SocialPostCard post={posts[1]} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
