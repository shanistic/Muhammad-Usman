"use client";

import { Check } from "lucide-react";
import { bookingBenefits } from "@/lib/data";
import FadeIn from "@/components/animations/FadeIn";

export default function Booking() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-24"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-spin rounded-full border border-white/10" style={{ animationDuration: "30s" }} />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-12 text-center text-white">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-white/70">
            Free Operations Audit
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Let&apos;s Find Your 40+ Hidden Hours
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Book a free 30-minute audit where I&apos;ll map your current
            workflow, identify your biggest bottlenecks, and show you exactly
            how to eliminate manual work.
          </p>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="rounded-[20px] border border-white/20 bg-white/10 p-8 backdrop-blur-md lg:p-12">
              <h3 className="mb-6 text-xl font-bold text-white">
                What You&apos;ll Get:
              </h3>
              <ul className="mb-8 space-y-4">
                {bookingBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-white/90">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-white/15 p-6 text-sm leading-relaxed text-white/90">
                No pitch. No obligation. Just tactical insights you can
                implement immediately. Even if we never work together,
                you&apos;ll leave with a clear roadmap to eliminate operational
                bottlenecks.
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-3">
            <div className="overflow-hidden rounded-[20px] bg-white shadow-2xl">
              <iframe
                src="https://cal.com/muhammad-usman-940b2a274/30min"
                width="100%"
                height="700"
                style={{ border: 0 }}
                title="Book Free Operations Audit"
                className="w-full"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
