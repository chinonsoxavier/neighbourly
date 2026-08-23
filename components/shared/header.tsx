"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebarStore, useModalStore, useAppStore, useAuthStore } from "@/store";
import { useMobile } from "@/hooks/use-mobile";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Menu,
  Bell,
  Plus,
  MessageSquare,
  Search,
  User,
  Settings,
  Bookmark,
  LogOut,
  Sun,
  Moon,
  MapPin,
  Sparkles,
  Check,
  AlertTriangle,
  Heart,
  SlidersHorizontal,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const neighborhoodOptions = [
  "Riverside",
  "Oak Hill",
  "Maple Heights",
  "Cedar Park",
  "Downtown Core",
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { setOpen } = useSidebarStore();
  const { openCreateModal, openSearchModal } = useModalStore();
  const {
    currentLocation,
    setCurrentLocation,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    messages,
  } = useAppStore();
  const { user } = useAuthStore();
  const isMobile = useMobile();
  const { theme, setTheme } = useTheme();

  const unreadNotifications = notifications.filter((n) => !n.read);
  const unreadMessagesCount = messages.filter((m) => m.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/80 bg-card/85 px-4 lg:px-6 shadow-xs backdrop-blur-xl shrink-0">
      {/* Left section: Mobile menu & Logo */}
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="size-9 rounded-xl shrink-0"
          >
            <Menu className="size-5" />
          </Button>
        )}

        <Logo href="/feed" size="md" />

        {/* Location selector pill */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden sm:flex items-center gap-1.5 rounded-full border border-purple-200/80 dark:border-purple-900/60 bg-purple-50/60 dark:bg-purple-950/40 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-100/80 transition-colors">
              <MapPin className="size-3 text-purple-600 dark:text-purple-400" />
              <span>{currentLocation}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 rounded-2xl p-1.5">
            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase px-2 py-1">
              Select Neighborhood
            </DropdownMenuLabel>
            {neighborhoodOptions.map((loc) => (
              <DropdownMenuItem
                key={loc}
                onClick={() => setCurrentLocation(loc)}
                className="flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium cursor-pointer"
              >
                <span>{loc}</span>
                {currentLocation === loc && <Check className="size-3.5 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Middle: Universal Search Bar */}
      <div className="flex-1 max-w-xl mx-auto px-2">
        <button
          onClick={openSearchModal}
          type="button"
          className="w-full flex items-center justify-between rounded-2xl border border-border/80 bg-muted/40 hover:bg-muted/70 px-4 py-2 text-xs md:text-sm text-muted-foreground transition-all group shadow-xs hover:border-purple-200 dark:hover:border-purple-800"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            <span className="truncate">Search neighbors, incidents, fundraisers...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-[11px] font-mono font-medium text-muted-foreground/80 bg-card px-2 py-0.5 rounded-lg border border-border/60 shadow-2xs">
            <SlidersHorizontal className="size-3 mr-0.5 opacity-60" />
            <span>⌘K</span>
          </div>
        </button>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* + Create Button */}
        <Button
          onClick={() => openCreateModal("post")}
          size="sm"
          className="rounded-2xl gap-1.5 bg-gradient-to-r from-[#8d3bc9] to-[#a94ee1] hover:from-[#7b30b1] hover:to-[#9a45d4] text-white shadow-md shadow-purple-500/25 px-4 font-semibold text-xs h-9"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Create</span>
        </Button>

        {/* Messages */}
        <Link href="/messages">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-2xl relative hover:bg-purple-50 dark:hover:bg-purple-950/40 text-muted-foreground hover:text-foreground"
          >
            <MessageSquare className="size-4.5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
            )}
          </Button>
        </Link>

        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-2xl relative hover:bg-purple-50 dark:hover:bg-purple-950/40 text-muted-foreground hover:text-foreground"
            >
              <Bell className="size-4.5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-background">
                  {unreadNotifications.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 sm:w-96 p-0 rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-primary" />
                <span className="text-sm font-bold">Notifications</span>
              </div>
              {unreadNotifications.length > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {notifications.slice(0, 5).map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    markNotificationRead(n.id);
                    if (n.kind === "incident") router.push("/incidents");
                    else if (n.kind === "fundraiser") router.push("/fundraisers");
                    else if (n.kind === "poll") router.push("/polls");
                    else router.push("/feed");
                  }}
                  className={cn(
                    "flex items-start gap-3 p-2.5 rounded-2xl transition-colors cursor-pointer group",
                    !n.read
                      ? "bg-purple-50/70 dark:bg-purple-950/30 hover:bg-purple-100/80"
                      : "hover:bg-muted/70"
                  )}
                >
                  <div
                    className={cn(
                      "size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                      n.kind === "incident" && "bg-rose-100 dark:bg-rose-900/40 text-rose-600",
                      n.kind === "fundraiser" && "bg-pink-100 dark:bg-pink-900/40 text-pink-600",
                      n.kind === "poll" && "bg-amber-100 dark:bg-amber-900/40 text-amber-600",
                      n.kind === "message" && "bg-purple-100 dark:bg-purple-900/40 text-purple-600",
                      n.kind === "gov" && "bg-blue-100 dark:bg-blue-900/40 text-blue-600"
                    )}
                  >
                    {n.kind === "incident" && <AlertTriangle className="size-4" />}
                    {n.kind === "fundraiser" && <Heart className="size-4 fill-current" />}
                    {n.kind === "poll" && <Sparkles className="size-4" />}
                    {n.kind === "message" && <MessageSquare className="size-4" />}
                    {n.kind === "gov" && <MapPin className="size-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors">
                        {n.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border bg-muted/20 text-center">
              <Link
                href="/notifications"
                className="text-xs font-semibold text-primary hover:underline block py-1"
              >
                View all notifications →
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="size-9 rounded-2xl hidden md:flex text-muted-foreground hover:text-foreground"
        >
          <Sun className="size-4.5 dark:hidden" />
          <Moon className="size-4.5 hidden dark:block" />
        </Button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-2xl p-1 hover:bg-muted transition-colors focus:outline-none">
              <img
                src={user.avatar}
                alt={user.name}
                className="size-8 rounded-xl object-cover ring-2 ring-purple-200 dark:ring-purple-900"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-1.5 shadow-xl">
            <div className="px-3 py-2 border-b border-border mb-1">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.handle} · {currentLocation}</p>
            </div>
            <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
              <Link href="/profile/me" className="flex items-center gap-2.5">
                <User className="size-4 text-primary" />
                <span>Your Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
              <Link href="/saved" className="flex items-center gap-2.5">
                <Bookmark className="size-4 text-purple-500" />
                <span>Saved Items</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
              <Link href="/settings" className="flex items-center gap-2.5">
                <Settings className="size-4 text-muted-foreground" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl cursor-pointer md:hidden"
            >
              <span className="flex items-center gap-2.5">
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                <span>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl text-rose-600 focus:text-rose-600 cursor-pointer">
              <Link href="/" className="flex items-center gap-2.5">
                <LogOut className="size-4" />
                <span>Sign Out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
