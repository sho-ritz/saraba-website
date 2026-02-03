"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: "-50px" })

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "X" },
    { name: "YouTube", href: "#", icon: "YT" },
    { name: "Instagram", href: "#", icon: "IG" },
    { name: "TikTok", href: "#", icon: "TK" },
  ]

  const footerLinks = [
    { label: "プライバシーポリシー", href: "#" },
    { label: "お問い合わせ", href: "#" },
    { label: "よしもとクリエイティブ・エージェンシー", href: "#" },
  ]

  return (
    <footer ref={footerRef} className="relative bg-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              さらば青春の光
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              2008年結成のお笑いコンビ。独自の世界観と鋭いネタで人気を博す。
              単独ライブ、テレビ、YouTubeなど幅広く活動中。
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-sm font-bold text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:text-right"
          >
            <h4 className="text-lg font-bold text-foreground mb-4">
              ニュースレター
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              最新情報をメールでお届けします
            </p>
            <form className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <input
                type="email"
                placeholder="メールアドレス"
                className="px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors"
              >
                登録
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs text-muted-foreground"
            >
              © 2026 さらば青春の光 Fan Site. All rights reserved.
            </motion.p>

            <motion.nav
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 0.03, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-[15vw] font-black text-foreground whitespace-nowrap leading-none translate-y-1/3"
        >
          SARABA SEISHUN
        </motion.div>
      </div>
    </footer>
  )
}
