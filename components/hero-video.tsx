"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const titleLetters = "さらば青春の光".split("")

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <motion.div 
        style={{ opacity }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Video Background */}
        <motion.div 
          style={{ scale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-background/40 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-people-enjoying-a-concert-4781-large.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        {/* Title Overlay */}
        <motion.div 
          style={{ y: textY }}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-8xl lg:text-9xl font-black tracking-wider text-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="sr-only">さらば青春の光</span>
              <span aria-hidden="true" className="flex justify-center flex-wrap">
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.8 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block"
                    style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-lg md:text-xl text-muted-foreground tracking-widest"
            >
              SARABA SEISHUN NO HIKARI
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="mt-12"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <span className="text-xs tracking-widest">SCROLL</span>
                <svg className="w-5 h-8" viewBox="0 0 20 32" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="1" width="18" height="30" rx="9" />
                  <motion.circle
                    animate={{ y: [8, 16, 8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    cx="10"
                    cy="10"
                    r="3"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-8 z-20 text-xs text-muted-foreground tracking-widest"
        >
          <div className="flex items-center gap-4">
            <span>EST. 2008</span>
            <span className="w-12 h-px bg-muted-foreground" />
            <span>COMEDY DUO</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 right-8 z-20 text-xs text-muted-foreground tracking-widest"
        >
          <div className="flex items-center gap-4">
            <span>TOKYO, JAPAN</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
