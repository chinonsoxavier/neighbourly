"use client";

import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useRef, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search communities, posts, people...",
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
    onSearch?.("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex items-center",
        className
      )}
    >
      <Search
        className={cn(
          "absolute left-3 size-4 transition-colors pointer-events-none",
          isFocused
            ? "text-primary"
            : "text-muted-foreground"
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border bg-background pl-10 pr-10 py-2.5",
          "text-sm transition-all duration-200",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
          "hover:border-primary/40"
        )}
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 flex items-center justify-center size-5 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
        >
          <X className="size-3 text-muted-foreground" />
        </button>
      )}
    </form>
  );
}
