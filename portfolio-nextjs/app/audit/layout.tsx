import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Operations Audit — Find Your Hidden 40+ Hours/Week",
  description:
    "This 12-question scorecard shows you exactly where manual work is holding your agency back. Score your operations and get a clear roadmap to automate.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
