"use client";

import { StatusStepper } from "@/components/safety/status-stepper";
import { UserAvatar } from "@/components/common/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Share2,
  Bookmark,
  Flag,
  ShieldCheck,
  Eye,
  Upload,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

export default function IncidentDetailPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Back */}
      <Link
        href="/incidents"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to incidents
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-card warm-glow-md overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="rounded-full bg-coral-100 text-coral-700 dark:bg-coral-900/30 dark:text-coral-400">
                  Fire
                </Badge>
                <Badge className="rounded-full bg-coral-200 text-coral-800 dark:bg-coral-800 dark:text-coral-200">
                  Severity 5 — Life-threatening
                </Badge>
              </div>
              <h1 className="text-xl font-bold leading-snug">
                Fire reported near Admiralty Way
              </h1>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            A fire has broken out near the petrol station on Admiralty Way. Fire service has been contacted. Smoke is visible from several blocks away. Please avoid the area if possible.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>Lekki Phase 1, Admiralty Way</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>12 minutes ago</span>
            </div>
          </div>

          {/* Reporter */}
          <div className="flex items-center gap-3">
            <UserAvatar name="Adebayo O." size="md" />
            <div>
              <p className="text-sm font-medium">Adebayo O.</p>
              <p className="text-xs text-muted-foreground">Verified Resident · 12 min ago</p>
            </div>
          </div>

          {/* Media placeholder */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-muted h-40 flex items-center justify-center">
              <Eye className="size-5 text-muted-foreground" />
            </div>
            <div className="rounded-xl bg-muted h-40 flex items-center justify-center">
              <Eye className="size-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Status stepper */}
        <div className="p-6">
          <h3 className="text-sm font-semibold mb-4">Status</h3>
          <StatusStepper currentStatus="VERIFIED" />
        </div>

        <Separator />

        {/* Actions */}
        <div className="p-6 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <ShieldCheck className="size-4" />
            Verify
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <Share2 className="size-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <Bookmark className="size-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-coral-600 dark:text-coral-400">
            <Flag className="size-4" />
            Dispute
          </Button>
        </div>
      </div>

      {/* Tracking ID */}
      <div className="rounded-2xl border border-border bg-warm-100/50 dark:bg-warm-900/10 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Tracking ID</p>
          <p className="text-sm font-mono font-semibold">INC-2026-0847</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Reported by</p>
          <p className="text-sm font-medium">3 people</p>
        </div>
      </div>

      {/* Comments / Updates */}
      <div className="rounded-2xl border border-border bg-card p-6 warm-glow-md space-y-4">
        <h3 className="text-sm font-semibold">Updates & Comments</h3>

        {/* Comment input */}
        <div className="flex gap-3">
          <UserAvatar name="You" size="sm" />
          <div className="flex-1">
            <textarea
              placeholder="Add an update or comment..."
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <div className="flex justify-end mt-2">
              <Button size="sm" className="rounded-xl gap-1.5">
                <MessageSquare className="size-3.5" />
                Comment
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Sample comments */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <UserAvatar name="Fatima K." size="sm" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Fatima K.</span>
                <span className="text-xs text-muted-foreground">5 min ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                I can see the smoke from my window. Fire trucks just arrived!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30 text-xs font-bold text-teal-600 dark:text-teal-400 shrink-0">
              ✓
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-teal-600 dark:text-teal-400">System</span>
                <span className="text-xs text-muted-foreground">8 min ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Incident verified by Fatima K. and 2 other residents. Status changed to <strong>Verified</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
