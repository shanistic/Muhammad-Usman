"use client";

import {
  BarChart3,
  Building2,
  FileText,
  Gauge,
  Link2,
  Mail,
  MapPin,
  Share2,
  UserPlus,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { automationSystems } from "@/lib/data";
import FadeIn from "@/components/animations/FadeIn";

const categoryIcons: Record<string, LucideIcon> = {
  Content: FileText,
  Reporting: BarChart3,
  SEO: MapPin,
  Local: Building2,
  Performance: Gauge,
  Social: Share2,
  Operations: Users,
  Team: UserPlus,
  Technical: Link2,
  Media: Video,
  Sales: Mail,
};

export default function AutomationSystemsGrid() {
  return (
    <>
      <FadeIn className="mb-14 text-center">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-accent">
          Proven Systems
        </span>
        <h2 className="mb-4 text-3xl font-bold text-dark md:text-4xl">
          Production Automations in Daily Use
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-dark-medium">
          Eleven workflows running for real clients—each one built to remove a
          specific bottleneck, not to sit in a slide deck.
        </p>
      </FadeIn>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {automationSystems.map((system, index) => {
          const Icon = categoryIcons[system.category] ?? FileText;
          const step = String(index + 1).padStart(2, "0");

          return (
            <FadeIn key={system.title} delay={index * 0.04}>
              <article className="group relative flex h-full flex-col rounded-xl border border-secondary bg-white p-6 transition-all duration-300 hover:border-primary/25 hover:shadow-[0_12px_40px_-12px_rgba(22,61,72,0.18)] lg:p-7">
                <div
                  className="absolute inset-y-4 left-0 w-0.5 rounded-full bg-gradient-to-b from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-secondary bg-secondary/60 text-primary transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-xs font-medium tracking-wider text-dark-light">
                    {step}
                  </span>
                </div>

                <span className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {system.category}
                </span>

                <h3 className="mb-2.5 text-lg font-semibold leading-snug text-primary">
                  {system.title}
                </h3>

                <p className="mb-5 flex-1 text-sm leading-relaxed text-dark-medium">
                  {system.description}
                </p>

                <div className="border-t border-secondary pt-4">
                  <p className="font-mono text-xs font-medium text-primary">
                    <span className="text-dark-light">Outcome · </span>
                    {system.impact}
                  </p>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </>
  );
}
