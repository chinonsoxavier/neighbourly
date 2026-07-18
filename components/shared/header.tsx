"use client";

import Link from "next/link";
import { useSidebarStore } from "@/store";
import { useMobile } from "@/hooks/use-mobile";
import { SearchBar } from "@/components/common/search-bar";
import { UserAvatar } from "@/components/common/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Bell,
  Plus,
  User,
  Settings,
  LogOut,
  Shield,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { setOpen } = useSidebarStore();
  const isMobile = useMobile();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-xl px-4 lg:px-6 shrink-0">
      {/* Mobile menu toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="shrink-0"
        >
          <Menu className="size-5" />
        </Button>
      )}

      {/* Logo (mobile) */}
      {isMobile && (
        <Link href="/" className="flex items-center gap-2 mr-2">
          <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="size-4" />
          </div>
          <span className="text-base font-bold tracking-tight">Neighborly</span>
        </Link>
      )}

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <SearchBar className="w-full" />
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Create */}
        <Link href="/create">
          <Button size="sm" className="rounded-xl gap-1.5">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Create</span>
          </Button>
        </Link>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl"
        >
          <Sun className="size-4 dark:hidden" />
          <Moon className="size-4 hidden dark:block" />
        </Button>

        {/* Notifications */}
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-coral-500" />
          </Button>
        </Link>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <UserAvatar name="You" size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/profile/me" className="flex items-center gap-2">
                <User className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="size-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg text-destructive focus:text-destructive">
              <LogOut className="size-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
