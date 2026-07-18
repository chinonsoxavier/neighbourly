export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-warm-hero relative overflow-hidden items-center justify-center">
        <div className="absolute top-20 -left-20 size-80 rounded-full bg-warm-300/30 dark:bg-warm-700/10 blur-3xl" />
        <div className="absolute bottom-20 -right-20 size-80 rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl" />
        <div className="relative z-10 max-w-md px-12 text-center">
          <div className="inline-flex size-20 items-center justify-center rounded-3xl bg-white/40 dark:bg-black/10 backdrop-blur-sm mb-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-warm-900 dark:text-warm-50 mb-4">
            Welcome to your community
          </h2>
          <p className="text-warm-700 dark:text-warm-300 leading-relaxed">
            Neighborly connects you with your neighbors, keeps you safe, and
            helps you build the community you deserve.
          </p>
        </div>
      </div>
      {/* Right form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
