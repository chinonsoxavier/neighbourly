export default function PartnerBand() {
  const partners = [
    "City of Riverside",
    "RedCross Local",
    "OakHill HOA",
    "Maple Schools",
    "Cedar Council",
  ];
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-6">
        {partners.map((p) => (
          <span
            key={p}
            className="font-display text-base font-semibold tracking-tight opacity-90"
          >
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
