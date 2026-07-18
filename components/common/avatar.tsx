"use client";

import { cn } from "@/lib/utils";
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showOnline?: boolean;
  isOnline?: boolean;
  className?: string;
}

const sizeMap = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-lg",
  xl: "size-24 text-2xl",
};

const fallbackSizeMap = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-14",
  xl: "size-24",
};

export function UserAvatar({
  src,
  name,
  size = "md",
  showOnline = false,
  isOnline = false,
  className,
}: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn("relative inline-flex", className)}>
      <ShadcnAvatar className={cn(sizeMap[size], "rounded-full")}>
        {src && <AvatarImage src={src} alt={name} />}
        <AvatarFallback
          className={cn(
            fallbackSizeMap[size],
            "rounded-full bg-warm-200 dark:bg-warm-800 text-warm-700 dark:text-warm-200 font-medium"
          )}
        >
          {initials}
        </AvatarFallback>
      </ShadcnAvatar>
      {showOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full border-2 border-background",
            isOnline
              ? "bg-teal-500 size-3"
              : "bg-muted-foreground/40 size-2.5",
            size === "xl" && (isOnline ? "size-4" : "size-3"),
            size === "xs" && (isOnline ? "size-2" : "size-1.5")
          )}
        />
      )}
    </div>
  );
}

interface AvatarStackProps {
  avatars: { src?: string; name: string }[];
  max?: number;
  size?: "xs" | "sm" | "md";
  className?: string;
}

export function AvatarStack({
  avatars,
  max = 4,
  size = "sm",
  className,
}: AvatarStackProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visible.map((a, i) => (
        <div
          key={i}
          className="relative rounded-full ring-2 ring-background"
          style={{ zIndex: visible.length - i }}
        >
          <UserAvatar src={a.src} name={a.name} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full bg-muted ring-2 ring-background font-medium text-muted-foreground",
            size === "xs" && "size-6 text-[10px]",
            size === "sm" && "size-8 text-xs",
            size === "md" && "size-10 text-sm"
          )}
          style={{ zIndex: 0 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
