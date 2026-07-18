export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 gradient-warm">
      <div className="w-full max-w-lg">{children}</div>
    </div>
  );
}
