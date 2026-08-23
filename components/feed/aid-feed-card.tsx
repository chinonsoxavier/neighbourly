"use client";

import { useState } from "react";
import { type AidRequest } from "@/store";
import { HandHeart, Clock, MapPin, CheckCircle2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AidFeedCardProps {
  aid: AidRequest;
}

export function AidFeedCard({ aid }: AidFeedCardProps) {
  const [offered, setOffered] = useState(false);

  return (
    <div className="rounded-3xl border border-teal-200/80 dark:border-teal-900/50 bg-card p-5 sm:p-6 shadow-xs warm-glow space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400">
            <HandHeart className="size-4" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Mutual Aid Request · {aid.type}
            </span>
            <p className="text-[11px] text-muted-foreground">{aid.neighbor}</p>
          </div>
        </div>

        <span
          className={cn(
            "text-xs font-bold px-2.5 py-0.5 rounded-full capitalize",
            aid.urgency === "high"
              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
              : "bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 border border-teal-200/60"
          )}
        >
          {aid.urgency} urgency
        </span>
      </div>

      {/* Title & Summary */}
      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
          {aid.title}
        </h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {aid.summary}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
          <Clock className="size-3.5" /> Posted {aid.postedAt}
        </span>

        <Button
          onClick={() => setOffered(!offered)}
          size="sm"
          className={cn(
            "rounded-2xl font-bold text-xs px-5 h-8.5 transition-all",
            offered
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-500/20"
          )}
        >
          {offered ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5" /> Help Offered ✓
            </span>
          ) : (
            "Offer to Help"
          )}
        </Button>
      </div>
    </div>
  );
}
