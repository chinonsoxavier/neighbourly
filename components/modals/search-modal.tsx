"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore, useAppStore } from "@/store";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Search,
  Users,
  AlertTriangle,
  Heart,
  Calendar,
  Vote,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { neighbors } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SearchModal() {
  const router = useRouter();
  const { searchModalOpen, closeSearchModal, toggleSearchModal } = useModalStore();
  const { communities, incidents, fundraisers, events, polls } = useAppStore();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "communities" | "incidents" | "fundraisers" | "events">("all");

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearchModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearchModal]);

  const q = query.toLowerCase().trim();

  // Search Results
  const filteredCommunities = communities.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.blurb.toLowerCase().includes(q)
  );

  const filteredIncidents = incidents.filter(
    (i) => !q || i.title.toLowerCase().includes(q) || i.location.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q)
  );

  const filteredFundraisers = fundraisers.filter(
    (f) => !q || f.title.toLowerCase().includes(q) || f.story.toLowerCase().includes(q)
  );

  const filteredEvents = events.filter(
    (e) => !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
  );

  const filteredNeighbors = neighbors.filter(
    (n) => !q || n.name.toLowerCase().includes(q) || n.neighborhood.toLowerCase().includes(q)
  );

  const navigateTo = (url: string) => {
    closeSearchModal();
    setQuery("");
    router.push(url);
  };

  return (
    <Dialog open={searchModalOpen} onOpenChange={(open) => !open && closeSearchModal()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden rounded-3xl border border-purple-100 dark:border-purple-900/40 bg-card shadow-2xl gap-0">
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20">
          <Search className="size-5 text-purple-600 dark:text-purple-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search neighbors, incidents, fundraisers, events, communities..."
            className="flex-1 bg-transparent text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md bg-muted"
            >
              Clear
            </button>
          )}
          <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded border border-border bg-muted/60 hidden sm:inline-block">
            ESC
          </span>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-border/60 bg-muted/10 overflow-x-auto">
          {(["all", "communities", "incidents", "fundraisers", "events"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold capitalize transition-all",
                filter === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* COMMUNITIES */}
          {(filter === "all" || filter === "communities") && filteredCommunities.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2">
                Communities ({filteredCommunities.length})
              </span>
              <div className="space-y-1">
                {filteredCommunities.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigateTo(`/communities/${c.slug}`)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-950/30 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="size-9 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-base flex items-center justify-center">
                        {c.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {c.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{c.blurb}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-1">
                      {c.members.toLocaleString()} members
                      <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INCIDENTS */}
          {(filter === "all" || filter === "incidents") && filteredIncidents.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2">
                Incidents & Safety ({filteredIncidents.length})
              </span>
              <div className="space-y-1">
                {filteredIncidents.slice(0, 3).map((i) => (
                  <div
                    key={i.id}
                    onClick={() => navigateTo(`/incidents/${i.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="size-9 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                        <AlertTriangle className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-rose-600 transition-colors">
                          {i.title}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                          <MapPin className="size-3" /> {i.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 capitalize shrink-0">
                      {i.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FUNDRAISERS */}
          {(filter === "all" || filter === "fundraisers") && filteredFundraisers.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2">
                Fundraisers ({filteredFundraisers.length})
              </span>
              <div className="space-y-1">
                {filteredFundraisers.slice(0, 3).map((f) => (
                  <div
                    key={f.id}
                    onClick={() => navigateTo(`/fundraisers`)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-pink-50 dark:hover:bg-pink-950/30 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="size-9 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                        <Heart className="size-4 fill-current" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-pink-600 transition-colors">
                          {f.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          ${f.raised.toLocaleString()} raised of ${f.goal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary shrink-0">
                      {Math.round((f.raised / f.goal) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS */}
          {(filter === "all" || filter === "events") && filteredEvents.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2">
                Events ({filteredEvents.length})
              </span>
              <div className="space-y-1">
                {filteredEvents.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    onClick={() => navigateTo(`/events`)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="size-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-base flex items-center justify-center">
                        {e.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-blue-600 transition-colors">
                          {e.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {e.date} · {e.time}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {e.attendees} going
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEIGHBORS */}
          {filter === "all" && filteredNeighbors.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2">
                Neighbors ({filteredNeighbors.length})
              </span>
              <div className="space-y-1">
                {filteredNeighbors.slice(0, 3).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => navigateTo(`/profile/me`)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-muted/70 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={n.avatar} alt={n.name} className="size-9 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {n.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {n.handle} · {n.neighborhood}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold shrink-0">
                      ⚡ {n.reputation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {filteredCommunities.length === 0 &&
            filteredIncidents.length === 0 &&
            filteredFundraisers.length === 0 &&
            filteredEvents.length === 0 &&
            filteredNeighbors.length === 0 && (
              <div className="py-12 text-center text-muted-foreground space-y-2">
                <p className="text-sm">No matches found for "{query}"</p>
                <p className="text-xs">Try searching for neighborhoods, road hazards, park cleanups, or fundraisers.</p>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
