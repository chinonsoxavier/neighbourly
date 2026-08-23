"use client";

import { useState } from "react";
import { useModalStore, useAppStore, useAuthStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Image as ImageIcon,
  Vote,
  AlertTriangle,
  Heart,
  Calendar,
  Send,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PostComposer() {
  const { openCreateModal } = useModalStore();
  const { addPost, currentLocation } = useAppStore();
  const { user } = useAuthStore();

  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleQuickPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    addPost({
      authorId: user.id,
      text: text.trim(),
      image: imageUrl.trim() || undefined,
      location: `${currentLocation}, My Block`,
      communitySlug: "riverside",
    });

    setText("");
    setImageUrl("");
    setShowImageInput(false);
    setIsFocused(false);
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs warm-glow transition-all">
      <form onSubmit={handleQuickPost} className="space-y-3">
        <div className="flex items-start gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="size-10 rounded-2xl object-cover ring-2 ring-purple-100 dark:ring-purple-900 shrink-0 mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder={`What's happening in ${currentLocation}?`}
              rows={isFocused || text ? 3 : 1}
              className="w-full bg-muted/40 hover:bg-muted/60 focus:bg-background rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-transparent focus:border-purple-200 dark:focus:border-purple-800 transition-all resize-none"
            />

            {/* Quick image input dropdown */}
            {showImageInput && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image URL (e.g. from Unsplash)..."
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            )}

            {/* Image Preview */}
            {imageUrl && (
              <div className="relative rounded-2xl overflow-hidden max-h-40 border border-border mt-2">
                <img src={imageUrl} alt="Upload preview" className="w-full h-40 object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 size-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/60">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-0.5 scrollbar-none">
            {/* Photo button */}
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-colors",
                showImageInput
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <ImageIcon className="size-4 text-purple-600 dark:text-purple-400" />
              <span>Photo</span>
            </button>

            {/* Poll button */}
            <button
              type="button"
              onClick={() => openCreateModal("poll")}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Vote className="size-4 text-amber-600 dark:text-amber-400" />
              <span>Poll</span>
            </button>

            {/* Incident button */}
            <button
              type="button"
              onClick={() => openCreateModal("incident")}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <AlertTriangle className="size-4 text-rose-600 dark:text-rose-400" />
              <span>Incident</span>
            </button>

            {/* Fundraiser button */}
            <button
              type="button"
              onClick={() => openCreateModal("fundraiser")}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Heart className="size-4 text-pink-600 dark:text-pink-400" />
              <span>Fundraiser</span>
            </button>

            {/* Event button */}
            <button
              type="button"
              onClick={() => openCreateModal("event")}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Calendar className="size-4 text-blue-600 dark:text-blue-400" />
              <span>Event</span>
            </button>
          </div>

          {/* Submit Post Button */}
          <Button
            type="submit"
            disabled={!text.trim()}
            size="sm"
            className="rounded-2xl bg-gradient-to-r from-[#8d3bc9] to-[#a94ee1] hover:from-[#7b30b1] hover:to-[#9a45d4] text-white font-bold px-5 text-xs h-8.5 shadow-md shadow-purple-500/20"
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
