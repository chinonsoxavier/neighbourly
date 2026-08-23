"use client";

import { useState } from "react";
import { useAppStore, useAuthStore, type CustomPost } from "@/store";
import { neighborById } from "@/lib/data";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialPostCardProps {
  post: CustomPost;
}

export function SocialPostCard({ post }: SocialPostCardProps) {
  const { toggleLikePost, addCommentToPost, toggleBookmarkPost } = useAppStore();
  const { user: currentUser } = useAuthStore();
  const author = neighborById(post.authorId);

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addCommentToPost(post.id, commentText.trim());
    setCommentText("");
    setShowComments(true);
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs warm-glow space-y-4 transition-all">
      {/* Header with Author and Neighborhood */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={author.avatar}
            alt={author.name}
            className="size-10 rounded-2xl object-cover ring-2 ring-purple-100 dark:ring-purple-900"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-foreground hover:underline cursor-pointer">
                {author.name}
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground font-medium">
                {post.location || author.neighborhood}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">{post.createdAt}</p>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => toggleBookmarkPost(post.id)}
          className={cn(
            "p-2 rounded-xl transition-colors",
            post.bookmarked
              ? "text-primary bg-purple-50 dark:bg-purple-950/40"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Bookmark className={cn("size-4.5", post.bookmarked && "fill-current")} />
        </button>
      </div>

      {/* Post Text Body */}
      <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-wrap">
        {post.text}
      </p>

      {/* Post Image Media */}
      {post.image && (
        <div className="relative rounded-2xl overflow-hidden max-h-96 border border-border">
          <img
            src={post.image}
            alt="Post content"
            className="w-full max-h-96 object-cover hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Like / Heart */}
          <button
            onClick={() => toggleLikePost(post.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all",
              post.liked
                ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Heart className={cn("size-4", post.liked && "fill-current text-rose-600")} />
            <span>{post.likes}</span>
          </button>

          {/* Comments Toggle */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <MessageSquare className="size-4" />
            <span>{post.comments.length}</span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Share2 className="size-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        <span className="text-[11px] text-muted-foreground font-medium">
          Neighborly Verified
        </span>
      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className="space-y-3 pt-3 border-t border-border/50 bg-muted/20 -mx-5 -mb-5 p-5 rounded-b-3xl">
          {post.comments.length > 0 && (
            <div className="space-y-2.5">
              {post.comments.map((c) => {
                const commentAuthor = neighborById(c.authorId);
                return (
                  <div key={c.id} className="flex items-start gap-2.5 text-xs">
                    <img
                      src={commentAuthor.avatar}
                      alt={commentAuthor.name}
                      className="size-7 rounded-xl object-cover shrink-0 mt-0.5"
                    />
                    <div className="flex-1 bg-card rounded-2xl p-2.5 border border-border">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-foreground">{commentAuthor.name}</span>
                        <span className="text-[10px] text-muted-foreground">{c.createdAt}</span>
                      </div>
                      <p className="text-foreground/90">{c.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add comment input */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="size-7 rounded-xl object-cover shrink-0"
            />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a neighborly reply..."
              className="flex-1 rounded-xl border border-border bg-card px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="size-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:opacity-90"
            >
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
