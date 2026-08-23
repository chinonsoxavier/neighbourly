"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store";
import {
  Users,
  Search,
  Plus,
  Compass,
  Check,
  ShieldCheck,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type CommunityFilter = "all" | "local" | "global" | "joined";
type CategoryFilter = "all" | "Neighborhood" | "Hobby" | "Cause" | "Interest";

export default function CommunitiesPage() {
  const { communities, toggleJoinCommunity, addCommunity, currentLocation } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [scopeFilter, setScopeFilter] = useState<CommunityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Create Community form state
  const [name, setName] = useState("");
  const [blurb, setBlurb] = useState("");
  const [category, setCategory] = useState<"Neighborhood" | "Hobby" | "Cause" | "Interest">("Neighborhood");
  const [emoji, setEmoji] = useState("🏘️");
  const [cover, setCover] = useState("");

  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !blurb.trim()) return;

    addCommunity({
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      blurb: blurb.trim(),
      emoji: emoji || "👥",
      category,
      cover: cover.trim() || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
      verified: false,
    });

    setName("");
    setBlurb("");
    setCreateModalOpen(false);
  };

  const filteredCommunities = communities.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.blurb.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScope =
      scopeFilter === "all" ||
      (scopeFilter === "joined" && c.isJoined) ||
      (scopeFilter === "local" && c.category === "Neighborhood") ||
      (scopeFilter === "global" && c.category !== "Neighborhood");

    const matchesCategory =
      categoryFilter === "all" || c.category === categoryFilter;

    return matchesSearch && matchesScope && matchesCategory;
  });

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
            CONNECT & DISCOVER
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Communities
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Join local neighborhood wards, global interest groups, and civic clubs.
          </p>
        </div>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="rounded-2xl bg-gradient-to-r from-[#8d3bc9] to-[#a94ee1] hover:from-[#7b30b1] hover:to-[#9a45d4] text-white font-bold text-xs shadow-md shadow-purple-500/25 px-5 h-9"
        >
          <Plus className="size-4 mr-1.5 stroke-[2.5]" /> Create Community
        </Button>
      </div>

      {/* Search & Scope Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search communities by name, topic, neighborhood..."
            className="pl-11 h-11 rounded-2xl bg-card border-border/80 text-sm placeholder:text-muted-foreground"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {/* Scope Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {[
              { id: "all", label: "All Communities" },
              { id: "local", label: "Local Neighborhoods" },
              { id: "global", label: "Global / Interest" },
              { id: "joined", label: "My Communities" },
            ].map((tab) => {
              const active = scopeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setScopeFilter(tab.id as CommunityFilter)}
                  className={cn(
                    "rounded-2xl px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
            className="h-8 rounded-xl border border-border bg-card px-2.5 text-xs font-semibold text-muted-foreground focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Neighborhood">Neighborhood</option>
            <option value="Hobby">Hobby</option>
            <option value="Cause">Cause & Relief</option>
            <option value="Interest">Interest & Parenting</option>
          </select>
        </div>
      </div>

      {/* Community Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredCommunities.map((c) => (
          <div
            key={c.id}
            className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs hover:border-purple-200 dark:hover:border-purple-800 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Cover Image Banner */}
              <div className="relative h-28 w-full overflow-hidden bg-muted">
                <img
                  src={c.cover}
                  alt={c.name}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 size-10 rounded-2xl bg-white/90 dark:bg-card/90 backdrop-blur-md text-xl flex items-center justify-center shadow-md">
                  {c.emoji}
                </span>
                {c.verified && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-emerald-500/90 text-white px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-md">
                    <ShieldCheck className="size-3" /> Verified
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-4 space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/communities/${c.slug}`}
                      className="text-base font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {c.name}
                    </Link>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                    {c.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {c.blurb}
                </p>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-4 pb-4 pt-2 border-t border-border/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Users className="size-3.5" /> {c.members.toLocaleString()} members
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/communities/${c.slug}`}
                  className="text-xs font-bold text-muted-foreground hover:text-foreground px-2 py-1 rounded-xl"
                >
                  View
                </Link>
                <Button
                  onClick={() => toggleJoinCommunity(c.id)}
                  size="sm"
                  variant={c.isJoined ? "outline" : "default"}
                  className={cn(
                    "rounded-xl text-xs h-8 font-bold px-3.5",
                    c.isJoined
                      ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {c.isJoined ? (
                    <span className="flex items-center gap-1">
                      <Check className="size-3" /> Joined
                    </span>
                  ) : (
                    "Join"
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCommunities.length === 0 && (
        <div className="py-16 text-center text-muted-foreground space-y-2">
          <p className="text-sm">No communities found matching your filters.</p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setScopeFilter("all");
              setCategoryFilter("all");
            }}
            variant="outline"
            className="rounded-xl text-xs"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Create Community Dialog */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-md p-6 rounded-3xl border border-purple-100 dark:border-purple-900/40 bg-card shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create a Community</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Start a new local ward circle, special interest hub, or volunteer group.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateCommunity} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="comm-name">Community Name</Label>
              <Input
                id="comm-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Riverside Bookworms & Coffee"
                className="rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="comm-emoji" className="text-xs">Emoji</Label>
                <Input
                  id="comm-emoji"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  className="rounded-xl text-center text-lg"
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="comm-cat" className="text-xs">Category</Label>
                <select
                  id="comm-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none"
                >
                  <option value="Neighborhood">Local Neighborhood</option>
                  <option value="Hobby">Hobby / Activity</option>
                  <option value="Cause">Cause & Mutual Aid</option>
                  <option value="Interest">Interest & Parenting</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="comm-desc">Description</Label>
              <Textarea
                id="comm-desc"
                value={blurb}
                onChange={(e) => setBlurb(e.target.value)}
                placeholder="What is this community about? Who should join?"
                rows={3}
                className="rounded-2xl text-xs resize-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="comm-cover" className="text-xs">Cover Image URL (Optional)</Label>
              <Input
                id="comm-cover"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="rounded-xl text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCreateModalOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-primary-foreground px-6 font-bold">
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
