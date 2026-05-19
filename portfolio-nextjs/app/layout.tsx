import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Usman - Agency Operations Automation Expert",
  description:
    "I run automated delivery systems for 50+ websites & 70+ businesses. Helping marketing agencies eliminate 40+ hours/week of manual work.",
  keywords: [
    "agency automation",
    "operations automation",
    "marketing agency",
    "workflow automation",
    "AI automation",
  ],
  authors: [{ name: "Muhammad Usman" }],
  openGraph: {
    title: "Muhammad Usman - Agency Operations Automation Expert",
    description:
      "Eliminate 40+ hours/week of manual agency work with proven automation systems.",
    siteName: "Muhammad Usman Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Usman - Agency Operations Automation Expert",
    description: "Eliminate 40+ hours/week of manual agency work.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Usman",
  jobTitle: "Technical Operations Lead",
  description: "Agency operations automation expert",
  sameAs: ["https://linkedin.com/in/muhammad-usman-940b2a274"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
