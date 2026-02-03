"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function JapanMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const locations = [
    { name: "東京", en: "TOKYO", description: "よしもと∞ホール" },
    { name: "大阪", en: "OSAKA", description: "NGK なんばグランド花月" },
    { name: "福岡", en: "FUKUOKA", description: "よしもと福岡劇場" },
    { name: "名古屋", en: "NAGOYA", description: "よしもと名古屋劇場" },
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-background py-24">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.span 
            className="text-xs tracking-[0.3em] text-muted-foreground block mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            TOUR LOCATIONS
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            全国ツアー会場
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            さらば青春の光の笑いを全国へ。各地の会場でお待ちしています。
          </p>
        </motion.div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Locations List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-6 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-accent/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {location.name}
                      </h3>
                      <span className="text-xs tracking-widest text-muted-foreground">
                        {location.en}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{location.description}</p>
                  </div>
                  <motion.div
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 z-10 pointer-events-none" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6651989.016075505!2d132.66083!3d36.0461576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2z5pel5pys!5e0!3m2!1sja!2sjp!4v1706847899012!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="日本地図"
                className="w-full h-full"
              />
            </div>

            {/* Map Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-4 -right-4 w-24 h-24 border border-accent/30 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-secondary/20 pointer-events-none select-none">
        JAPAN
      </div>
    </section>
  )
}
