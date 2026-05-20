"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useInView } from "framer-motion";
import {
  BarChart3,
  Cog,
  Rocket,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pipelineSteps: {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
}[] = [
  {
    icon: Workflow,
    title: "Manual Work",
    description: "Repetitive tasks, scattered tools, and delivery bottlenecks.",
    metric: "40+ hrs / week",
  },
  {
    icon: BarChart3,
    title: "Analysis",
    description: "Map workflows, find leaks, and prioritize high-ROI wins.",
    metric: "Full audit",
  },
  {
    icon: Cog,
    title: "Automation",
    description: "Production systems wired into your stack and team habits.",
    metric: "11+ live systems",
  },
  {
    icon: Rocket,
    title: "Scaled Delivery",
    description: "More clients, same headcount, predictable operations.",
    metric: "70+ businesses",
  },
];

type LinePosition = { left: number; width: number; top: number };

export default function AutomationPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstIconRef = useRef<HTMLDivElement>(null);
  const lastIconRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px", amount: 0.2 });
  const [linePosition, setLinePosition] = useState<LinePosition | null>(null);
  const [lineActive, setLineActive] = useState(false);

  const updateLinePosition = useCallback(() => {
    const track = trackRef.current;
    const firstIcon = firstIconRef.current;
    const lastIcon = lastIconRef.current;

    if (!track || !firstIcon || !lastIcon) return;

    const trackRect = track.getBoundingClientRect();
    const firstRect = firstIcon.getBoundingClientRect();
    const lastRect = lastIcon.getBoundingClientRect();

    const left = firstRect.left + firstRect.width / 2 - trackRect.left;
    const width = lastRect.left + lastRect.width / 2 - firstRect.left - firstRect.width / 2;
    // Statically use 28px (half of the 56px / h-14 icon height) for top alignment.
    // This prevents measuring the icon while it is shifted down by 14px during the entry animation.
    const top = 28;

    if (width <= 0) return;

    setLinePosition((prev) => {
      if (
        prev &&
        Math.abs(prev.left - left) < 1 &&
        Math.abs(prev.width - width) < 1 &&
        Math.abs(prev.top - top) < 1
      ) {
        return prev;
      }
      return { left, width, top };
    });
  }, []);

  useLayoutEffect(() => {
    if (!isInView) return;

    updateLinePosition();

    const onResize = () => {
      updateLinePosition();
    };

    const track = trackRef.current;
    if (!track) return;

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(track);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [isInView, updateLinePosition]);

  useEffect(() => {
    if (!linePosition || !isInView) {
      setLineActive(false);
      return;
    }

    setLineActive(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setLineActive(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [linePosition, isInView]);

  const lineStyle: CSSProperties | undefined = linePosition
    ? {
        left: linePosition.left,
        width: linePosition.width,
        top: linePosition.top,
        ["--pipeline-width" as string]: `${linePosition.width}px`,
      }
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`pipeline-container relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary via-primary-700 to-accent p-px shadow-2xl shadow-primary/20 ${isInView ? "pipeline-visible" : ""}`}
    >
      <div className="relative overflow-hidden rounded-[23px] bg-[#0a1f27] px-6 pt-6 pb-10 sm:px-10 sm:pt-8 sm:pb-12 lg:px-14">
        <div
          className="pipeline-glow pipeline-glow-accent pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pipeline-glow pipeline-glow-primary pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-primary-400/10 blur-3xl"
          aria-hidden
        />
        <div className="pipeline-grid-bg pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />

        <div className="pipeline-header relative mb-10 text-center sm:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="pipeline-live-dot relative flex h-2 w-2 rounded-full bg-success" />
            Live in production
          </span>
          <h3 className="text-2xl font-bold text-white md:text-3xl">
            Automation Pipeline
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            How manual agency work becomes repeatable, automated delivery at
            scale.
          </p>
        </div>

        <div ref={trackRef} className="relative">
          {linePosition && (
            <div
              className={`pipeline-line pointer-events-none absolute hidden h-px lg:block ${lineActive ? "is-active" : ""}`}
              style={lineStyle}
              aria-hidden
            >
              <div className="pipeline-line-track h-full w-full bg-gradient-to-r from-white/10 via-accent/60 to-success/80" />
              <div className="pipeline-flow-dot absolute top-1/2 h-2 w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          )}

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="pipeline-step group relative flex flex-col items-center text-center lg:items-stretch lg:text-left"
                  style={{ transitionDelay: `${80 + index * 70}ms` }}
                >
                  {index < pipelineSteps.length - 1 && (
                    <div
                      className="absolute -bottom-4 left-1/2 hidden h-8 w-px -translate-x-1/2 bg-gradient-to-b from-accent/50 to-transparent sm:block lg:hidden"
                      aria-hidden
                    />
                  )}

                  <div
                    ref={
                      index === 0
                        ? firstIconRef
                        : index === pipelineSteps.length - 1
                          ? lastIconRef
                          : undefined
                    }
                    className="pipeline-icon relative z-10 mx-auto mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 shadow-lg lg:mx-0"
                  >
                    <Icon className="relative h-6 w-6 text-accent" strokeWidth={1.75} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h4 className="mb-1 text-lg font-semibold text-white">
                      {step.title}
                    </h4>
                    <p className="mb-3 text-sm leading-relaxed text-white/55">
                      {step.description}
                    </p>
                    <span className="mt-auto inline-flex w-fit items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-medium text-accent lg:mx-0 mx-auto">
                      {step.metric}
                    </span>
                  </div>


                </li>
              );
            })}
          </ol>
        </div>

        <div className="pipeline-tools relative mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-8 sm:mt-12">
          {["Zapier", "Make", "n8n", "Airtable", "APIs"].map((tool, i) => (
            <span
              key={tool}
              className="pipeline-tool rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50"
              style={{ transitionDelay: `${450 + i * 50}ms` }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

