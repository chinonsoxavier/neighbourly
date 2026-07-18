"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Home,
  MapPin,
  Users,
  AlertTriangle,
  PlusCircle,
  Bell,
  Settings,
  ChevronLeft,
  X,
  Shield,
} from "lucide-react";
import { UserAvatar } from "@/components/common/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "My Local Community", href: "/feed", icon: MapPin },
  { label: "Communities", href: "/communities", icon: Users },
  { label: "Incidents", href: "/incidents", icon: AlertTriangle },
  { label: "Report Incident", href: "/report", icon: PlusCircle },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, isCollapsed, setOpen, setCollapsed } = useSidebarStore();
  const isMobile = useMobile();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 shrink-0">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Shield className="size-5" />
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold tracking-tight"
          >
            Neighborly
          </motion.span>
        )}
        {isMobile && (
          <button
            onClick={() => setOpen(false)}
            className="ml-auto p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <Separator className="mx-3" />

      {/* Nav items */}
      <ScrollArea className="flex-1 py-3 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("size-5 shrink-0", active && "text-primary")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator className="mx-3" />

      {/* Bottom section */}
      <div className="p-3 space-y-1">
        {!isMobile && !isCollapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="size-5" />
            <span>Collapse</span>
          </button>
        )}

        <Link
          href="/profile/me"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <UserAvatar name="You" size="sm" />
          {!isCollapsed && <span>Your Profile</span>}
        </Link>
      </div>
    </div>
  );

  // Mobile: overlay drawer
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
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-card border-r border-border"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: persistent sidebar
  return (
    <motion.aside
      animate={{ width: isCollapsed ? 72 : 260 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="hidden lg:flex flex-col h-full border-r border-border bg-card shrink-0"
    >
      {sidebarContent}
    </motion.aside>
  );
}
