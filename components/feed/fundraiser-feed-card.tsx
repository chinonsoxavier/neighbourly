"use client";

import { useModalStore, type Fundraiser } from "@/store";
import { neighborById } from "@/lib/data";
import { Heart, Users, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FundraiserFeedCardProps {
  fundraiser: Fundraiser;
}

export function FundraiserFeedCard({ fundraiser }: FundraiserFeedCardProps) {
  const { openDonateModal } = useModalStore();
  const organizer = neighborById(fundraiser.organizerId);
  const percentage = Math.min(100, Math.round((fundraiser.raised / fundraiser.goal) * 100));

  return (
    <div className="rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card p-5 sm:p-6 shadow-xs warm-glow space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400">
            <Heart className="size-4 fill-current" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300">
              Community Fundraiser · {fundraiser.category}
            </span>
            <p className="text-[11px] text-muted-foreground">Organized by {organizer.name}</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 border border-pink-200/60">
          {fundraiser.daysLeft} days left
        </span>
      </div>

      {/* Title & Story */}
      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
          {fundraiser.title}
        </h3>
        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
          {fundraiser.story}
        </p>
      </div>

      {/* Cover Image */}
      {fundraiser.cover && (
        <div className="relative rounded-2xl overflow-hidden h-52 border border-border">
          <img
            src={fundraiser.cover}
            alt={fundraiser.title}
            className="size-full object-cover"
          />
        </div>
      )}

      {/* Progress Bar & Stats */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between items-baseline text-xs sm:text-sm">
          <div>
            <span className="text-base sm:text-lg font-bold text-primary">
              ${fundraiser.raised.toLocaleString()}
            </span>
            <span className="text-muted-foreground ml-1.5 font-medium">
              raised of ${fundraiser.goal.toLocaleString()} goal
            </span>
          </div>
          <span className="font-bold text-pink-600 dark:text-pink-400 font-mono">
            {percentage}%
          </span>
        </div>

        <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Actions & Donors */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <Users className="size-3.5 text-primary" />
          {fundraiser.donors} generous neighbors donated
        </span>

        <Button
          onClick={() => openDonateModal(fundraiser.id)}
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-purple-500/25 px-5 h-9"
        >
          <Heart className="size-3.5 mr-1.5 fill-current" /> Donate Now
        </Button>
      </div>
    </div>
  );
}
