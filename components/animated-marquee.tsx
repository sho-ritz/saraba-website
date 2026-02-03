"use client"

import { motion } from "framer-motion"

export function AnimatedMarquee() {
  const text = "さらば青春の光 • SARABA SEISHUN NO HIKARI • お笑いコンビ • COMEDY DUO • "
  
  return (
    <div className="bg-secondary py-4 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span 
            key={i} 
            className="text-sm md:text-base tracking-widest text-muted-foreground mx-4"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
