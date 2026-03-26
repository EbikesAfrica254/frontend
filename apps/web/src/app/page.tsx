import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { TrustBar } from "@/components/trust-bar";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturesSection />
    </>
  );
}
