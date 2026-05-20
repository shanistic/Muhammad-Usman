"use client";

import { Check, X } from "lucide-react";
import { problemPoints, solutionPoints } from "@/lib/data";
import FadeIn from "@/components/animations/FadeIn";

export default function ProblemSolution() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-accent">
            The Problem
          </span>
          <h2 className="mb-4 text-3xl font-bold text-dark md:text-4xl">
            Every New Client Adds More Manual Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-dark-medium">
            Marketing agencies hit a scaling wall when delivery depends on
            manual processes. Each new client multiplies repetitive work
            instead of revenue.
          </p>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn delay={0.1} className="h-full">
            <div className="group h-full rounded-3xl border border-secondary bg-white p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-secondary/80">
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-dark-light">
                Bottleneck
              </span>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <X className="h-4 w-4" />
                </div>
                <h3 className="text-xl font-bold text-primary md:text-2xl">
                  Without Automation
                </h3>
              </div>
              <p className="mb-8 text-sm text-dark-medium leading-relaxed">
                Manual, repetitive workflows that limit your agency's throughput and cap your maximum profit margins.
              </p>

              <ul className="space-y-4">
                {problemPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-dark-medium"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500/80" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-accent/20 bg-primary p-8 md:p-10 text-white transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5">
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
              
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-white/60">
                Efficiency
              </span>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  With Automation
                </h3>
              </div>
              <p className="mb-8 text-sm text-white/80 leading-relaxed">
                Continuous production systems that handle the heavy lifting, allowing your team to scale without limits.
              </p>

              <ul className="space-y-4">
                {solutionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-white/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
