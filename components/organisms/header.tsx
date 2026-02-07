"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  isVisible: boolean;
}

export function Header({ isVisible }: HeaderProps) {
  const navItems = [
    { label: "ホーム", href: "#" },
    { label: "メンバー", href: "#members" },
    { label: "ライブ", href: "#live" },
    { label: "ニュース", href: "#news" },
    { label: "グッズ", href: "#goods" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Link
            href="/"
            className="text-xl font-bold tracking-wider text-foreground hover:text-accent transition-colors"
          >
            <span className="text-2xl font-bold tracking-wider text-foreground">
              <Image
                src="/assets/logo.png"
                alt="さらば青春の光"
                width={100}
                height={100}
              />
            </span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
            >
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="md:hidden text-foreground"
          aria-label="メニュー"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>
      </div>
    </motion.header>
  );
}
