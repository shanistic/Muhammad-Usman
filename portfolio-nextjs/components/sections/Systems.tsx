"use client";

import AutomationPipeline from "@/components/sections/AutomationPipeline";
import AutomationSystemsGrid from "@/components/sections/AutomationSystemsGrid";

export default function Systems() {
  return (
    <section
      id="systems"
      className="bg-gradient-to-b from-white to-secondary py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AutomationSystemsGrid />

        <div className="mt-16">
          <AutomationPipeline />
        </div>
      </div>
    </section>
  );
}
