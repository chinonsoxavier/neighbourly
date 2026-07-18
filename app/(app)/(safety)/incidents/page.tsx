"use client";

import { IncidentCard } from "@/components/safety/incident-card";
import { EmptyState } from "@/components/common/empty-state";
import { AlertTriangle, Map, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Incident } from "@/lib/types";

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
    description: "Dangerous pothole forming near the roundabout. Multiple vehicles damaged.",
    severity: 2, status: "REPORTED", wardId: "1", centerLat: 6.44, centerLng: 3.43,
    mergedCount: 1, media: [], statusUpdates: [], isAnonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "3", category: "MEDICAL_EMERGENCY", title: "Medical emergency at Lekki Mall",
    description: "Someone has collapsed near the food court. Paramedics are on the way.",
    severity: 4, status: "RESPONDED", wardId: "1", centerLat: 6.43, centerLng: 3.45,
    mergedCount: 2, media: [], statusUpdates: [], isAnonymous: false,
    reporter: { id: "u3", displayName: "Fatima K.", trustTier: "VERIFIED_RESIDENT" },
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), updatedAt: new Date().toISOString(),
  },
];

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Safety Incidents</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Active incidents in your ward area
          </p>
        </div>
        <Link href="/report">
          <Button className="rounded-xl gap-2">
            <AlertTriangle className="size-4" />
            Report Incident
          </Button>
        </Link>
      </div>

      {/* View toggle */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-xl bg-primary/10 text-primary px-4 py-2 text-sm font-medium">
          <List className="size-4" />
          List
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
          <Map className="size-4" />
          Map
        </button>
      </div>

      {/* Map placeholder */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 h-64 flex items-center justify-center">
        <div className="text-center">
          <Map className="size-8 text-teal-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Interactive map view</p>
          <p className="text-xs text-muted-foreground mt-1">Showing {demoIncidents.length} incidents in your area</p>
        </div>
      </div>

      {/* Incident list */}
      <div className="space-y-4">
        {demoIncidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
}
