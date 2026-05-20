"use client";

import { testimonials } from "@/lib/data";
import FadeIn from "@/components/animations/FadeIn";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-accent">
            What Founders Say
          </span>
          <h2 className="mb-4 text-3xl font-bold text-dark md:text-4xl">
            Trusted by Real Agencies
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-dark-medium">
            Companies I&apos;ve worked with building operational systems that
            transform delivery.
          </p>
        </FadeIn>

        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        <div className="no-scrollbar flex w-full gap-6 overflow-x-auto pb-8 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn
              key={testimonial.company}
              delay={index * 0.1}
              className="w-[85vw] max-w-[360px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none"
            >
              <article className="group flex h-full flex-col rounded-[20px] border-2 border-transparent bg-secondary p-10 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl">
                <span
                  className="mb-4 text-5xl font-serif text-accent/30"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="mb-6 flex-1 text-[1.05rem] leading-relaxed text-dark-medium">
                  {testimonial.quote}
                </p>
                <div className="border-t-2 border-secondary pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-dark-medium">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
