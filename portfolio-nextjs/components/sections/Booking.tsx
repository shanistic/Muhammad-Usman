"use client";

import { Check } from "lucide-react";
import { bookingBenefits } from "@/lib/data";
import FadeIn from "@/components/animations/FadeIn";
import CalInlineEmbed from "@/components/CalInlineEmbed";

export default function Booking() {
  const benefitsMid = Math.ceil(bookingBenefits.length / 2);
  const benefitsLeft = bookingBenefits.slice(0, benefitsMid);
  const benefitsRight = bookingBenefits.slice(benefitsMid);

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-24"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-spin rounded-full border border-white/10" style={{ animationDuration: "30s" }} />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-10 text-center text-white">
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

        <FadeIn delay={0.1} className="mb-10 w-full">
          <CalInlineEmbed />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="w-full rounded-[20px] border border-white/20 bg-white/10 p-8 backdrop-blur-md lg:p-10">
            <h3 className="mb-8 text-center text-xl font-bold text-white lg:mb-10">
              What You&apos;ll Get:
            </h3>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <ul className="space-y-4">
                {benefitsLeft.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-white/90">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <ul className="space-y-4">
                {benefitsRight.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-white/90">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 rounded-xl bg-white/15 p-6 text-center text-sm leading-relaxed text-white/90 md:mt-10">
              No pitch. No obligation. Just tactical insights you can implement
              immediately. Even if we never work together, you&apos;ll leave with
              a clear roadmap to eliminate operational bottlenecks.
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
