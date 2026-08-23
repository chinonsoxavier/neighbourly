"use client";

import { useState } from "react";
import { useModalStore, useAppStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const presetAmounts = [10, 25, 50, 100, 250];

export function DonateModal() {
  const { donateModalOpen, donateFundraiserId, closeDonateModal } = useModalStore();
  const { fundraisers, donateToFundraiser } = useAppStore();

  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("Maria Alvarez");
  const [donorNote, setDonorNote] = useState<string>("Sending love and support from our family! ❤️");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fundraiser = fundraisers.find((f) => f.id === donateFundraiserId) || fundraisers[0];

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount <= 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      donateToFundraiser(fundraiser.id, currentAmount);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        closeDonateModal();
        setCustomAmount("");
        setSelectedAmount(25);
      }, 1600);
    }, 800);
  };

  return (
    <Dialog open={donateModalOpen} onOpenChange={(open) => !open && closeDonateModal()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-3xl border border-purple-100 dark:border-purple-900/40 bg-card shadow-2xl">
        {/* Header with gradient banner */}
        <div className="relative bg-gradient-to-br from-[#9a45d4] to-[#7b30b1] p-6 text-white text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md mb-2 shadow-inner">
            <Heart className="size-6 text-pink-200 fill-current" />
          </div>
          <DialogTitle className="text-xl font-bold text-white">Support this cause</DialogTitle>
          <DialogDescription className="text-xs text-purple-100/90 mt-1 max-w-sm mx-auto line-clamp-2">
            {fundraiser?.title}
          </DialogDescription>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 animate-bounce">
                <CheckCircle2 className="size-9" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Thank you for your generosity!</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Your donation of <span className="font-bold text-foreground">${currentAmount}</span> has been transferred directly to the campaign.
              </p>
            </div>
          ) : (
            <form onSubmit={handleDonate} className="space-y-5">
              {/* Progress mini indicator */}
              <div className="rounded-2xl bg-muted/60 p-3.5 border border-border">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-foreground">
                    ${fundraiser?.raised.toLocaleString()} raised
                  </span>
                  <span className="text-muted-foreground">
                    Goal: ${fundraiser?.goal.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        ((fundraiser?.raised || 0) / (fundraiser?.goal || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Select Donation Amount
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {presetAmounts.map((amt) => {
                    const active = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={cn(
                          "h-11 rounded-xl text-sm font-bold transition-all",
                          active
                            ? "bg-primary text-primary-foreground shadow-md shadow-purple-500/25 ring-2 ring-primary"
                            : "bg-muted hover:bg-muted/80 text-foreground border border-border/80"
                        )}
                      >
                        ${amt}
                      </button>
                    );
                  })}
                </div>

                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                    }}
                    className="pl-7 rounded-xl text-sm font-medium"
                  />
                </div>
              </div>

              {/* Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  Words of Encouragement (Optional)
                </label>
                <Input
                  value={donorNote}
                  onChange={(e) => setDonorNote(e.target.value)}
                  placeholder="Leave a warm message for the family..."
                  className="rounded-xl text-xs"
                />
              </div>

              {/* Anonymous checkbox */}
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span>Donate anonymously (hide name on donors list)</span>
              </label>

              {/* Security info */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <Lock className="size-3 text-emerald-600" />
                <span>Zero platform fee. 100% verified neighborhood fund.</span>
              </div>

              {/* Submit */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={closeDonateModal}
                  className="rounded-xl flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || currentAmount <= 0}
                  className="rounded-xl flex-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg shadow-purple-500/25"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <Heart className="size-4 mr-1.5 fill-current" /> Donate ${currentAmount}
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
