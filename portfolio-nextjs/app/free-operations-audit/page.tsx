"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  Calendar,
  ChevronRight,
  Send,
  BarChart3,
  Star,
  User,
  BarChart,
  Wrench,
  Settings,
  Rocket,
  Trophy,
  Download,
} from "lucide-react";
import Link from "next/link";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { auditSections, getTier, type AuditSection } from "@/lib/audit-data";
import { cn } from "@/lib/utils";

/* ─────────────────── ICON MAP ─────────────────── */
const sectionIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  reporting: BarChart,
  delivery: Wrench,
  onboarding: Settings,
  growth: Rocket,
};

/* ─────────────────── STEP DEFINITIONS ─────────────────── */
// step 0 = intro, 1 = contact, 2-5 = sections, 6 = results
const TOTAL_STEPS = 7;

/* ─────────────────── ANIMATED PARTICLES ─────────────────── */
function FloatingParticles() {
  // Use fixed seed-based values to ensure server/client consistency
  const particles = Array.from({ length: 20 }, (_, i) => {
    // Use index as seed for consistent "random" values
    const seed1 = (i * 23 + 17) % 100;
    const seed2 = (i * 37 + 29) % 100;
    const seed3 = (i * 53 + 41) % 100;
    const seed4 = (i * 71 + 13) % 100;
    
    return {
      width: (seed1 % 6) + 2,
      height: (seed2 % 6) + 2,
      left: seed3,
      top: seed4,
      xOffset: (seed1 % 20) - 10,
      duration: (seed2 % 4) + 4,
      delay: (seed3 % 30) / 10,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/20"
          style={{
            width: particle.width,
            height: particle.height,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────── PROGRESS BAR ─────────────────── */
function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = (current / total) * 100;
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-primary"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-accent/20"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ filter: "blur(4px)" }}
      />
    </div>
  );
}

/* ─────────────────── STEP INDICATOR DOTS ─────────────────── */
function StepDots({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const stepIcons = [
    Clock, // Start
    User, // Contact
    BarChart, // Reporting
    Wrench, // Delivery
    Settings, // Onboarding
    Rocket, // Growth
    Trophy, // Results
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length: total }).map((_, i) => {
        const IconComponent = stepIcons[i];
        return (
          <motion.button
            key={i}
            className={cn(
              "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all cursor-default",
              i === current
                ? "bg-accent text-white shadow-lg shadow-accent/30 scale-110"
                : i < current
                  ? "bg-accent/30 text-accent"
                  : "bg-secondary text-dark-light"
            )}
            whileHover={i < current ? { scale: 1.1 } : {}}
          >
            {i < current ? (
              <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" />
            ) : (
              <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─────────────────── ANIMATED COUNTER ─────────────────── */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };

    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span>{display}</span>;
}

/* ─────────────────── SCORE RING ─────────────────── */
function ScoreRing({
  score,
  max,
}: {
  score: number;
  max: number;
}) {
  const pct = score / max;
  const r = 80;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);
  const tier = getTier(score);

  return (
    <div className="relative flex h-52 w-52 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="rgba(231, 238, 242, 0.8)"
          strokeWidth="12"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2e7d8f" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 text-center">
        <div className="text-5xl font-bold text-dark">
          <AnimatedNumber value={score} />
        </div>
        <div className="text-sm text-dark-light">out of {max}</div>
      </div>
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0.15] }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        style={{
          background:
            "radial-gradient(circle, rgba(46,125,143,0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ─────────────────── SECTION SCORE BAR ─────────────────── */
function SectionScoreBar({
  section,
  score,
  max,
  delay,
}: {
  section: AuditSection;
  score: number;
  max: number;
  delay: number;
}) {
  const pct = (score / max) * 100;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-secondary bg-white/80 p-4"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-dark-medium flex items-center gap-2">
          {(() => {
            const IconComponent = sectionIconMap[section.id];
            return <IconComponent className="h-4 w-4 text-accent" />;
          })()}
          {section.title}
        </span>
        <span className="text-sm font-bold text-dark">
          {score}/{max}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={cn(
            "h-full rounded-full",
            pct >= 80
              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
              : pct >= 50
                ? "bg-gradient-to-r from-amber-500 to-amber-400"
                : "bg-gradient-to-r from-red-500 to-orange-400"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════ PDF DOWNLOAD FUNCTION ═══════════════════ */
async function generateAuditPDF(
  contact: { name: string; agency: string; email: string; linkedinUrl: string },
  answers: Record<string, number>,
  totalScore: number,
  sectionScores: Array<{ name: string; score: number; max: number }>
) {
  // Create a hidden div to render the content for PDF capture
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.width = "800px";
  container.style.padding = "40px";
  container.style.backgroundColor = "#fff";
  container.style.fontFamily = "Arial, sans-serif";
  
  // Create the HTML content for PDF
  const tier = getTier(totalScore);
  
  container.innerHTML = `
    <div style="margin-bottom: 40px; border-bottom: 2px solid #2e7d8f; padding-bottom: 20px;">
      <h1 style="color: #0a1f27; margin: 0 0 10px 0; font-size: 32px;">Agency Operations Audit Results</h1>
      <p style="color: #476b76; margin: 10px 0; font-size: 14px;">Completed on ${new Date().toLocaleDateString()}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #163d48; margin-bottom: 15px; font-size: 20px;">Contact Information</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #e7eef2;">
          <td style="padding: 10px 0; font-weight: bold; color: #163d48; width: 200px;">Name:</td>
          <td style="padding: 10px 0; color: #476b76;">${contact.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e7eef2;">
          <td style="padding: 10px 0; font-weight: bold; color: #163d48;">Agency:</td>
          <td style="padding: 10px 0; color: #476b76;">${contact.agency}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e7eef2;">
          <td style="padding: 10px 0; font-weight: bold; color: #163d48;">Email:</td>
          <td style="padding: 10px 0; color: #476b76;">${contact.email}</td>
        </tr>
        ${contact.linkedinUrl ? `
        <tr style="border-bottom: 1px solid #e7eef2;">
          <td style="padding: 10px 0; font-weight: bold; color: #163d48;">LinkedIn:</td>
          <td style="padding: 10px 0; color: #476b76;"><a href="${contact.linkedinUrl}" style="color: #2e7d8f; text-decoration: none;">${contact.linkedinUrl}</a></td>
        </tr>
        ` : ''}
      </table>
    </div>

    <div style="margin-bottom: 30px; background: #f0f5f7; padding: 20px; border-radius: 8px; text-align: center;">
      <h2 style="color: #163d48; margin: 0 0 10px 0; font-size: 24px;">Overall Score</h2>
      <div style="font-size: 48px; font-weight: bold; color: #2e7d8f; margin-bottom: 10px;">${totalScore}/24</div>
      <div style="font-size: 18px; font-weight: bold; color: #163d48; margin-bottom: 5px;">${tier.label}</div>
      <p style="color: #476b76; margin: 10px 0; font-size: 13px; line-height: 1.6;">${tier.description}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #163d48; margin-bottom: 15px; font-size: 20px;">Section Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${sectionScores.map(section => `
        <tr style="border-bottom: 1px solid #e7eef2;">
          <td style="padding: 12px 0; font-weight: bold; color: #163d48; width: 60%;">${section.name}</td>
          <td style="padding: 12px 0; text-align: right; color: #2e7d8f; font-weight: bold;">${section.score}/${section.max}</td>
        </tr>
        `).join('')}
      </table>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #163d48; margin-bottom: 15px; font-size: 20px;">Recommendation</h2>
      <p style="color: #476b76; line-height: 1.6; font-size: 14px; margin: 0;">${tier.recommendation}</p>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #2e7d8f; font-size: 12px; color: #9ca3af; text-align: center;">
      <p style="margin: 5px 0;">Agency Operations Audit | Muhammad Usman</p>
      <p style="margin: 5px 0;">www.muhammad-usman-ops.com</p>
    </div>
  `;

  document.body.appendChild(container);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Create PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF, splitting into multiple pages if needed
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // A4 height in mm

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    // Download PDF
    pdf.save(`audit-results-${contact.name.replace(/\s+/g, "-")}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}

/* ═══════════════════ MAIN PAGE COMPONENT ═══════════════════ */
export default function AuditPage() {
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState({
    name: "",
    agency: "",
    email: "",
    linkedinUrl: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── helpers ── */
  const sectionIndex = step - 2; // which auditSections[] we're on
  const currentSection =
    sectionIndex >= 0 && sectionIndex < auditSections.length
      ? auditSections[sectionIndex]
      : null;

  const totalScore = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers]
  );

  const sectionScore = (sec: AuditSection) =>
    sec.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);

  const isSectionComplete = (sec: AuditSection) =>
    sec.questions.every((q) => answers[q.id] !== undefined);

  const isContactValid =
    contact.name.trim() !== "" &&
    contact.agency.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);

  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return isContactValid;
    if (step >= 2 && step <= 5) return currentSection ? isSectionComplete(currentSection) : false;
    return false;
  };

  const goNext = () => {
    if (!canProceed()) return;
    
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: "instant" });
    
    setDirection(1);
    
    // If moving to results page (step 6), submit the form
    if (step === 5) {
      submitAudit();
    }
    
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const submitAudit = async () => {
    setIsSubmitting(true);
    try {
      const tier = getTier(totalScore);
      
      const response = await fetch('/api/submit-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact,
          answers,
          totalScore,
          tier: {
            label: tier.label,
            description: tier.description,
            recommendation: tier.recommendation,
          },
        }),
      });

      if (!response.ok) {
        console.error('Failed to submit audit');
      }
    } catch (error) {
      console.error('Error submitting audit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: "instant" });
    
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const selectAnswer = (qId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleDownloadPDF = async () => {
    const sectionScores = auditSections.map(section => ({
      name: section.title,
      score: sectionScore(section),
      max: section.questions.length * 2,
    }));

    await generateAuditPDF(contact, answers, totalScore, sectionScores);
  };

  /* ── page‑transition variants ── */
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.97,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.97,
    }),
  };

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-secondary">
      {/* Background decoration */}
      <FloatingParticles />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(46,125,143,0.08),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(231, 238, 242, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(231, 238, 242, 0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8 sm:px-6 lg:px-8"
      >
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-dark transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* ── Progress ── */}
        {step > 0 && step < TOTAL_STEPS - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 space-y-4"
          >
            <ProgressBar current={step} total={TOTAL_STEPS - 2} />
            <StepDots current={step} total={TOTAL_STEPS} />
          </motion.div>
        )}

        {/* ── Main content area ── */}
        <div className="relative flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* ─── STEP 0: INTRO ─── */}
              {step === 0 && (
                <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary shadow-lg shadow-accent/20"
                  >
                    <BarChart3 className="h-10 w-10 text-white" />
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
                  >
                    <Clock className="h-4 w-4" /> 3-Minute Assessment
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 text-3xl font-bold leading-tight text-dark sm:text-4xl lg:text-5xl"
                  >
                    Agency Operations Audit:{" "}
                    <span className="bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
                      Find Your Hidden 40+ Hours/Week
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 max-w-2xl text-lg leading-relaxed text-dark-medium"
                  >
                    Most agency founders believe their growth problem is about
                    getting more clients. In most cases, it&apos;s not. The real
                    problem is that your operations don&apos;t scale. This
                    12-question scorecard shows you exactly where the weight is
                    coming from.
                  </motion.p>

                  {/* Scoring guide */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-10 grid max-w-md grid-cols-3 gap-3"
                  >
                    {[
                      {
                        score: "0",
                        label: "Fully Manual",
                        desc: "Done by hand",
                        color: "border-red-500/40 bg-red-50",
                      },
                      {
                        score: "1",
                        label: "Partially",
                        desc: "Some automation",
                        color: "border-amber-500/40 bg-amber-50",
                      },
                      {
                        score: "2",
                        label: "Fully Auto",
                        desc: "No intervention",
                        color: "border-emerald-500/40 bg-emerald-50",
                      },
                    ].map((item) => (
                      <div
                        key={item.score}
                        className={cn(
                          "rounded-xl border p-3 text-center",
                          item.color
                        )}
                      >
                        <div className="text-2xl font-bold text-dark">
                          {item.score}
                        </div>
                        <div className="text-xs font-semibold text-dark-medium">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-dark-light">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={goNext}
                    className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-accent to-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent/20 transition-shadow hover:shadow-xl hover:shadow-accent/30 cursor-pointer"
                  >
                    Start Your Audit
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 flex items-center gap-4 text-sm text-dark-light"
                  >
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> ~3 minutes
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5" /> 12 questions
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" /> Instant results
                    </span>
                  </motion.div>
                </div>
              )}

              {/* ─── STEP 1: CONTACT INFO ─── */}
              {step === 1 && (
                <div className="mx-auto max-w-lg">
                  <div className="mb-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent"
                    >
                      <User className="h-7 w-7" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-dark">
                      Contact Information
                    </h2>
                    <p className="mt-2 text-sm text-dark-light">
                      Tell us about you and your agency
                    </p>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        id: "name",
                        label: "Your Name",
                        placeholder: "John Doe",
                        value: contact.name,
                        key: "name" as const,
                      },
                      {
                        id: "agency",
                        label: "Agency Name",
                        placeholder: "Acme Agency",
                        value: contact.agency,
                        key: "agency" as const,
                      },
                      {
                        id: "email",
                        label: "Email Address",
                        placeholder: "john@acmeagency.com",
                        value: contact.email,
                        key: "email" as const,
                        type: "email",
                      },
                      {
                        id: "linkedinUrl",
                        label: "LinkedIn Profile (Optional)",
                        placeholder: "https://linkedin.com/in/johndoe",
                        value: contact.linkedinUrl,
                        key: "linkedinUrl" as const,
                        type: "url",
                      },
                    ].map((field, i) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                      >
                        <label
                          htmlFor={field.id}
                          className="mb-2 block text-sm font-medium text-dark-medium"
                        >
                          {field.label}{" "}
                          {field.key !== "linkedinUrl" && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          id={field.id}
                          type={field.type || "text"}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) =>
                            setContact((prev) => ({
                              ...prev,
                              [field.key]: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-secondary bg-white px-4 py-3.5 text-dark placeholder-dark-light/40 outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEPS 2-5: QUESTION SECTIONS ─── */}
              {step >= 2 && step <= 5 && currentSection && (
                <div className="mx-auto max-w-2xl">
                  {/* Section header */}
                  <div className="mb-8 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent"
                    >
                      {(() => {
                        const IconComponent = sectionIconMap[currentSection.id];
                        return <IconComponent className="h-7 w-7" />;
                      })()}
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl font-bold text-dark"
                    >
                      {currentSection.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-2 text-sm text-dark-light"
                    >
                      {currentSection.description}
                    </motion.p>
                  </div>

                  {/* Questions */}
                  <div className="space-y-6">
                    {currentSection.questions.map((q, qi) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + qi * 0.12 }}
                        className="rounded-2xl border border-secondary bg-white/80 p-5 sm:p-6 backdrop-blur-sm"
                      >
                        <h3 className="mb-1 text-base font-semibold text-dark sm:text-lg">
                          Q{auditSections
                            .slice(0, sectionIndex)
                            .reduce((n, s) => n + s.questions.length, 0) +
                            qi +
                            1}
                          . {q.question}
                        </h3>
                        <p className="mb-4 text-xs leading-relaxed text-dark-light">
                          {q.helpText}
                        </p>

                        <div className="space-y-2.5">
                          {q.options.map((opt) => {
                            const selected = answers[q.id] === opt.value;
                            return (
                              <motion.button
                                key={opt.value}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => selectAnswer(q.id, opt.value)}
                                className={cn(
                                  "group w-full cursor-pointer rounded-xl border p-3.5 text-left text-sm transition-all sm:p-4",
                                  selected
                                    ? "border-accent/50 bg-accent/10 text-dark shadow-md shadow-accent/10"
                                    : "border-secondary bg-white text-dark-medium hover:border-accent/30 hover:bg-secondary/50"
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={cn(
                                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                                      selected
                                        ? "border-accent bg-accent text-white"
                                        : "border-dark-light text-dark-light group-hover:border-accent"
                                    )}
                                  >
                                    {selected ? (
                                      <CheckCircle2 className="h-3.5 w-3.5" />
                                    ) : (
                                      opt.value
                                    )}
                                  </div>
                                  <span className="leading-relaxed">
                                    {opt.label}
                                  </span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 6: RESULTS ─── */}
              {step === 6 && (
                <div className="mx-auto max-w-2xl text-center">
                  {/* Celebration burst */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                    }}
                    className="mb-2"
                  >
                    <div className="mx-auto mb-6 flex justify-center">
                      <ScoreRing score={totalScore} max={24} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="mb-2 text-3xl font-bold text-dark sm:text-4xl">
                      Thank You, {contact.name}!
                    </h2>
                    <p className="mb-2 text-lg text-dark-medium">
                      Here&apos;s your Agency Operations Score
                    </p>
                  </motion.div>

                  {/* Tier badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className={cn(
                      "mx-auto mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold",
                      getTier(totalScore).bgColor,
                      getTier(totalScore).borderColor,
                      getTier(totalScore).color
                    )}
                  >
                    <Star className="h-4 w-4" />
                    {getTier(totalScore).label}
                  </motion.div>

                  {/* Tier description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-dark-medium"
                  >
                    {getTier(totalScore).description}
                  </motion.p>

                  {/* Section breakdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-10 space-y-3 text-left"
                  >
                    <h3 className="mb-4 text-center text-lg font-semibold text-dark">
                      Section Breakdown
                    </h3>
                    {auditSections.map((sec, i) => (
                      <SectionScoreBar
                        key={sec.id}
                        section={sec}
                        score={sectionScore(sec)}
                        max={sec.questions.length * 2}
                        delay={0.9 + i * 0.15}
                      />
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="rounded-2xl border border-accent/30 bg-accent/5 p-6 sm:p-8"
                  >
                    <h3 className="mb-3 text-xl font-bold text-dark flex items-center justify-center gap-2">
                      <Calendar className="h-6 w-6 text-accent" />
                      Ready to Get Your Hours Back?
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-dark-medium text-center">
                      {getTier(totalScore).recommendation}
                    </p>

                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                      <a
                        href="https://cal.com/muhammad-usman-ops/free-operations-audit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:shadow-accent/30"
                      >
                        <Calendar className="h-5 w-5" />
                        Book Free 30-Min Audit Call
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                      <button
                        onClick={handleDownloadPDF}
                        className="group inline-flex items-center gap-2 rounded-xl border border-accent bg-accent/10 px-6 py-3.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20 hover:border-accent"
                      >
                        <Download className="h-5 w-5" />
                        Download as PDF
                      </button>
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl border border-secondary px-6 py-3.5 text-sm font-medium text-dark-medium transition-all hover:border-accent/30 hover:text-dark"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation buttons ── */}
        {step > 0 && step < TOTAL_STEPS - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex items-center justify-between border-t border-secondary pt-6"
          >
            <button
              onClick={goBack}
              className="inline-flex items-center gap-2 rounded-xl border border-secondary bg-white px-5 py-3 text-sm font-medium text-dark-medium transition-all hover:border-accent/30 hover:text-dark cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="text-xs text-dark-light">
              Step {step} of {TOTAL_STEPS - 2}
            </div>

            <motion.button
              whileHover={canProceed() ? { scale: 1.03 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
              onClick={goNext}
              disabled={!canProceed()}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all cursor-pointer",
                canProceed()
                  ? "bg-gradient-to-r from-accent to-primary text-white shadow-lg shadow-accent/20 hover:shadow-xl"
                  : "bg-secondary text-dark-light cursor-not-allowed border border-secondary"
              )}
            >
              {step === 5 ? (
                <>
                  See My Score <Send className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
