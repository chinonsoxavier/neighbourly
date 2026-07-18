"use client";

import { useOnlineStatus } from "@/hooks/use-online-status";
import { WifiOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="bg-coral-600 text-coral-50 px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2">
            <WifiOff className="size-4" />
            <span>You&apos;re offline. Reports will be saved and sent when you reconnect.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
