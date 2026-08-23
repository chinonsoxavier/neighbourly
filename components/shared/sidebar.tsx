"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore, useAppStore } from "@/store";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Home,
  MapPin,
  Users,
  AlertTriangle,
  HandHeart,
  HeartHandshake,
  Heart,
  Vote,
  Calendar,
  MessageSquare,
  Bookmark,
  Settings,
  Compass,
  ArrowRight,
  X,
} from "lucide-react";
import { Logo } from "./logo";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/feed", icon: Home },
  { label: "Local", href: "/feed?filter=local", icon: MapPin },
  { label: "Communities", href: "/communities", icon: Users },
  { label: "Incidents", href: "/incidents", icon: AlertTriangle, badge: "3" },
  { label: "Aid requests", href: "/aid-requests", icon: HandHeart },
  { label: "Volunteers", href: "/volunteers", icon: HeartHandshake },
  { label: "Fundraisers", href: "/fundraisers", icon: Heart },
  { label: "Polls", href: "/polls", icon: Vote },
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Saved", href: "/saved", icon: Bookmark },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setOpen } = useSidebarStore();
  const { currentLocation } = useAppStore();
  const isMobile = useMobile();

  const isActive = (href: string) => {
    if (href === "/feed") return pathname === "/feed" || pathname === "/";
    if (href.startsWith("/feed?filter=")) return pathname === "/feed";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card/60 backdrop-blur-md justify-between select-none">
      <div className="flex flex-col overflow-y-auto px-4 py-4 space-y-5 scrollbar-thin">
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <Logo href="/feed" size="sm" />
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground"
            >
              <X className="size-5" />
            </button>
          </div>
        )}

        {/* YOUR SPACE Section Header */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground/80 tracking-wider uppercase px-3">
            YOUR SPACE
          </span>

          {/* Navigation Links */}
          <nav className="space-y-0.5 pt-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => isMobile && setOpen(false)}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-purple-100/90 dark:bg-purple-950/60 text-purple-900 dark:text-purple-100 font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-purple-50/60 dark:hover:bg-purple-950/20 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "size-4.5 transition-colors",
                        active
                          ? "text-primary dark:text-purple-400"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                        item.badge === "3"
                          ? "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400"
                          : "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Discover Card Widget (matching reference image) */}
      <div className="p-4 pt-2">
        <div className="rounded-3xl border border-purple-200/70 dark:border-purple-900/50 bg-gradient-to-b from-purple-50/80 to-purple-100/60 dark:from-purple-950/40 dark:to-purple-900/20 p-4 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <Compass className="size-4" />
            </span>
            <span className="text-xs font-bold text-foreground">Discover</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            3 new communities near <b className="text-foreground">{currentLocation}</b> this week.
          </p>
          <Link
            href="/communities"
            onClick={() => isMobile && setOpen(false)}
            className="flex items-center justify-center gap-1.5 w-full rounded-2xl bg-card border border-purple-200/80 dark:border-purple-800/60 py-2 text-xs font-bold text-primary shadow-xs hover:bg-primary hover:text-white transition-all group"
          >
            <span>Browse</span>
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  // Mobile Drawer Overlay
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-card border-r border-border shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Persistent Sidebar
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border/80 bg-card/60 backdrop-blur-md shrink-0 h-full">
      {sidebarContent}
    </aside>
  );
}
