"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@repo/ui/primitives/button";
import { ArrowRight } from "lucide-react";

const heroImages = [
  "https://picsum.photos/seed/ebikes-hero-1/1920/1080",
  "https://picsum.photos/seed/ebikes-hero-2/1920/1080",
  "https://picsum.photos/seed/ebikes-hero-3/1920/1080",
];

const rotatingHeadlines = [
  "Move People Sustainably",
  "Move Goods Affordably",
  "Move Fleets Intelligently",
];

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(interval);
  }, []);

  // Headline rotation (synchronized with images)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex(
        (prevIndex) => (prevIndex + 1) % rotatingHeadlines.length,
      );
    }, 7000); // Change headline every 7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] flex items-center overflow-hidden bg-linear-to-br from-black/5 via-black/10 to-background"
    >
      {/* Background Images with Overlay and Parallax */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              willChange: "transform",
            }}
          >
            <Image
              src={image}
              alt={`Electric bike scene ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              placeholder="empty"
              sizes="100vw"
            />
          </div>
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 py-20">
        <div className="max-w-3xl text-left">
          <h3 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
            AI + ELECTRIC TWO WHEELERS
          </h3>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="transition-all duration-1000 inline-block">
              {rotatingHeadlines[currentHeadlineIndex]}
            </span>
          </h1>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="http://localhost:3000/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
