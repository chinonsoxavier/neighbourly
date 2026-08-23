"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store";
import { neighborById } from "@/lib/data";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Send,
  PhoneCall,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { incidents, respondToIncident } = useAppStore();
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState([
    { id: "1", author: "Devon Park", text: "City public works crew just arrived on site with barricades.", time: "15m ago" },
    { id: "2", author: "Tomás Reyes", text: "Directing traffic around 4th street — take Pine Ave instead.", time: "8m ago" },
  ]);

  const incident =
    incidents.find((i) => i.id === id) || incidents[0];
  const reporter = neighborById(incident.reporterId);
  const isUrgent = incident.severity === "high" || incident.severity === "critical";

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentsList([
      ...commentsList,
      { id: `c_${Date.now()}`, author: "Maria Alvarez", text: commentText.trim(), time: "Just now" },
    ]);
    setCommentText("");
  };

  return (
    <div className="space-y-6 select-none max-w-3xl mx-auto">
      {/* Back button */}
      <Link
        href="/incidents"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to Incidents
      </Link>

      {/* Main Incident Card */}
      <div className="rounded-3xl border border-rose-200/80 dark:border-rose-900/50 bg-card p-6 shadow-xs space-y-5">
        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                isUrgent
                  ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                  : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
              )}
            >
              {isUrgent ? "🚨 Urgent" : "⚠️ Heads up"} · {incident.type}
            </span>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground capitalize">
              Status: {incident.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="rounded-xl text-xs font-bold"
            >
              <Share2 className="size-3.5 mr-1" /> Share
            </Button>
            <Button
              onClick={() => respondToIncident(incident.id)}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
            >
              I Can Assist ({incident.responders})
            </Button>
          </div>
        </div>

        {/* Title & Summary */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            {incident.title}
          </h1>
          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
            {incident.summary}
          </p>
        </div>

        {/* Media */}
        {incident.cover && (
          <div className="rounded-2xl overflow-hidden max-h-80 border border-border">
            <img src={incident.cover} alt={incident.title} className="w-full h-72 object-cover" />
          </div>
        )}

        {/* Location & Reporter details */}
        <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-muted/40 border border-border/80 text-xs">
          <div className="flex items-center gap-2.5">
            <MapPin className="size-4 text-rose-500 shrink-0" />
            <div>
              <span className="font-bold text-foreground block">Location</span>
              <span className="text-muted-foreground">{incident.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <img src={reporter.avatar} alt={reporter.name} className="size-7 rounded-full object-cover shrink-0" />
            <div>
              <span className="font-bold text-foreground block">{reporter.name}</span>
              <span className="text-muted-foreground">{reporter.neighborhood} · Verified Resident</span>
            </div>
          </div>
        </div>

        {/* Verified Timeline Updates */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Response & Verified Timeline
          </h3>
          <div className="space-y-2 border-l-2 border-purple-200 dark:border-purple-800 ml-2 pl-4">
            {incident.timeline?.map((step, idx) => (
              <div key={idx} className="relative text-xs">
                <span className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                <span className="font-mono text-[11px] font-bold text-primary mr-2">{step.time}</span>
                <span className="font-medium text-foreground">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Discussion & Comments */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" />
            <h3 className="text-sm font-bold">Community Discussion ({commentsList.length})</h3>
          </div>

          <div className="space-y-2.5">
            {commentsList.map((c) => (
              <div key={c.id} className="p-3 rounded-2xl bg-muted/30 border border-border text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{c.author}</span>
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-foreground/90">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Post a safety update or coordination note..."
              className="flex-1 rounded-xl border border-border bg-card px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button type="submit" size="sm" className="rounded-xl px-4 text-xs font-bold">
              <Send className="size-3.5 mr-1" /> Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
