"use client";

import { useState } from "react";
import { useAppStore, useAuthStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sparkles,
  ShieldCheck,
  Award,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function CommunityScoreBadge() {
  const [open, setOpen] = useState(false);
  const { communityScore, currentLocation } = useAppStore();
  const { user } = useAuthStore();

  return (
    <>
      {/* Clickable Badge in Header matching reference image */}
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="flex items-center gap-1.5 rounded-full border border-purple-200/80 dark:border-purple-800/80 bg-purple-50/80 dark:bg-purple-950/60 px-3.5 py-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 shadow-xs transition-all cursor-pointer group"
      >
        <Sparkles className="size-3.5 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
        <span>Community score {communityScore}</span>
      </button>

      {/* Trust & Community Score Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-3xl border border-purple-100 dark:border-purple-900/40 bg-card shadow-2xl">
          <div className="bg-gradient-to-br from-[#8d3bc9] to-[#5f218d] p-6 text-white text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-2 shadow-inner">
              <ShieldCheck className="size-8 text-emerald-300" />
            </div>
            <DialogTitle className="text-2xl font-black text-white">
              {communityScore} / 100
            </DialogTitle>
            <p className="text-xs font-semibold text-purple-200 uppercase tracking-wider mt-0.5">
              Verified Resident Tier · {currentLocation}
            </p>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your Community Score reflects your active participation, verified identity, and mutual aid contributions in <b className="text-foreground">{currentLocation}</b>.
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Resident Identity Verification</span>
                  <span className="text-emerald-600 font-mono">100% (+30 pts)</span>
                </div>
                <Progress value={100} className="h-2 bg-muted" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Helpful Incident Reports (12 verified)</span>
                  <span className="text-purple-600 font-mono">92% (+28 pts)</span>
                </div>
                <Progress value={92} className="h-2 bg-muted" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Civic Voting & Mutual Aid</span>
                  <span className="text-blue-600 font-mono">70% (+28 pts)</span>
                </div>
                <Progress value={70} className="h-2 bg-muted" />
              </div>
            </div>

            <div className="rounded-2xl bg-muted/50 p-3.5 border border-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Award className="size-4 text-amber-500" />
                <span>Earned Badges</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {user.badges.map((b) => (
                  <span
                    key={b}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-card border border-border text-foreground/90"
                  >
                    ★ {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
