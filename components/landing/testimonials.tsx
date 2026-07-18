"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { UserAvatar } from "@/components/common/avatar";

const testimonials = [
  {
    name: "Adebayo O.",
    role: "Community Leader, Lekki Phase 1",
    avatar: undefined,
    content:
      "Neighborly changed how we respond to emergencies. What used to take WhatsApp group chaos now takes seconds — and reaches everyone.",
    rating: 5,
  },
  {
    name: "Chidinma M.",
    role: "Resident, Ikeja GRA",
    avatar: undefined,
    content:
      "I found my lost dog within 30 minutes thanks to a neighbor's report. This app isn't just tech — it's real community.",
    rating: 5,
  },
  {
    name: "Emeka N.",
    role: "Local Chairman, Surulere",
    avatar: undefined,
    content:
      "As an official, the broadcast and civic tools let me actually serve my constituents. Transparency builds trust.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-width mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <Quote className="size-4" />
            What neighbors say
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Loved by{" "}
            <span className="text-primary">real communities</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6 warm-glow-md"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-warm-400 text-warm-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-foreground/80 mb-6">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <UserAvatar name={t.name} size="md" />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
