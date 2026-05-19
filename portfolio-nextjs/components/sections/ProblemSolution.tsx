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
          <FadeIn delay={0.1}>
            <div className="group relative overflow-hidden rounded-2xl bg-secondary p-8 transition-transform duration-300 hover:-translate-y-1">
              <X className="absolute right-6 top-6 h-16 w-16 text-dark-light/30" />
              <h3 className="mb-6 text-2xl font-bold text-dark">
                Without Automation
              </h3>
              <ul className="space-y-4">
                {problemPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-dark-medium"
                  >
                    <span className="mt-1 text-dark-light">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-white transition-transform duration-300 hover:-translate-y-1">
              <Check className="absolute right-6 top-6 h-16 w-16 text-white/20" />
              <h3 className="mb-4 text-2xl font-bold">With Automation</h3>
              <p className="mb-6 text-white/80">
                Production systems that run continuously—freeing your team to
                focus on strategy and growth.
              </p>
              <ul className="space-y-4">
                {solutionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    {point}
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
