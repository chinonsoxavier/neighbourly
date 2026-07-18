"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="flex size-20 items-center justify-center rounded-2xl bg-coral-100 dark:bg-coral-900/30 mb-6">
        <AlertTriangle className="size-10 text-coral-500 dark:text-coral-400" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
        {description}
      </p>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2 rounded-xl">
          <RefreshCw className="size-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
