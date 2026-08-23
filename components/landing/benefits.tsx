import { HandHeart, PiggyBank, Siren, Vote } from "lucide-react";

export default function Benefits() {
  const items = [
    {
      icon: Siren,
      title: "Real-time incidents",
      body: "Fires, floods, missing pets, outages. Neighbors get notified and responders coordinate in minutes.",
    },
    {
      icon: HandHeart,
      title: "Aid requests",
      body: "Ask for a ride, a meal, a bed for the night — and watch your block show up.",
    },
    {
      icon: PiggyBank,
      title: "Local fundraising",
      body: "Spin up a fundraiser for the family next door in under a minute. No platform fees.",
    },
    {
      icon: Vote,
      title: "Civic polls",
      body: "Vote on speed bumps, market hours, and school board picks. Your council is watching.",
    },
  ];
  const photos = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600",
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600",
  ];
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2">
      <div className="relative rounded-[2.5rem] border-2 border-dashed border-primary/40 p-4">
        <div className="grid grid-cols-2 gap-3">
          {photos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Neighbors in the community"
              className={`h-40 w-full object-cover sm:h-48 ${["rounded-[2rem_2rem_0.5rem_2rem]", "rounded-[2rem_2rem_2rem_0.5rem]", "rounded-[2rem_0.5rem_2rem_2rem]", "rounded-[0.5rem_2rem_2rem_2rem]"][i]}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          <span className="text-primary">Benefits</span> from being neighborly
        </h2>
        <div className="mt-8 space-y-6">
          {items.map((f) => (
            <div key={f.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary/15 to-ember/15 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
