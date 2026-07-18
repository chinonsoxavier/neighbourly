"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/common/avatar";
import { StatusStepper } from "@/components/safety/status-stepper";
import {
  Flame,
  Heart,
  Car,
  CloudRain,
  UserSearch,
  Construction,
  ShieldAlert,
  MessageCircleWarning,
  MessageSquare,
  MapPin,
  Clock,
  Eye,
} from "lucide-react";
import type { Incident } from "@/lib/types";

const categoryIcons: Record<string, typeof Flame> = {
  FIRE: Flame,
  MEDICAL_EMERGENCY: Heart,
  ACCIDENT: Car,
  FLOOD_WEATHER: CloudRain,
  MISSING_PERSON: UserSearch,
  INFRASTRUCTURE_HAZARD: Construction,
  CRIME_IN_PROGRESS: ShieldAlert,
  COMMUNITY_SAFETY_CONCERN: MessageCircleWarning,
};

const severityColors: Record<number, string> = {
  1: "bg-warm-200 text-warm-700 dark:bg-warm-800 dark:text-warm-200",
  2: "bg-warm-200 text-warm-700 dark:bg-warm-800 dark:text-warm-200",
  3: "bg-teal-200 text-teal-700 dark:bg-teal-800 dark:text-teal-200",
  4: "bg-coral-200 text-coral-700 dark:bg-coral-800 dark:text-coral-200",
  5: "bg-coral-200 text-coral-700 dark:bg-coral-800 dark:text-coral-200",
};

interface IncidentCardProps {
  incident: Incident;
  className?: string;
}

export function IncidentCard({ incident, className }: IncidentCardProps) {
  const Icon = categoryIcons[incident.category] || ShieldAlert;
  const timeAgo = getTimeAgo(incident.createdAt);

  return (
    <Link
      href={`/incidents/${incident.id}`}
      className={cn("block rounded-2xl border border-border bg-card card-safety warm-glow-md overflow-hidden", className)}
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-5 pt-4 pb-2">
        <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", severityColors[incident.severity])}>
          <Icon className="size-3" />
          Severity {incident.severity}
        </div>
        {incident.status === "DISPUTED" && (
          <span className="rounded-full bg-coral-100 text-coral-700 dark:bg-coral-900/30 dark:text-coral-400 px-2.5 py-1 text-xs font-semibold">
            Disputed
          </span>
        )}
        <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" />
          {timeAgo}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-4 space-y-3">
        <h3 className="text-base font-semibold leading-snug">{incident.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{incident.description}</p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          <span>Your ward area</span>
        </div>

        {/* Media thumbnail */}
        {incident.media.length > 0 && (
          <div className="flex gap-2">
            {incident.media.slice(0, 3).map((m) => (
              <div key={m.id} className="size-16 rounded-lg bg-muted overflow-hidden">
                <div className="size-full bg-gradient-to-br from-warm-100 to-warm-200 dark:from-warm-800 dark:to-warm-900 flex items-center justify-center">
                  <Eye className="size-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Status stepper */}
        <StatusStepper currentStatus={incident.status} className="pt-2" />

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            {incident.isAnonymous ? (
              <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                ?
              </div>
            ) : incident.reporter ? (
              <UserAvatar name={incident.reporter.displayName} size="xs" />
            ) : null}
            <span className="text-xs text-muted-foreground">
              {incident.isAnonymous ? "Anonymous" : incident.reporter?.displayName ?? "Unknown"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1 text-xs">
              <MessageSquare className="size-3.5" />
              {incident.statusUpdates.length}
            </span>
            <span className="flex items-center gap-1 text-xs">
              {incident.mergedCount > 1 && `${incident.mergedCount} reports`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function getTimeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
