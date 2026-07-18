"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="relative mb-6">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-warm-100 dark:bg-warm-900/30">
          <Icon className="size-10 text-warm-500 dark:text-warm-400" />
        </div>
        <div className="absolute -right-1 -bottom-1 size-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
          <div className="size-2 rounded-full bg-teal-500 dark:bg-teal-400" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
