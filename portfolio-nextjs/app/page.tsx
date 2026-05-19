import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Systems from "@/components/sections/Systems";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Systems />
      <Testimonials />
      <Booking />
      <CTA />
    </>
  );
}
