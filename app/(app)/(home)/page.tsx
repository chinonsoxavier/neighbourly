"use client";

import { motion } from "framer-motion";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingState } from "@/components/common/loading-state";
import { IncidentCard } from "@/components/safety/incident-card";
import { PostCard } from "@/components/community/post-card";
import { Bell, TrendingUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import type { Incident, Post } from "@/lib/types";

// Demo data
const demoIncidents: Incident[] = [
  {
    id: "1", category: "FIRE", title: "Fire reported near Admiralty Way",
    description: "A fire has broken out near the petrol station on Admiralty Way. Fire service has been contacted.",
    severity: 5, status: "VERIFIED", wardId: "1", centerLat: 6.44, centerLng: 3.42,
    mergedCount: 3, media: [], statusUpdates: [], isAnonymous: false,
    reporter: { id: "u1", displayName: "Adebayo O.", trustTier: "VERIFIED_RESIDENT" },
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "2", category: "INFRASTRUCTURE_HAZARD", title: "Large pothole on Admiralty Way",
    description: "Dangerous pothole forming near the roundabout. Multiple vehicles have been damaged.",
    severity: 2, status: "REPORTED", wardId: "1", centerLat: 6.44, centerLng: 3.43,
    mergedCount: 1, media: [], statusUpdates: [], isAnonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), updatedAt: new Date().toISOString(),
  },
];

const demoPosts: Post[] = [
  {
    id: "p1", communityId: "c1",
    community: { id: "c1", type: "LOCAL", name: "Lekki Phase 1", slug: "lekki", memberCount: 120, requiresApproval: false, createdAt: "" },
    author: { id: "u2", displayName: "Chidinma M.", trustTier: "VERIFIED_RESIDENT" },
    body: "Has anyone noticed the new security patrol on Admiralty Way? They seem really active this week. Great to see!",
    media: [], reactionCount: 12, commentCount: 4, isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "p2", communityId: "c1",
    community: { id: "c1", type: "LOCAL", name: "Lekki Phase 1", slug: "lekki", memberCount: 120, requiresApproval: false, createdAt: "" },
    author: { id: "u3", displayName: "Emeka N.", trustTier: "TRUSTED_CONTRIBUTOR" },
    body: "Reminder: Community cleanup this Saturday at 8 AM. Meet at the park entrance. Bring gloves and bags!",
    media: [], reactionCount: 24, commentCount: 8, isPinned: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Emergency bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-coral-100 dark:bg-coral-900/20 border border-coral-200 dark:border-coral-800/40 px-4 py-3 flex items-center gap-3"
      >
        <span className="relative flex size-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-400 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-coral-500" />
        </span>
        <p className="text-sm font-medium text-coral-800 dark:text-coral-200 flex-1">
          2 active incidents nearby
        </p>
        <Link href="/incidents" className="text-sm text-coral-600 dark:text-coral-300 font-semibold hover:underline">
          View all →
        </Link>
      </motion.div>

      {/* Feed tabs */}
      <Tabs defaultValue="all">
        <TabsList className="rounded-xl bg-muted p-1">
          <TabsTrigger value="all" className="rounded-lg text-sm">All</TabsTrigger>
          <TabsTrigger value="safety" className="rounded-lg text-sm">Safety</TabsTrigger>
          <TabsTrigger value="community" className="rounded-lg text-sm">Community</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content */}
      <div className="space-y-4">
        {/* Pinned post */}
        {demoPosts.filter((p) => p.isPinned).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* Incidents */}
        <div className="space-y-3">
          {demoIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {demoPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
