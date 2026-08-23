"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore, useModalStore } from "@/store";
import { IncidentFeedCard } from "@/components/feed/incident-feed-card";
import {
  AlertTriangle,
  Map,
  List,
  Plus,
  ShieldCheck,
  Flame,
  Radio,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SeverityFilter = "all" | "high" | "medium" | "low" | "resolved";

export default function IncidentsPage() {
  const { incidents, currentLocation } = useAppStore();
  const { openCreateModal } = useModalStore();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");

  const filteredIncidents = incidents.filter((inc) => {
    if (severityFilter === "all") return true;
    if (severityFilter === "resolved") return inc.status === "resolved";
    return inc.severity === severityFilter;
  });

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
            SAFETY & EMERGENCY NETWORK
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Neighborhood Incidents
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Live reports, weather alerts, and responder actions in <b className="text-foreground">{currentLocation}</b>.
          </p>
        </div>

        <Button
          onClick={() => openCreateModal("incident")}
          className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/25 px-5 h-9"
        >
          <AlertTriangle className="size-4 mr-1.5 stroke-[2.5]" /> Report Incident
        </Button>
      </div>

      {/* Filter & View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {[
            { id: "all", label: "All Reports" },
            { id: "high", label: "🚨 Urgent Alerts" },
            { id: "medium", label: "⚠️ Heads Up" },
            { id: "low", label: "ℹ️ Low / Info" },
            { id: "resolved", label: "✓ Resolved" },
          ].map((tab) => {
            const active = severityFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSeverityFilter(tab.id as SeverityFilter)}
                className={cn(
                  "rounded-2xl px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all",
                  active
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle (List / Map) */}
        <div className="flex items-center rounded-2xl bg-muted/60 p-1 border border-border">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition-all",
              viewMode === "list"
                ? "bg-card text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="size-3.5" /> List
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition-all",
              viewMode === "map"
                ? "bg-card text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Map className="size-3.5" /> Map View
          </button>
        </div>
      </div>

      {/* Map View Interactive Simulation */}
      {viewMode === "map" && (
        <div className="relative rounded-3xl border border-border/80 bg-gradient-to-br from-purple-50 via-slate-50 to-rose-50 dark:from-purple-950/20 dark:via-slate-900/30 dark:to-rose-950/20 h-96 overflow-hidden flex items-center justify-center shadow-xs">
          {/* Simulated Map Grid Lines */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8d3bc9_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Interactive Incident Pins on Map */}
          {incidents.slice(0, 4).map((inc, index) => {
            const positions = [
              "top-1/4 left-1/3",
              "top-1/2 left-2/3",
              "bottom-1/4 left-1/2",
              "top-1/3 right-1/4",
            ];
            const isUrgent = inc.severity === "high" || inc.severity === "critical";

            return (
              <div
                key={inc.id}
                className={cn(
                  "absolute flex items-center gap-2 rounded-2xl p-2 bg-card/95 border shadow-xl backdrop-blur-md transition-transform hover:scale-105 cursor-pointer max-w-xs",
                  positions[index % positions.length],
                  isUrgent ? "border-rose-300 ring-4 ring-rose-500/20" : "border-amber-300"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-xl text-white shrink-0 shadow-xs",
                    isUrgent ? "bg-rose-600" : "bg-amber-600"
                  )}
                >
                  <AlertTriangle className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{inc.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{inc.location}</p>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-4 right-4 rounded-2xl bg-card/90 backdrop-blur px-3 py-1.5 border text-xs font-semibold text-muted-foreground shadow-md">
            📍 Showing {filteredIncidents.length} active neighborhood pins
          </div>
        </div>
      )}

      {/* Incident List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <IncidentFeedCard key={incident.id} incident={incident} />
        ))}

        {filteredIncidents.length === 0 && (
          <div className="py-16 text-center text-muted-foreground space-y-2">
            <p className="text-sm">No incidents match this filter.</p>
            <Button
              onClick={() => setSeverityFilter("all")}
              variant="outline"
              className="rounded-xl text-xs"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
