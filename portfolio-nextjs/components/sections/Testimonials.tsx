"use client";

import { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/data";
import FadeIn from "@/components/animations/FadeIn";

// Custom LinkedIn Icon
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Testimonials() {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-accent">
            LinkedIn Recommendations
          </span>
          <h2 className="mb-4 text-3xl font-bold text-dark md:text-4xl">
            What Leaders Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-dark-medium">
            Real recommendations from managers and leaders I&apos;ve worked with
          </p>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => {
            const isExpanded = expandedCards[index];
            const shouldTruncate = testimonial.quote.length > 400;
            const displayQuote = isExpanded || !shouldTruncate 
              ? testimonial.quote 
              : truncateText(testimonial.quote, 400);

            return (
              <FadeIn
                key={testimonial.author}
                delay={index * 0.1}
              >
                <article className="group flex h-full flex-col rounded-[20px] border-2 border-secondary bg-white p-8 transition-all duration-300 hover:border-accent hover:shadow-xl">
                  {/* Quote Icon */}
                  <span
                    className="mb-4 text-5xl font-serif text-accent/30"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  
                  {/* Quote Text */}
                  <div className="mb-4 flex-1">
                    <p className="text-[0.95rem] leading-relaxed text-dark-medium">
                      {displayQuote}
                    </p>
                    
                    {/* View More Button */}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleCard(index)}
                        className="mt-3 text-sm font-semibold text-accent hover:text-primary transition-colors"
                      >
                        {isExpanded ? "Show Less" : "View More"}
                      </button>
                    )}
                  </div>

                  {/* Author Info */}
                  <div className="border-t-2 border-secondary pt-6">
                    <div className="flex items-start gap-4">
                      <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-secondary">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <a
                            href={testimonial.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:text-accent transition-colors truncate"
                            aria-label={`View ${testimonial.author}'s LinkedIn profile`}
                          >
                            {testimonial.author}
                          </a>
                          <a
                            href={testimonial.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-accent hover:text-primary transition-colors"
                            aria-label={`View ${testimonial.author}'s LinkedIn profile`}
                          >
                            <LinkedInIcon className="h-4 w-4" />
                          </a>
                        </div>
                        <p className="text-sm text-dark-medium line-clamp-2">
                          {testimonial.position}
                        </p>
                        <p className="text-xs text-dark-light mt-1">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
