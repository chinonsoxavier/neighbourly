"use client";

import { useAppStore, } from "@/store";
import { neighborById, Poll } from "@/lib/data";
import { Vote, Check, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PollFeedCardProps {
  poll: Poll;
}

export function PollFeedCard({ poll }: PollFeedCardProps) {
  const { userVotedPolls, votePoll } = useAppStore();
  const author = neighborById(poll.authorId);
  const selectedOptionId = userVotedPolls[poll.id];

  return (
    <div className="rounded-3xl border border-amber-200/80 dark:border-amber-900/50 bg-card p-5 sm:p-6 shadow-xs warm-glow space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
            <Vote className="size-4" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Community Poll · {poll.category}
            </span>
            <p className="text-[11px] text-muted-foreground">Proposed by {author.name}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
          <Clock className="size-3" /> {poll.endsAt}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
        {poll.question}
      </h3>
      {poll.description && (
        <p className="text-xs text-muted-foreground leading-relaxed">{poll.description}</p>
      )}

      {/* Options & Votes */}
      <div className="space-y-2 pt-1">
        {poll.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const percentage =
            poll.totalVotes > 0
              ? Math.round((opt.votes / poll.totalVotes) * 100)
              : 0;

          return (
            <button
              key={opt.id}
              onClick={() => votePoll(poll.id, opt.id)}
              className={cn(
                "relative w-full text-left rounded-2xl border p-3.5 transition-all overflow-hidden group focus:outline-none",
                isSelected
                  ? "border-amber-400 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-400/40"
                  : "border-border hover:border-amber-300 bg-muted/30 hover:bg-muted/60"
              )}
            >
              {/* Animated Progress Fill */}
              <div
                className={cn(
                  "absolute top-0 bottom-0 left-0 transition-all duration-500 rounded-2xl",
                  isSelected
                    ? "bg-amber-200/50 dark:bg-amber-900/40"
                    : "bg-muted group-hover:bg-amber-100/40 dark:group-hover:bg-amber-950/20"
                )}
                style={{ width: `${percentage}%` }}
              />

              {/* Text & Percentage */}
              <div className="relative flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "size-4 rounded-full border flex items-center justify-center text-[10px]",
                      isSelected
                        ? "border-amber-600 bg-amber-600 text-white"
                        : "border-muted-foreground/40"
                    )}
                  >
                    {isSelected && <Check className="size-3" />}
                  </div>
                  <span className="text-foreground">{opt.label}</span>
                </div>
                <span className="text-muted-foreground font-mono font-bold shrink-0">
                  {percentage}% ({opt.votes})
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 font-semibold text-foreground/80">
          <Users className="size-3.5 text-amber-600" />
          {poll.totalVotes} neighbor votes
        </span>
        <span className="font-medium text-[11px]">
          {selectedOptionId ? "✓ You voted" : "Click an option to cast your vote"}
        </span>
      </div>
    </div>
  );
}
