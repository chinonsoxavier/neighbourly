"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  PiggyBank,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { neighbors } from "@/lib/data";
import Animate from "../shared/animate";
import TextStagger from "../shared/text_stagger";
import PartnerBand from "./partner_brand";

const people = [
  "from-pink-300 to-rose-500",
  "from-violet-300 to-purple-600",
  "from-amber-200 to-orange-500",
  "from-teal-200 to-emerald-600",
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-140 w-180 rounded-full bg-linear-to-br from-primary/25 via-ember/20 to-teal/20 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-16 md:grid-cols-2 md:pb-24 md:pt-20">
        <Animate direction="left" axis="x">
          <Badge
            variant="outline"
            className="pill bg-background/70 backdrop-blur"
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-success" />
            <span>Now in 240+ neighborhoods</span>
          </Badge>
          <h1 className="mt-5 whitespace-nowrap font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            <span>Know your block in a new &amp; </span>
            <span className="text-primary block">
              warmer way
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground">
            <span>
              Report what's happening, ask for help, fundraise for the family
              next door, and vote on the things that shape your street.
              Neighborly is the community you already have — just made better.
            </span>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="pill bg-linear-to-r from-violet to-primary px-7 text-primary-foreground shadow-glow"
            >
              <Link href="/register">
                Join now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="pill px-6">
              <Link href="/app">
                <Play className="mr-1.5 h-4 w-4 text-primary" /> What's
                Neighborly?
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {neighbors.slice(0, 5).map((n) => (
                <Avatar key={n.id} className="h-7 w-7 ring-2 ring-background">
                  <AvatarImage src={n.avatar} />
                  <AvatarFallback>{n.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <TextStagger>12,400+ neighbors joined this month</TextStagger>
          </div>
        </Animate>

        <Animate
          direction="right"
          axis="x"
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[46%_54%_42%_58%/52%_44%_56%_48%] bg-linear-to-br from-primary to-violet opacity-90" />
          <div className="absolute inset-0 -z-10 rounded-[46%_54%_42%_58%/52%_44%_56%_48%] border-2 border-dashed border-primary/40" />
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1000"
            alt="Neighbors gathered together outdoors"
            className="relative z-10 h-105 w-full rounded-[46%_54%_42%_58%/52%_44%_56%_48%] object-cover"
          />
          <FloatCard
            className="left-[-10%] top-8"
            title="240+"
            sub="Neighborhoods"
            icon={MapPin}
          />
          <FloatCard
            className="right-[-6%] top-1/3"
            title="1.4M"
            sub="Neighbors helped"
            icon={Users}
          />
          <FloatCard
            className="bottom-6 left-[-4%]"
            title="$8.6M"
            sub="Raised together"
            icon={PiggyBank}
          />
        </Animate>
      </div>

      <PartnerBand />
    </section>
    // <section className="relative overflow-hidden bg-[#fff8ff]">
    //   <div className="absolute inset-x-0 top-0 h-[80%] bg-[radial-gradient(circle_at_76%_25%,#f4c2ff_0,transparent_26%),radial-gradient(circle_at_15%_78%,#ffe4ac_0,transparent_20%)]" />
    //   <div className="relative max-width mx-auto px-6 pb-20 pt-16 md:pb-28 md:pt-24">
    //     <div className="grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr]">
    //       <motion.div
    //         initial={{ opacity: 0, y: 22 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.55 }}
    //       >
    //         <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-warm-700 shadow-sm">
    //           <span className="size-2 rounded-full bg-teal-400 animate-pulse" />{" "}
    //           Made for real neighborhoods
    //         </div>
    //         <h1 className="max-w-xl text-5xl font-bold leading-[1.02] tracking-[-.05em] text-warm-900 sm:text-6xl">
    //           A more connected <span className="text-primary">place</span> to call
    //           home.
    //         </h1>
    //         <p className="mt-6 max-w-lg text-lg leading-8 text-warm-700">
    //           Neighborly brings safety updates, local conversations, helpful
    //           neighbors and community action into one warm, trusted home.
    //         </p>
    //         <div className="mt-9 flex flex-wrap gap-3">
    //           <Link href="/register">
    //             <Button
    //               size="lg"
    //               className="h-12 rounded-2xl px-6 text-base shadow-lg shadow-warm-400/25"
    //             >
    //               Join your community <ArrowRight className="size-4" />
    //             </Button>
    //           </Link>
    //           <Link href="/login">
    //             <Button
    //               variant="outline"
    //               size="lg"
    //               className="h-12 rounded-2xl border-warm-200 bg-white px-6 text-base"
    //             >
    //               Explore Neighborly
    //             </Button>
    //           </Link>
    //         </div>
    //         <div className="mt-10 flex items-center gap-4">
    //           <div className="flex -space-x-2">
    //             {people.map((p, i) => (
    //               <div
    //                 key={p}
    //                 className={`grid size-9 place-items-center rounded-full border-2 border-white bg-gradient-to-br ${p} text-xs font-bold text-white`}
    //               >
    //                 {["A", "M", "C", "T"][i]}
    //               </div>
    //             ))}
    //           </div>
    //           <p className="text-sm text-warm-700">
    //             <b className="text-warm-900">48,000+ neighbors</b>
    //             <br />
    //             already connected
    //           </p>
    //         </div>
    //       </motion.div>
    //       <motion.div
    //         initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
    //         animate={{ opacity: 1, scale: 1, rotate: 0 }}
    //         transition={{ duration: 0.65, delay: 0.1 }}
    //         className="relative mx-auto w-full max-w-xl"
    //       >
    //         <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#a340dc] via-[#d56af4] to-[#ffbe70] opacity-25 blur-2xl" />
    //         <div className="relative rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-2xl shadow-warm-500/20 backdrop-blur-sm sm:p-7">
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-center gap-2">
    //               <span className="grid size-10 place-items-center rounded-xl bg-primary text-white">
    //                 <Heart className="size-5 fill-current" />
    //               </span>
    //               <div>
    //                 <b className="block">Your neighborhood</b>
    //                 <span className="text-xs text-muted-foreground">
    //                   Lekki Phase 1
    //                 </span>
    //               </div>
    //             </div>
    //             <div className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">
    //               12 active now
    //             </div>
    //           </div>
    //           <div className="mt-6 rounded-2xl bg-gradient-to-br from-warm-500 to-warm-700 p-5 text-white">
    //             <div className="flex items-start justify-between">
    //               <div>
    //                 <p className="text-xs font-bold uppercase tracking-widest text-white/70">
    //                   This weekend
    //                 </p>
    //                 <h2 className="mt-2 text-xl font-bold">
    //                   Community clean-up
    //                   <br />
    //                   at Freedom Park
    //                 </h2>
    //               </div>
    //               <CalendarDays className="size-7 text-white/80" />
    //             </div>
    //             <div className="mt-5 flex items-center gap-2 text-sm text-white/85">
    //               <MapPin className="size-4" /> Saturday, 8:00 AM
    //             </div>
    //           </div>
    //           <div className="mt-4 grid gap-3 sm:grid-cols-2">
    //             <div className="rounded-2xl border border-coral-100 bg-coral-50 p-4">
    //               <div className="flex justify-between">
    //                 <ShieldCheck className="size-5 text-coral-600" />
    //                 <span className="size-2 rounded-full bg-coral-500" />
    //               </div>
    //               <b className="mt-5 block text-sm">Safety update</b>
    //               <p className="mt-1 text-xs text-muted-foreground">
    //                 Patrol reported near the gate
    //               </p>
    //             </div>
    //             <div className="rounded-2xl border border-teal-100 bg-teal-50 p-4">
    //               <Users className="size-5 text-teal-600" />
    //               <b className="mt-5 block text-sm">Neighbors helping</b>
    //               <p className="mt-1 text-xs text-muted-foreground">
    //                 14 people joined the conversation
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //         <motion.div
    //           animate={{ y: [0, -8, 0] }}
    //           transition={{ duration: 4, repeat: Infinity }}
    //           className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl"
    //         >
    //           <span className="grid size-9 place-items-center rounded-xl bg-amber-100 text-amber-600">
    //             <Users size={18} />
    //           </span>
    //           <span className="text-xs text-muted-foreground">
    //             <b className="block text-sm text-warm-900">Community first</b>
    //             Every voice matters
    //           </span>
    //         </motion.div>
    //       </motion.div>
    //     </div>
    //   </div>
    // </section>;
  );
};

function FloatCard({
  className,
  title,
  sub,
  icon: Icon,
}: {
  className?: string;
  title: string;
  sub: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lift backdrop-blur ${className}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-primary/15 to-ember/15 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="font-display text-sm font-semibold leading-none">
          {title}
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
