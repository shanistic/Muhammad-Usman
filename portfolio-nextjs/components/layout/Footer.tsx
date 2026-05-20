"use client";

import { Mail } from "lucide-react";
import { footerLinks, socialLinks } from "@/lib/data";
import { smoothScroll } from "@/lib/utils";
import FooterMeshAnimation from "@/components/ui/FooterMeshAnimation";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const iconMap = {
  linkedin: LinkedInIcon,
  mail: Mail,
};

export default function Footer() {
  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      smoothScroll(id);
    }
  };

  return (
    <footer className="relative bg-primary text-white overflow-hidden pt-16 pb-12">
      {/* Background Mesh Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-50">
          <div className="w-full max-w-7xl px-6 lg:px-8">
            <FooterMeshAnimation />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">Muhammad Usman</h3>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-white/70">
                Agency operations automation expert. I build production systems
                that eliminate manual work for marketing agencies—50+ websites
                automated, 70+ businesses tracked, 40+ hours saved weekly.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-primary"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleClick(link.href)}
                      className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-white/70">
            © 2025 Muhammad Usman. All rights reserved. Built with operational
            precision.
          </div>
        </div>
    </footer>
  );
}
