"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/common/avatar";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Pin,
  Clock,
} from "lucide-react";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  const timeAgo = getTimeAgo(post.createdAt);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card warm-glow-md card-hover-lift overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-2">
        <UserAvatar
          name={post.author.displayName}
          src={post.author.avatarUrl}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold truncate">
              {post.author.displayName}
            </span>
            {post.isPinned && (
              <Pin className="size-3 text-primary" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {post.community && <span>{post.community.name}</span>}
            <span>·</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-3">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
      </div>

      {/* Media placeholder */}
      {post.media.length > 0 && (
        <div className="px-5 pb-3">
          <div className="rounded-xl bg-muted h-48 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Media</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-3 pb-3">
        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Heart className="size-3.5" />
          {post.reactionCount > 0 && post.reactionCount}
        </button>
        <Link
          href={`/posts/${post.id}`}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <MessageSquare className="size-3.5" />
          {post.commentCount > 0 && post.commentCount}
        </Link>
        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Share2 className="size-3.5" />
        </button>
        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ml-auto">
          <Bookmark className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

function getTimeAgo(date: string): string {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
