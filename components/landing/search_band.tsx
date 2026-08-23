"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SearchBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h2 className="font-display text-3xl font-semibold tracking-tight">
        Find your neighborhood
      </h2>
      <form
        className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-soft"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
        <Input
          placeholder="Search over 240+ neighborhoods"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
        <Button
          type="submit"
          className="pill bg-linear-to-r from-violet to-primary px-6 text-primary-foreground"
        >
          Search
        </Button>
      </form>
    </section>
  );
}
