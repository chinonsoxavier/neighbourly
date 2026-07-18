"use client";

import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";
import { INCIDENT_STATUSES } from "@/lib/constants";

interface StatusStepperProps {
  currentStatus: string;
  className?: string;
}

const STEPS = [
  "REPORTED",
  "VERIFIED",
  "RESPONDED",
  "RESOLVED",
] as const;

export function StatusStepper({ currentStatus, className }: StatusStepperProps) {
  const currentIdx = STEPS.indexOf(currentStatus as typeof STEPS[number]);

  return (
    <div className={cn("flex items-center w-full", className)}>
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentIdx;
        const isCurrent = idx === currentIdx;
        const isPending = idx > currentIdx;
        const status = INCIDENT_STATUSES.find((s) => s.value === step);

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full transition-all",
                  isCompleted && "bg-teal-500 text-white",
                  isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  isPending && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" />
                ) : (
                  <Circle className="size-2.5 fill-current" />
                )}
              </div>
              <span
                className={cn(
                  "mt-1.5 text-[11px] font-medium whitespace-nowrap",
                  isCompleted && "text-teal-600 dark:text-teal-400",
                  isCurrent && "text-primary font-semibold",
                  isPending && "text-muted-foreground"
                )}
              >
                {status?.label ?? step}
              </span>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-1 mt-[-16px] rounded-full transition-all",
                  idx < currentIdx ? "bg-teal-500" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
