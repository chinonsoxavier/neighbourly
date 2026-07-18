"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OtpPage() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <Link href="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="size-4" /> Back
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/30">
            <Smartphone className="size-6 text-teal-600 dark:text-teal-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Verify your phone</h1>
        </div>
        <p className="text-sm text-muted-foreground">We sent a 6-digit code to your phone. Enter it below.</p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-center gap-2">
          {digits.map((digit, i) => (
            <Input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="size-14 text-center text-xl font-bold rounded-xl border-2 focus:border-primary"
            />
          ))}
        </div>
        <Button className="w-full rounded-xl h-11 font-semibold">Verify</Button>
        <p className="text-center text-sm text-muted-foreground">
          Didn&apos;t receive the code? <button className="text-primary font-medium hover:underline">Resend in 30s</button>
        </p>
      </div>
    </motion.div>
  );
}
