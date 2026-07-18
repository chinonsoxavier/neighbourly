"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Heart,
  Camera,
  Bell,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
  Shield,
  ShoppingBag,
  Calendar,
  Utensils,
  Baby,
  Trophy,
  Laptop,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Gamepad2,
  Trees,
  Sparkles,
} from "lucide-react";

const TOTAL_STEPS = 5;

const interests = [
  { id: "security", label: "Security", icon: Shield },
  { id: "buy_sell", label: "Buy & Sell", icon: ShoppingBag },
  { id: "events", label: "Events", icon: Calendar },
  { id: "food", label: "Food & Dining", icon: Utensils },
  { id: "parenting", label: "Parenting", icon: Baby },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "tech", label: "Technology", icon: Laptop },
  { id: "health", label: "Health", icon: HeartPulse },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "nature", label: "Nature", icon: Trees },
];

const stepLabels = ["Location", "Interests", "Profile", "Notifications", "Invite"];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all shrink-0",
              i < current && "bg-primary text-primary-foreground",
              i === current && "bg-primary text-primary-foreground ring-4 ring-primary/20",
              i > current && "bg-muted text-muted-foreground"
            )}
          >
            {i < current ? <Check className="size-3.5" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-1 rounded-full transition-all",
                i < current ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-primary" />
          <span>Step {step + 1} of {TOTAL_STEPS}</span>
        </div>
        <span className="text-sm font-medium text-primary">{stepLabels[step]}</span>
      </div>

      <StepIndicator current={step} total={TOTAL_STEPS} />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="location"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/30 mb-4">
                <MapPin className="size-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold">Where do you live?</h2>
              <p className="text-sm text-muted-foreground mt-2">
                We&apos;ll find your local ward and connect you with neighbors nearby.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 warm-glow space-y-4">
              <div className="h-48 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="size-8 text-teal-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Map preview</p>
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter your address or neighborhood"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <Button className="w-full rounded-xl gap-2" variant="outline">
                <MapPin className="size-4" />
                Use my current location
              </Button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="interests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-warm-100 dark:bg-warm-900/30 mb-4">
                <Heart className="size-8 text-warm-600 dark:text-warm-400" />
              </div>
              <h2 className="text-2xl font-bold">What interests you?</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Pick at least 3 so we can suggest the right communities.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {interests.map((item) => {
                const selected = selectedInterests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                      selected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card hover:border-primary/40"
                    )}
                  >
                    <item.icon className="size-6" />
                    <span className="text-xs font-medium">{item.label}</span>
                    {selected && <Check className="size-3 text-primary" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-warm-100 dark:bg-warm-900/30 mb-4">
                <Camera className="size-8 text-warm-600 dark:text-warm-400" />
              </div>
              <h2 className="text-2xl font-bold">Set up your profile</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Help neighbors recognize you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="size-24 rounded-full bg-warm-100 dark:bg-warm-900/30 flex items-center justify-center">
                    <Users className="size-10 text-warm-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Camera className="size-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <input
                  type="text"
                  placeholder="What should we call you?"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Short bio (optional)</label>
                <textarea
                  placeholder="Tell neighbors a bit about yourself..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-coral-100 dark:bg-coral-900/30 mb-4">
                <Bell className="size-8 text-coral-600 dark:text-coral-400" />
              </div>
              <h2 className="text-2xl font-bold">Stay in the loop</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Choose how you&apos;d like to be notified.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Push notifications", desc: "Get alerts on your device", default: true },
                { label: "Email notifications", desc: "Daily digest and important updates", default: true },
                { label: "Incident alerts", desc: "Nearby safety incidents", default: true },
                { label: "Community updates", desc: "New posts and activity", default: false },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="relative">
                    <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                    <div className="size-10 rounded-full bg-muted peer-checked:bg-primary transition-colors" />
                    <div className="absolute top-1 left-1 size-8 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-2" />
                  </div>
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/30 mb-4">
                <Users className="size-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold">Invite your neighbors</h2>
              <p className="text-sm text-muted-foreground mt-2">
                The more people join, the safer and stronger your community becomes.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 warm-glow space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Share this link</label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value="https://neighborly.app/join/lekki-phase-1"
                    className="flex-1 rounded-xl border border-border bg-muted px-4 py-2.5 text-sm font-mono"
                  />
                  <Button className="rounded-xl">Copy</Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or share via</span></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center gap-2 rounded-xl border border-border p-3 text-sm font-medium hover:bg-muted transition-colors">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.557 4.144 1.534 5.886L.06 23.496l5.826-1.534A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-2.004 0-3.876-.536-5.488-1.466l-.393-.233-3.408.897.908-3.32-.26-.406A9.814 9.814 0 0 1 2.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z"/></svg>
                  WhatsApp
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl border border-border p-3 text-sm font-medium hover:bg-muted transition-colors">
                  <Users className="size-4" />
                  Facebook
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl border border-border p-3 text-sm font-medium hover:bg-muted transition-colors">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                  Discord
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              You can always invite neighbors later from your profile.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-6">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-xl gap-1"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        {step < TOTAL_STEPS - 1 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            className="rounded-xl gap-1"
          >
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button className="rounded-xl gap-1 bg-primary">
            Get Started
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
