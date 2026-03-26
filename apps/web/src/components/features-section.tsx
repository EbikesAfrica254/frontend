import Image from "next/image";
import { Button } from "@repo/ui/primitives/button";
import { CheckCircle } from "lucide-react";

const features = [
  {
    tag: "SIMPLIFIED WORKFLOWS",
    title: "Experience the Ultimate Boost in Productivity",
    description:
      "Streamline your delivery operations with our cutting-edge electric fleet management. Unlock the potential of your team and take productivity to new heights.",
    features: [
      "Intelligent Fleet Management",
      "Real-time Route Optimization",
      "Data Security & Privacy",
    ],
    image: "https://picsum.photos/seed/ebikes-fleet/800/600",
    imageAlt: "Fleet management dashboard",
  },
  {
    tag: "AI-POWERED INSIGHTS",
    title: "Supercharge Your Business with Advanced Analytics",
    description:
      "Harness the potential of AI-driven analytics to optimize your operations, understand your customers better, and achieve unprecedented growth.",
    features: [
      "Smart Rider Matching",
      "Predictive Maintenance Alerts",
      "Performance Tracking Dashboard",
    ],
    image: "https://picsum.photos/seed/ebikes-analytics/800/600",
    imageAlt: "Analytics dashboard",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            TWO-COL FEATURES
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Supercharge Your Workflows
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock your team&#39;s true potential with our state-of-the-art
            electric mobility platform. From intelligent fleet management to
            real-time optimization and top-notch security.
          </p>
        </div>

        {/* Feature Blocks */}
        {features.map((feature, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0`}
          >
            {/* Image */}
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative w-full h-100 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover"
                  placeholder="empty"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                {feature.tag}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {feature.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {feature.description}
              </p>

              {/* Feature List with Checkmarks */}
              <ul className="space-y-3 mb-8">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">Start Free Trial</Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
