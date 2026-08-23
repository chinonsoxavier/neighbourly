"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { StepIndicator } from "@/components/safety/category-grid";
import {
  Flame,
  Heart,
  Car,
  CloudRain,
  UserSearch,
  Construction,
  ShieldAlert,
  MessageCircleWarning,
  MapPin,
  Upload,
  Eye,
  ChevronRight,
  ChevronLeft,
  Check,
  Shield,
  Camera,
  Info,
} from "lucide-react";

const categories = [
  { id: "fire", label: "Fire", icon: Flame, color: "coral" },
  { id: "medical", label: "Medical", icon: Heart, color: "coral" },
  { id: "accident", label: "Accident", icon: Car, color: "warm" },
  { id: "flood", label: "Flood / Weather", icon: CloudRain, color: "teal" },
  { id: "missing", label: "Missing Person", icon: UserSearch, color: "warm" },
  { id: "infrastructure", label: "Infrastructure", icon: Construction, color: "warm" },
  { id: "crime", label: "Crime", icon: ShieldAlert, color: "coral" },
  { id: "safety", label: "Safety Concern", icon: MessageCircleWarning, color: "warm", reviewed: true },
];

const severityLabels = ["Minor", "Moderate", "Significant", "Severe", "Life-threatening"];

const TOTAL_STEPS = 5;
const stepNames = ["Category", "Location", "Details", "Media", "Review"];

export default function ReportPage() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<string | null>(null);
  const [severity, setSeverity] = useState(3);
  const [anonymous, setAnonymous] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Report an Incident</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Help keep your community safe by reporting what you see.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all shrink-0",
                i < step && "bg-teal-500 text-white",
                i === step && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                i > step && "bg-muted text-muted-foreground"
              )}
            >
              {i < step ? <Check className="size-3.5" /> : i + 1}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div className={cn("flex-1 h-0.5 mx-1 rounded-full transition-all", i < step ? "bg-teal-500" : "bg-muted")} />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground -mt-2">
        <span>{stepNames[step]}</span>
        <span>Step {step + 1} of {TOTAL_STEPS}</span>
      </div>

      {/* Step 1: Category */}
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">What type of incident?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const selected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center",
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <cat.icon className={cn("size-6", selected && "text-primary")} />
                  <span className="text-xs font-medium">{cat.label}</span>
                  {cat.reviewed && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Info className="size-2.5" />
                      Reviewed
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Location */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Where is this happening?</h2>
          <div className="rounded-2xl border border-border bg-linear-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 h-56 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="size-8 text-teal-500 mx-auto mb-2 animate-bounce" />
              <p className="text-sm text-muted-foreground">Drag pin to set exact location</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Address (optional)</label>
            <input
              type="text"
              placeholder="Enter address manually"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Describe what&apos;s happening</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Brief, descriptive title"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              placeholder="Provide details — what, where, when, who is involved..."
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          {/* Severity slider */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Severity</label>
            <div className="flex gap-2">
              {severityLabels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setSeverity(i + 1)}
                  className={cn(
                    "flex-1 rounded-xl border-2 py-2 text-xs font-medium transition-all text-center",
                    severity === i + 1
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {i + 1} — {label}
                </button>
              ))}
            </div>
          </div>

          {/* Anonymity toggle */}
          <label className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="sr-only peer"
              />
              <div className="size-10 rounded-full bg-muted peer-checked:bg-primary transition-colors" />
              <div className="absolute top-1 left-1 size-8 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-2" />
            </div>
            <div>
              <p className="text-sm font-medium">Report anonymously</p>
              <p className="text-xs text-muted-foreground">Your name won&apos;t be shown, but our safety team can still see it.</p>
            </div>
          </label>
        </div>
      )}

      {/* Step 4: Media */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Add photos or videos</h2>
          <p className="text-sm text-muted-foreground">
            Up to 5 files. Images are compressed before upload.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <Upload className="size-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Upload</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Review your report</h2>
          <div className="rounded-2xl border border-border bg-card p-6 warm-glow-md space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-5 text-primary" />
              <span className="font-medium">{category ? categories.find((c) => c.id === category)?.label : "Unknown"}</span>
              <span className="ml-auto text-xs text-muted-foreground">Severity {severity}</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Sample incident title</p>
              <p className="text-sm text-muted-foreground">Sample description goes here...</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              <span>Lekki Phase 1</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Eye className="size-3" />
              <span>{anonymous ? "Anonymous" : "Your name will be visible"}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-warm-100 dark:bg-warm-900/20 text-xs text-warm-700 dark:text-warm-300">
            <Info className="size-4 shrink-0 mt-0.5" />
            <p>By submitting, you confirm this report is accurate to the best of your knowledge. False reports may result in account restrictions.</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-xl gap-1"
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
        {step < TOTAL_STEPS - 1 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 0 && !category}
            className="rounded-xl gap-1"
          >
            Continue
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button className="rounded-xl gap-1">
            Submit Report
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// Reuse step indicator pattern
function StepIndicator() {
  return null;
}
