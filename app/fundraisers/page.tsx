"use client";

import { useState } from "react";
import { useAppStore, useModalStore } from "@/store";
import { FundraiserFeedCard } from "@/components/feed/fundraiser-feed-card";
import { Heart, Plus, Sparkles, Filter, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | "Emergency" | "Community" | "Family" | "Health";

export default function FundraisersPage() {
  const { fundraisers, currentLocation } = useAppStore();
  const { openCreateModal, openDonateModal } = useModalStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const totalRaised = fundraisers.reduce((acc, f) => acc + f.raised, 0);
  const totalDonors = fundraisers.reduce((acc, f) => acc + f.donors, 0);

  const filteredFundraisers = fundraisers.filter(
    (f) => selectedCategory === "all" || f.category === selectedCategory
  );

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-pink-600 dark:text-pink-400">
            MUTUAL AID & CAMPAIGNS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Neighborhood Fundraisers
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Support local families in need, disaster relief, parks, and school projects in <b className="text-foreground">{currentLocation}</b>.
          </p>
        </div>

        <Button
          onClick={() => openCreateModal("fundraiser")}
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-pink-500/25 px-5 h-9"
        >
          <Plus className="size-4 mr-1.5 stroke-[2.5]" /> Start Fundraiser
        </Button>
      </div>

      {/* Stats Spotlight Banner */}
      <div className="rounded-3xl border border-pink-200/80 dark:border-pink-900/60 bg-gradient-to-r from-pink-50/80 via-purple-50/60 to-pink-50/80 dark:from-pink-950/40 dark:via-purple-950/30 dark:to-pink-950/40 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-pink-700 dark:text-pink-300">
            <Sparkles className="size-4" />
            <span>Community Relief Impact</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-foreground">
            ${totalRaised.toLocaleString()}{" "}
            <span className="text-xs font-semibold text-muted-foreground">raised together</span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
          <div className="rounded-2xl bg-card/80 p-3 border border-border">
            <p className="text-base sm:text-lg font-black text-primary">{totalDonors}</p>
            <p className="text-[10px] text-muted-foreground">Generous Donors</p>
          </div>
          <div className="rounded-2xl bg-card/80 p-3 border border-border">
            <p className="text-base sm:text-lg font-black text-pink-600 dark:text-pink-400">
              {fundraisers.length}
            </p>
            <p className="text-[10px] text-muted-foreground">Active Causes</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
        {[
          { id: "all", label: "All Fundraisers" },
          { id: "Emergency", label: "🚨 Emergency Relief" },
          { id: "Community", label: "🌳 Community Projects" },
          { id: "Family", label: "👨‍👩‍👧 Family Support" },
          { id: "Health", label: "🩺 Medical Care" },
        ].map((tab) => {
          const active = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
              className={cn(
                "rounded-2xl px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all",
                active
                  ? "bg-pink-600 text-white shadow-xs"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Fundraiser Cards Grid */}
      <div className="space-y-4">
        {filteredFundraisers.map((f) => (
          <FundraiserFeedCard key={f.id} fundraiser={f} />
        ))}
      </div>
    </div>
  );
}
