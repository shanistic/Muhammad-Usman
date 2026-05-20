"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { smoothScroll } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = ["about", "systems", "testimonials", "booking", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    if (id === "contact") {
      smoothScroll("booking");
    } else {
      smoothScroll(id);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-secondary/60 bg-white/70 shadow-sm backdrop-blur-md"
            : "border-transparent bg-white/40 backdrop-blur-md"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-8",
            scrolled ? "py-3" : "py-4"
          )}
          aria-label="Main navigation"
        >
          <button
            onClick={() => smoothScroll("about")}
            className="text-lg font-bold text-primary transition-colors hover:text-accent cursor-pointer"
          >
            Muhammad Usman
          </button>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const sectionId =
                link.href === "#contact" ? "booking" : link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-accent cursor-pointer",
                      activeSection === sectionId
                        ? "text-accent"
                        : "text-dark-medium"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Button
              size="sm"
              onClick={() => smoothScroll("booking")}
            >
              Book Free Audit
            </Button>
          </div>

          <button
            className="rounded-lg p-2 text-primary md:hidden cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 z-50 flex h-full w-80 flex-col bg-white p-8 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  Muhammad Usman
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-primary cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-lg font-medium text-dark hover:text-accent cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  className="w-full"
                  onClick={() => handleNavClick("#booking")}
                >
                  Book Free Audit
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
