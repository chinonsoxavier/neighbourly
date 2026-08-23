"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/store";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  AlertTriangle,
  Plus,
  MessageSquare,
} from "lucide-react";

const items = [
  { label: "Home", href: "/feed", icon: Home },
  { label: "Communities", href: "/communities", icon: Users },
  { label: "Create", href: "#create", icon: Plus, isAction: true },
  { label: "Incidents", href: "/incidents", icon: AlertTriangle },
  { label: "Messages", href: "/messages", icon: MessageSquare },
];

export function MobileNav() {
  const pathname = usePathname();
  const { openCreateModal } = useModalStore();

  const isActive = (href: string) => {
    if (href === "/feed") return pathname === "/feed" || pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-card/95 backdrop-blur-xl lg:hidden safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const active = !item.isAction && isActive(item.href);

          if (item.isAction) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => openCreateModal("post")}
                className="flex flex-col items-center gap-0.5 -mt-5 focus:outline-none"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7b30b1] via-[#9a45d4] to-[#bb6ff0] text-white shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform">
                  <Plus className="size-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-primary mt-0.5">Create</span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors",
                active
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("size-5", active && "text-primary")} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <span className="size-1 rounded-full bg-primary -mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
