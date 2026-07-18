"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 gradient-warm-hero" />

      {/* Soft decorative blobs */}
      <div className="absolute top-20 -left-32 size-96 rounded-full bg-warm-300/30 dark:bg-warm-700/10 blur-3xl" />
      <div className="absolute bottom-20 -right-32 size-96 rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-coral-200/20 dark:bg-coral-800/10 blur-3xl" />

      <div className="relative max-width mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-black/20 backdrop-blur-sm border border-white/40 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-warm-700 dark:text-warm-300 mb-8">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-teal-500" />
              </span>
              Your neighborhood, connected
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-warm-900 dark:text-warm-50">
              Your Neighborhood.{" "}
              <span className="text-primary">Stronger Together.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-warm-700 dark:text-warm-300 leading-relaxed max-w-xl">
              Report incidents, connect with neighbors, and build the community you
              deserve. From safety alerts to local events — everything that matters,
              right where you live.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="rounded-2xl gap-2 px-8 text-base font-semibold h-12 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all">
                  Join Your Community
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-8 text-base h-12 border-warm-300 dark:border-warm-700 bg-white/50 dark:bg-black/10 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/20"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex items-center gap-6 text-sm text-warm-600 dark:text-warm-400">
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-teal-500" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-4 text-teal-500" />
                <span>Free for residents</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="size-4 text-coral-500" />
                <span>Built with care</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Illustration placeholder with composed Lucide icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Background card */}
              <div className="w-[440px] h-[400px] rounded-3xl bg-white/60 dark:bg-black/10 backdrop-blur-xl border border-white/40 dark:border-white/10 warm-glow-lg p-8">
                {/* Map illustration */}
                <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20 flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="size-20 rounded-2xl bg-teal-500/20 flex items-center justify-center">
                      <Shield className="size-10 text-teal-600 dark:text-teal-400" />
                    </div>
                    {/* Incident dots */}
                    <div className="absolute -top-2 -right-3 size-4 rounded-full bg-coral-500 animate-pulse" />
                    <div className="absolute -bottom-1 left-8 size-3 rounded-full bg-warm-500" />
                    <div className="absolute top-10 -left-4 size-3 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Mini cards */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-black/10 border border-white/60 dark:border-white/5">
                    <div className="size-10 rounded-xl bg-coral-100 dark:bg-coral-900/30 flex items-center justify-center">
                      <Shield className="size-5 text-coral-600 dark:text-coral-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Fire reported</p>
                      <p className="text-xs text-muted-foreground">Lekki Phase 1 · 2 min ago</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-black/10 border border-white/60 dark:border-white/5">
                    <div className="size-10 rounded-xl bg-warm-100 dark:bg-warm-900/30 flex items-center justify-center">
                      <Users className="size-5 text-warm-600 dark:text-warm-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">12 neighbors active</p>
                      <p className="text-xs text-muted-foreground">Your ward is warming up</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decorative element */}
              <div className="absolute -top-4 -right-4 size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Heart className="size-8 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
