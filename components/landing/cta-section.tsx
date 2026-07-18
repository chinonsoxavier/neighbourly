"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-width mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl gradient-warm-hero p-12 sm:p-16 text-center"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-1/4 size-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 size-64 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-warm-800 dark:text-warm-100 mb-6">
              <Sparkles className="size-4" />
              Free to join — forever
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-warm-900 dark:text-warm-50 max-w-2xl mx-auto">
              Ready to build a stronger neighborhood?
            </h2>

            <p className="mt-4 text-lg text-warm-700 dark:text-warm-300 max-w-xl mx-auto">
              Join thousands of communities already using Neighborly to stay safe,
              connected, and engaged.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="rounded-2xl gap-2 px-8 text-base font-semibold h-12 bg-warm-900 dark:bg-white text-white dark:text-warm-900 hover:bg-warm-800 dark:hover:bg-warm-50 shadow-lg transition-all"
                >
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-warm-600 dark:text-warm-400">
              No credit card needed. Set up in under 2 minutes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
