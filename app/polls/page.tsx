"use client";

import { useState } from "react";
import { useAppStore, useModalStore } from "@/store";
import { PollFeedCard } from "@/components/feed/poll-feed-card";
import { Vote, Plus, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PollsPage() {
  const { polls, currentLocation } = useAppStore();
  const { openCreateModal } = useModalStore();
  const [filter, setFilter] = useState<"all" | "open" | "Civic" | "Community">("all");

  const filteredPolls = polls.filter((p) => {
    if (filter === "all") return true;
    if (filter === "open") return p.status === "open";
    return p.category === filter;
  });

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
            CIVIC & NEIGHBORHOOD DEMOCRACY
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Community Polls & Voting
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Have your say in neighborhood decisions, civic improvements, and events in <b className="text-foreground">{currentLocation}</b>.
          </p>
        </div>

        <Button
          onClick={() => openCreateModal("poll")}
          className="rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/25 px-5 h-9"
        >
          <Plus className="size-4 mr-1.5 stroke-[2.5]" /> Create Poll
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
        {[
          { id: "all", label: "All Polls" },
          { id: "Civic", label: "🏛️ Civic / Council" },
          { id: "Community", label: "🌳 Neighborhood Decisions" },
          { id: "open", label: "🟢 Active Voting" },
        ].map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={cn(
                "rounded-2xl px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all",
                active
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Poll Cards List */}
      <div className="space-y-4">
        {filteredPolls.map((poll) => (
          <PollFeedCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
}
