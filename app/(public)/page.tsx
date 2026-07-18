import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { TrustSignals } from "@/components/landing/trust-signals";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <TrustSignals />
      <Testimonials />
      <CtaSection />
    </>
  );
}
