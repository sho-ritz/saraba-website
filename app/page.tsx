"use client"

import { useEffect, useState } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { Header } from "@/components/header"
import { HeroVideo } from "@/components/hero-video"
import { AnimatedMarquee } from "@/components/animated-marquee"
import { MembersSection } from "@/components/members-section"
import { JapanMapSection } from "@/components/japan-map-section"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show header when scrolled past 80% of viewport height
    const threshold = typeof window !== "undefined" ? window.innerHeight * 0.8 : 800
    setHeaderVisible(latest > threshold)
  })

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header isVisible={headerVisible} />
      <HeroVideo />
      <AnimatedMarquee />
      <MembersSection />
      <AnimatedMarquee />
      <JapanMapSection />
      <NewsSection />
      <Footer />
    </main>
  )
}
