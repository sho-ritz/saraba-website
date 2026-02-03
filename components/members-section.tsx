"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

export function MembersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const members = [
    {
      id: "morimoto",
      name: "森本晋太郎",
      nameEn: "SHINTARO MORIMOTO",
      role: "ツッコミ",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      color: "from-amber-500/20"
    },
    {
      id: "higashi",
      name: "東ブクロ",
      nameEn: "HIGASHIBUKURO",
      role: "ボケ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
      color: "from-blue-500/20"
    }
  ]

  return (
    <section ref={sectionRef} id="members" className="relative min-h-screen bg-card py-24 overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.03, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-[30vw] font-black text-foreground whitespace-nowrap"
        >
          MEMBERS
        </motion.span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground block mb-4">
            MEMBERS
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            メンバー紹介
          </h2>
        </motion.div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                {/* Image */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ 
                    scale: hoveredMember === member.id ? 1.1 : 1 
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${member.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    animate={{ 
                      y: hoveredMember === member.id ? 0 : 10,
                      opacity: hoveredMember === member.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xs tracking-widest text-accent block mb-2">
                      {member.role}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <span className="text-sm text-muted-foreground tracking-widest">
                      {member.nameEn}
                    </span>
                  </motion.div>
                </div>

                {/* Corner Decorations */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-foreground/20"
                  animate={{ 
                    opacity: hoveredMember === member.id ? 1 : 0,
                    scale: hoveredMember === member.id ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-foreground/20"
                  animate={{ 
                    opacity: hoveredMember === member.id ? 1 : 0,
                    scale: hoveredMember === member.id ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Index Number */}
              <motion.span
                className="absolute -top-8 -left-4 text-8xl font-black text-secondary"
                animate={{ 
                  opacity: hoveredMember === member.id ? 0.5 : 0.2,
                  x: hoveredMember === member.id ? 10 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                0{index + 1}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
