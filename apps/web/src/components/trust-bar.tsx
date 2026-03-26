"use client";

import Image from "next/image";

interface TrustLogo {
  name: string;
  src: string;
}

const TRUST_LOGOS: TrustLogo[] = [
  { name: "ArtCaffe", src: "https://picsum.photos/seed/artcaffe/200/80" },
  { name: "Bolt Food", src: "https://picsum.photos/seed/bolt/200/80" },
  { name: "Chicken Inn", src: "https://picsum.photos/seed/chickinn/200/80" },
  { name: "Glovo", src: "https://picsum.photos/seed/glovo/200/80" },
  { name: "Jumia", src: "https://picsum.photos/seed/jumia/200/80" },
  { name: "Safaricom", src: "https://picsum.photos/seed/safaricom/200/80" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Trusted by industry leaders"
      className="h-[30vh] md:h-[25vh] lg:h-[20vh] bg-muted/30 flex items-center py-4 overflow-hidden border-y border-border"
    >
      <div className="container mx-auto px-4 w-full">
        {/* Heading */}
        <p className="text-center text-muted-foreground mb-8 text-sm uppercase tracking-wider">
          Trusted by industry leaders
        </p>

        {/* Logo Marquee Container */}
        <div className="relative">
          <div
            className="flex gap-12 animate-marquee"
            style={{ width: "max-content" }}
          >
            {/* First set of logos */}
            {TRUST_LOGOS.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  width={200}
                  height={80}
                  className="h-12 md:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  placeholder="empty"
                />
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {TRUST_LOGOS.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <Image
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  width={200}
                  height={80}
                  className="h-12 md:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  placeholder="empty"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
