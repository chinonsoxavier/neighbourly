"use client";

import { use } from "react";
import Link from "next/link";
import { useAppStore } from "@/store";
import { PostComposer } from "@/components/feed/post-composer";
import { SocialPostCard } from "@/components/feed/social-post-card";
import {
  Users,
  ShieldCheck,
  Calendar,
  ArrowLeft,
  Check,
  Plus,
  Share2,
  Sparkles,
  MapPin,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CommunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.id;
  const { communities, toggleJoinCommunity, posts, events } = useAppStore();

  const community =
    communities.find((c) => c.slug === slug || c.id === slug) ||
    communities[0];

  const communityPosts = posts.filter(
    (p) => !p.communitySlug || p.communitySlug === community.slug
  );

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        href="/communities"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to all communities
      </Link>

      {/* Community Hero Header */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs">
        {/* Banner */}
        <div className="relative h-44 sm:h-56 w-full bg-muted overflow-hidden">
          <img
            src={community.cover}
            alt={community.name}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {community.verified && (
            <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-emerald-500 text-white px-3 py-1 text-xs font-bold shadow-md">
              <ShieldCheck className="size-3.5" /> Official Ward Community
            </span>
          )}
        </div>

        {/* Content & Action Bar */}
        <div className="p-6 relative space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4 -mt-16 sm:-mt-20">
            {/* Emoji Avatar */}
            <div className="size-20 sm:size-24 rounded-3xl bg-card border-4 border-card text-4xl sm:text-5xl flex items-center justify-center shadow-xl">
              {community.emoji}
            </div>

            {/* Join / Leave & Share */}
            <div className="flex items-center gap-2 pt-1 sm:pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="rounded-2xl gap-1.5 text-xs font-bold"
              >
                <Share2 className="size-3.5" /> Share
              </Button>

              <Button
                onClick={() => toggleJoinCommunity(community.id)}
                size="sm"
                className={cn(
                  "rounded-2xl text-xs font-bold px-6 shadow-md transition-all",
                  community.isJoined
                    ? "bg-emerald-600 hover:bg-rose-600 text-white"
                    : "bg-primary text-primary-foreground shadow-purple-500/25"
                )}
              >
                {community.isJoined ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="size-3.5" /> Member ✓
                  </span>
                ) : (
                  "Join Community"
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {community.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-semibold">
              <span className="text-purple-600 dark:text-purple-400">
                {community.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="size-3.5" /> {community.members.toLocaleString()} members
              </span>
              <span>·</span>
              <span>Public Community</span>
            </div>
          </div>

          <p className="text-sm text-foreground/85 leading-relaxed max-w-2xl">
            {community.blurb}
          </p>
        </div>
      </div>

      {/* 2-Column Section: Feed & Sidebar info */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-4">
          <PostComposer />

          <div className="space-y-4 pt-2">
            {communityPosts.map((post) => (
              <SocialPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-4">
          {/* About & Guidelines Card */}
          <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-foreground">Community Rules</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>Be respectful and welcoming to all neighbors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>Keep posts relevant to this group's focus.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>No spam or unverified commercial solicitation.</span>
              </li>
            </ul>
          </div>

          {/* Upcoming Events for this group */}
          <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Group Events</h3>
              <Link href="/events" className="text-xs font-semibold text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-2.5">
              {events.slice(0, 2).map((ev) => (
                <div key={ev.id} className="p-2.5 rounded-2xl bg-muted/40 text-xs space-y-1">
                  <p className="font-bold text-foreground">{ev.title}</p>
                  <p className="text-muted-foreground">{ev.date} · {ev.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
