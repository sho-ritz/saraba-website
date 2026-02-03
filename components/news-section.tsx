"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const news = [
    {
      date: "2026.02.03",
      category: "LIVE",
      title: "全国ツアー「青春よ、さらば」追加公演決定！",
      description: "大好評につき、東京・大阪で追加公演が決定しました。"
    },
    {
      date: "2026.01.28",
      category: "TV",
      title: "レギュラー番組「さらば青春の光のブラックラブレター」放送開始",
      description: "毎週土曜深夜25時放送スタート。"
    },
    {
      date: "2026.01.15",
      category: "GOODS",
      title: "オリジナルグッズ新作発売",
      description: "ファン待望の新作グッズがオンラインショップで販売開始。"
    },
    {
      date: "2026.01.10",
      category: "EVENT",
      title: "単独ライブDVD発売記念イベント開催",
      description: "購入者限定のサイン会&トークショーを実施。"
    }
  ]

  return (
    <section ref={sectionRef} id="news" className="relative bg-background py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-xs tracking-[0.3em] text-muted-foreground block mb-4">
              LATEST NEWS
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              最新ニュース
            </h2>
          </div>
          <motion.a
            href="#"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            whileHover={{ x: 5 }}
          >
            <span className="text-sm tracking-widest">VIEW ALL</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* News List */}
        <div className="space-y-0">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-8 border-t border-border hover:bg-card/50 transition-colors px-4 -mx-4 rounded-lg">
                {/* Date & Category */}
                <div className="flex items-center gap-4 md:w-48 shrink-0">
                  <span className="text-sm text-muted-foreground font-mono">
                    {item.date}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-border group-hover:border-foreground group-hover:bg-foreground transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg 
                    className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
