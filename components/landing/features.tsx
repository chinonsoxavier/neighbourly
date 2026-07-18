"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  MapPin,
  MessageSquare,
  Shield,
  Users,
  Vote,
  Heart,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: AlertTriangle,
    title: "Instant Incident Reports",
    description:
      "Report fires, accidents, and safety concerns with real-time geo-tagging. Your community stays informed the moment it matters.",
    color: "coral",
  },
  {
    icon: Shield,
    title: "Verified Trust System",
    description:
      "Multi-tier verification ensures reports are credible. From residents to officials — every voice carries appropriate weight.",
    color: "teal",
  },
  {
    icon: Users,
    title: "Local Communities",
    description:
      "Join your ward's community automatically. Connect with neighbors, share updates, and build real-world relationships.",
    color: "warm",
  },
  {
    icon: MessageSquare,
    title: "Community Feed",
    description:
      "A warm social space for your neighborhood. Buy and sell, share recommendations, organize events, and celebrate together.",
    color: "warm",
  },
  {
    icon: Vote,
    title: "Civic Engagement",
    description:
      "Tag officials, create polls, and track responses. Hold local government accountable with transparent, collective action.",
    color: "teal",
  },
  {
    icon: Zap,
    title: "Emergency Broadcasts",
    description:
      "Verified officials can send area-wide alerts instantly. Critical information reaches everyone without delay.",
    color: "coral",
  },
];

const colorMap: Record<string, { bg: string; icon: string; ring: string }> = {
  coral: {
    bg: "bg-coral-100 dark:bg-coral-900/30",
    icon: "text-coral-600 dark:text-coral-400",
    ring: "group-hover:ring-coral-200 dark:group-hover:ring-coral-800",
  },
  warm: {
    bg: "bg-warm-100 dark:bg-warm-900/30",
    icon: "text-warm-600 dark:text-warm-400",
    ring: "group-hover:ring-warm-200 dark:group-hover:ring-warm-800",
  },
  teal: {
    bg: "bg-teal-100 dark:bg-teal-900/30",
    icon: "text-teal-600 dark:text-teal-400",
    ring: "group-hover:ring-teal-200 dark:group-hover:ring-teal-800",
  },
};

export function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-width mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <Heart className="size-4" />
            Everything your community needs
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built for{" "}
            <span className="text-primary">real neighborhoods</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From emergency alerts to weekend BBQs — Neighborly covers every
            aspect of community life in one warm, welcoming platform.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const colors = colorMap[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-6 warm-glow-md card-hover-lift cursor-default"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${colors.bg} mb-4 ring-4 ring-transparent transition-all ${colors.ring}`}
                >
                  <feature.icon className={`size-6 ${colors.icon}`} />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
