"use client";

import { ArrowRight } from "lucide-react";
import { smoothScroll } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

export default function CTA() {
  return (
    <section id="contact" className="bg-secondary py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <FadeIn>
          <h2 className="mb-4 text-3xl font-bold text-dark md:text-4xl">
            Ready to Transform Your Operations?
          </h2>
          <p className="mb-8 text-lg text-dark-medium">
            Stop drowning in manual work. Start building automated systems that
            scale your delivery without scaling your headcount. Book your free
            audit today.
          </p>
          <Button size="lg" onClick={() => smoothScroll("booking")}>
            Book Your Free Audit
            <ArrowRight className="h-5 w-5" />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
