"use client";

import { automationSystems } from "@/lib/data";
import FadeIn from "@/components/animations/FadeIn";
import Badge from "@/components/ui/Badge";

export default function Systems() {
  return (
    <section
      id="systems"
      className="bg-gradient-to-b from-white to-secondary py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-accent">
            Proven Systems
          </span>
          <h2 className="mb-4 text-3xl font-bold text-dark md:text-4xl">
            11 Automations That Transformed Operations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-dark-medium">
            Every system below is running in production, serving real clients,
            eliminating manual work.
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {automationSystems.map((system, index) => (
            <FadeIn key={system.title} delay={index * 0.05}>
              <article className="group relative overflow-hidden rounded-2xl border-2 border-secondary bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl">
                <div className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100" />
                <span className="mb-6 block text-4xl" role="img" aria-hidden>
                  {system.icon}
                </span>
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  {system.title}
                </h3>
                <p className="mb-4 text-[0.95rem] leading-relaxed text-dark-medium">
                  {system.description}
                </p>
                <Badge variant="accent">{system.impact}</Badge>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-16">
          <div className="rounded-2xl border-2 border-secondary bg-white p-8">
            <h3 className="mb-8 text-center text-lg font-semibold text-primary">
              Automation Pipeline
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono text-dark-medium">
              {[
                "Manual Work",
                "→",
                "Analysis",
                "→",
                "Automation",
                "→",
                "Scaled Delivery",
              ].map((step, i) => (
                <span
                  key={i}
                  className={
                    step === "→"
                      ? "text-accent"
                      : "rounded-lg bg-secondary px-4 py-2 font-semibold text-primary"
                  }
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
