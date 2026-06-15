"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { stats, heroSystems } from "@/lib/data";
import { smoothScroll } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import GridPattern from "@/components/ui/GridPattern";
import CodeSnippet from "@/components/ui/CodeSnippet";
import FadeIn from "@/components/animations/FadeIn";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-secondary pt-12 md:pt-16"
    >
      <GridPattern />
      <div className="hidden lg:block">
        <CodeSnippet />
      </div>

      <div className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-40 w-40 rotate-45 border border-accent/20" />

      <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-16 lg:px-8 lg:pt-12 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <FadeIn delay={0}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                ✦ Agency Operations Expert
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-dark text-balance md:text-5xl lg:text-6xl">
                Eliminate{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  40+ Hours/Week
                </span>{" "}
                of Manual Agency Work
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-dark-medium">
                I run automated delivery systems for 50+ websites and 70+
                businesses. Helping marketing agencies eliminate manual work
                with production-ready automation systems.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-secondary bg-white/80 p-4 text-center backdrop-blur-sm"
                  >
                    <div className="text-3xl font-bold text-primary">
                      <Counter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 text-sm text-dark-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
                <span className="font-mono text-dark-light">
                  All systems operational
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => smoothScroll("booking")}>
                  Book Free Audit Call
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link href="/free-operations-audit">
                  <Button
                    variant="secondary"
                    size="lg"
                    type="button"
                  >
                    Take Free Operations Audit
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="left" className="lg:col-span-2 lg:mt-0">
            {/* Mobile: animation sits above card, card overlaps bottom 40% of animation */}
            <div className="relative block lg:hidden">
              <CodeSnippet className="pointer-events-none relative w-full select-none opacity-75" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 -mt-28 mx-2 rounded-2xl border-2 border-secondary bg-white p-8 shadow-xl"
              >
                <h3 className="mb-6 text-xl font-bold text-primary">
                  20+ Production Systems Built
                </h3>
                <ul className="space-y-4">
                  {heroSystems.map((system) => (
                    <li key={system} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span className="text-sm text-dark-medium">{system}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Desktop: just the floating card, animation is absolutely positioned via CodeSnippet */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block rounded-2xl border-2 border-secondary bg-white p-8 shadow-xl"
            >
              <h3 className="mb-6 text-xl font-bold text-primary">
                20+ Production Systems Built
              </h3>
              <ul className="space-y-4">
                {heroSystems.map((system) => (
                  <li key={system} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <span className="text-sm text-dark-medium">{system}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}