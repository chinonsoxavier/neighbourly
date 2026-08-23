"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  iconOnly?: boolean;
  href?: string;
}

export function Logo({
  className,
  size = "md",
  iconOnly = false,
  href = "/",
}: LogoProps) {
  const iconSizes = {
    sm: "size-7",
    md: "size-9",
    lg: "size-11",
    xl: "size-14",
  };

  const textSizes = {
    sm: "text-base tracking-tight",
    md: "text-xl tracking-tight",
    lg: "text-2xl tracking-tight",
    xl: "text-3xl tracking-tight",
  };

  const content = (
    <div className={cn("flex items-center gap-2.5 group select-none", className)}>
      {/* Brand Icon Mark */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7b2fb8] via-[#9a45d4] to-[#bb6ff0] text-white shadow-md shadow-purple-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-purple-500/35 shrink-0",
          iconSizes[size]
        )}
      >
        {/* Ambient subtle glow */}
        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Custom Interlocking Community House + Heart SVG Mark */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[58%] text-white"
        >
          {/* Roof & Chimney/Heart top */}
          <path d="M3 10.5L12 3l9 7.5" />
          {/* Main walls */}
          <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
          {/* Heart center */}
          <path
            d="M12 11.5c-1.5-1.5-3.5 0-3.5 1.5 0 2 3.5 4 3.5 4s3.5-2 3.5-4c0-1.5-2-1.5-3.5-1.5z"
            fill="currentColor"
            className="text-white/90"
          />
        </svg>

        {/* Live status beacon dot */}
        <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
        </span>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span
              className={cn(
                "font-bold text-foreground font-sans transition-colors",
                textSizes[size]
              )}
            >
              Neighbor<span className="text-[#8d3bc9] dark:text-[#d581ff]">ly</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
