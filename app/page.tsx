"use client";

import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Header } from "@/components/organisms/header";
import { HeroVideo } from "@/components/organisms/hero-video";
import { AnimatedMarquee } from "@/components/organisms/animated-marquee";
import { MembersSection } from "@/components/organisms/members-section";
import { JapanMapSection } from "@/components/organisms/japan-map-section";
import { NewsSection } from "@/components/organisms/news-section";
import { Footer } from "@/components/organisms/footer";

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show header when scrolled past 80% of viewport height
    const threshold =
      typeof window !== "undefined" ? window.innerHeight * 0.8 : 800;
    setHeaderVisible(latest > threshold);
  });

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header isVisible={headerVisible} />
      <HeroVideo />
      <AnimatedMarquee />
      <JapanMapSection />
      <AnimatedMarquee />
      <MembersSection />
      <NewsSection />
      <Footer />
    </main>
  );
}
