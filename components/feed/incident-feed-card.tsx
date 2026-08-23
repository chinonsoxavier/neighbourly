"use client";

import Link from "next/link";
import { useAppStore,  } from "@/store";
import { Incident, neighborById } from "@/lib/data";
import {
  AlertTriangle,
  Clock,
  MapPin,
  MessageSquare,
  Users,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IncidentFeedCardProps {
  incident: Incident;
}

export function IncidentFeedCard({ incident }: IncidentFeedCardProps) {
  const { respondToIncident } = useAppStore();
  const reporter = neighborById(incident.reporterId);
  const isUrgent = incident.severity === "high" || incident.severity === "critical";

  return (
    <div className="rounded-3xl border border-rose-200/80 dark:border-rose-900/50 bg-card p-5 sm:p-6 shadow-xs warm-glow space-y-4 hover:border-rose-300 dark:hover:border-rose-800 transition-all">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Urgent / Category Badge */}
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold",
              isUrgent
                ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
            )}
          >
            {isUrgent ? "Urgent" : "Heads up"} · {incident.type}
          </span>

          {/* Status Badge */}
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground capitalize">
            {incident.status}
          </span>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
          <Clock className="size-3.5" />
          <span>07:30 AM</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-2">
        <Link href={`/incidents/${incident.id}`} className="group">
          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-rose-600 transition-colors leading-snug">
            {incident.title}
          </h3>
        </Link>
        <p className="text-sm text-foreground/80 leading-relaxed">{incident.summary}</p>
      </div>

      {/* Optional Photo */}
      {incident.cover && (
        <div className="relative rounded-2xl overflow-hidden max-h-64 border border-border">
          <img src={incident.cover} alt={incident.title} className="w-full h-56 object-cover" />
        </div>
      )}

      {/* Location & Reporter Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/70 text-xs text-muted-foreground">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center gap-1 font-semibold text-foreground/80 truncate">
            <MapPin className="size-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{incident.location}</span>
          </span>

          <span className="hidden sm:inline">·</span>

          <div className="flex items-center gap-1.5 shrink-0">
            <img src={reporter.avatar} alt={reporter.name} className="size-5 rounded-full object-cover" />
            <span className="font-medium text-foreground">{reporter.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-semibold">
          <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
            <Users className="size-3.5" />
            {incident.responders} responders
          </span>

          <span>·</span>

          <Link
            href={`/incidents/${incident.id}`}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <MessageSquare className="size-3.5" />
            {incident.comments} comments
          </Link>

          <Button
            onClick={() => respondToIncident(incident.id)}
            size="sm"
            variant="outline"
            className="rounded-xl h-7 px-2.5 text-xs border-rose-200 text-rose-600 dark:border-rose-800 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 ml-1 font-bold"
          >
            I can help
          </Button>
        </div>
      </div>
    </div>
  );
}
