# NEXT.JS PORTFOLIO WEBSITE - COMPLETE IMPLEMENTATION GUIDE

## Project Overview
Build a conversion-optimized portfolio website for Muhammad Usman using Next.js 14+ with App Router, showcasing agency operations automation expertise with a modern, technical, minimal design aesthetic.

---

## DESIGN SPECIFICATIONS

### Color Palette
```
Primary: #163D48 (Deep teal - professional, technical)
Secondary: #E7EEF2 (Light blue-grey - clean backgrounds)
White: #FFFFFF
Accent: #2E7D8F (Bright teal - CTAs and highlights)
Text Dark: #0A1F27
Text Medium: #476B76
Text Light: #8FA8B2
Success: #10B981 (for checkmarks, success states)
Code Background: #1E293B (for code snippets, technical elements)
```

### Typography
**Primary Font: Poppins (Google Fonts)**
- Weights needed: 300, 400, 500, 600, 700, 800
- Use for all text (headings, body, UI)

**Font Sizing System:**
```
Display (Hero): 3.5-4.5rem (56-72px)
H1: 3rem (48px)
H2: 2.25rem (36px)
H3: 1.75rem (28px)
H4: 1.25rem (20px)
Body Large: 1.125rem (18px)
Body: 1rem (16px)
Body Small: 0.875rem (14px)
Caption: 0.75rem (12px)
```

### Technical Design Elements
1. **Monospace Code Snippets**: Use 'JetBrains Mono' or 'Fira Code' for code elements
2. **Grid Overlays**: Subtle dotted grid backgrounds in hero/sections
3. **Terminal-Style Elements**: Use dark code blocks with syntax highlighting
4. **Geometric Shapes**: Add subtle geometric patterns (hexagons, circuit-like lines)
5. **Data Visualization**: Include animated number counters, progress bars
6. **System Architecture Diagrams**: Visual flow charts showing automation systems

---

## PROJECT STRUCTURE

```
portfolio-nextjs/
├── app/
│   ├── layout.tsx                 # Root layout with fonts, metadata
│   ├── page.tsx                   # Home page (main landing)
│   ├── globals.css                # Global styles, CSS variables
│   └── fonts/                     # Local fonts if needed
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx         # Sticky navigation with blur effect
│   │   └── Footer.tsx             # Footer with links and social
│   ├── sections/
│   │   ├── Hero.tsx               # Hero section with stats
│   │   ├── ProblemSolution.tsx    # Problem/solution split view
│   │   ├── Systems.tsx            # 11 automation systems grid
│   │   ├── Testimonials.tsx       # Client testimonials carousel
│   │   ├── Booking.tsx            # Cal.com embed section
│   │   └── CTA.tsx                # Final call-to-action
│   ├── ui/
│   │   ├── Button.tsx             # Reusable button component
│   │   ├── Card.tsx               # Card component for systems/testimonials
│   │   ├── Badge.tsx              # Badge/tag component
│   │   ├── Counter.tsx            # Animated number counter
│   │   └── GridPattern.tsx        # Background grid pattern
│   └── animations/
│       ├── FadeIn.tsx             # Scroll-triggered fade-in animation
│       └── StaggerChildren.tsx    # Stagger animation wrapper
├── lib/
│   ├── utils.ts                   # Utility functions
│   └── data.ts                    # Content data (systems, testimonials)
├── public/
│   ├── images/                    # Images and assets
│   └── icons/                     # SVG icons
├── styles/
│   └── animations.css             # Keyframe animations
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## STEP-BY-STEP IMPLEMENTATION

### Step 1: Project Setup

**1.1 Initialize Next.js Project**
```bash
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --app --no-src-dir
cd portfolio-nextjs
```

**1.2 Install Dependencies**
```bash
npm install framer-motion clsx tailwind-merge lucide-react
npm install -D @types/node @types/react @types/react-dom
```

**1.3 Install Fonts**
In `app/layout.tsx`:
```typescript
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

// For code snippets (optional but recommended for technical vibe)
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})
```

---

### Step 2: Configure Tailwind CSS

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#163D48',
          50: '#E7EEF2',
          100: '#D4E3E9',
          200: '#A9C7D3',
          300: '#7EABBD',
          400: '#538FA7',
          500: '#2E7D8F',
          600: '#163D48',
          700: '#0F2D35',
          800: '#091E23',
          900: '#040F12',
        },
        secondary: '#E7EEF2',
        accent: '#2E7D8F',
        dark: {
          DEFAULT: '#0A1F27',
          medium: '#476B76',
          light: '#8FA8B2',
        },
        code: {
          bg: '#1E293B',
          text: '#E2E8F0',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 20s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-50px, 50px) rotate(180deg)' },
        },
        counter: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #E7EEF2 1px, transparent 1px), linear-gradient(to bottom, #E7EEF2 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### Step 3: Global Styles Setup

**app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #163D48;
  --secondary: #E7EEF2;
  --accent: #2E7D8F;
  --text-dark: #0A1F27;
  --text-medium: #476B76;
  --text-light: #8FA8B2;
  --code-bg: #1E293B;
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-white text-dark font-sans antialiased;
  }
  
  html {
    @apply scroll-smooth;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold tracking-tight;
  }
}

@layer components {
  /* Grid background pattern */
  .grid-bg {
    background-image: 
      linear-gradient(to right, rgba(231, 238, 242, 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(231, 238, 242, 0.5) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  /* Glass morphism effect */
  .glass {
    @apply bg-white/80 backdrop-blur-md border border-secondary;
  }
  
  /* Code block styling */
  .code-block {
    @apply bg-code-bg text-code-text font-mono text-sm p-4 rounded-lg overflow-x-auto;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-secondary;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-primary rounded-full;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-accent;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  /* Animation delays */
  .delay-100 {
    animation-delay: 100ms;
  }
  
  .delay-200 {
    animation-delay: 200ms;
  }
  
  .delay-300 {
    animation-delay: 300ms;
  }
  
  .delay-400 {
    animation-delay: 400ms;
  }
  
  .delay-500 {
    animation-delay: 500ms;
  }
}
```

---

### Step 4: Root Layout Configuration

**app/layout.tsx:**
```typescript
import type { Metadata } from 'next'
import { Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Muhammad Usman - Agency Operations Automation Expert',
  description: 'I run automated delivery systems for 50+ websites & 70+ businesses. Helping marketing agencies eliminate 40+ hours/week of manual work.',
  keywords: ['agency automation', 'operations automation', 'marketing agency', 'workflow automation', 'AI automation'],
  authors: [{ name: 'Muhammad Usman' }],
  openGraph: {
    title: 'Muhammad Usman - Agency Operations Automation Expert',
    description: 'Eliminate 40+ hours/week of manual agency work with proven automation systems.',
    url: 'https://yourdomain.com',
    siteName: 'Muhammad Usman Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Usman - Agency Operations Automation Expert',
    description: 'Eliminate 40+ hours/week of manual agency work.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

### Step 5: Component Implementation Details

#### 5.1 Navigation Component

**components/layout/Navigation.tsx:**

**Requirements:**
- Fixed position with blur effect on scroll
- Smooth scroll to sections
- Highlight active section
- Mobile responsive (hamburger menu)
- CTA button always visible

**Key Features:**
```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'

// Structure:
// - Logo (left): "Muhammad Usman" in bold
// - Nav links (center): About, Systems, Testimonials, Contact
// - CTA button (right): "Book Free Audit"
// - Background: white with 95% opacity, blur effect
// - Border bottom: 1px secondary color
// - Padding: 1.5rem vertical
// - Animation: Slide down on mount

// Mobile menu:
// - Hamburger icon (3 lines)
// - Full-screen overlay menu
// - Slide from right animation
```

**Navigation Links:**
```typescript
const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#systems', label: 'Systems' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]
```

**Scroll Behavior:**
- Track scroll position
- Add shadow when scrolled > 10px
- Active link based on scroll position
- Smooth scroll to sections on click

---

#### 5.2 Hero Section

**components/sections/Hero.tsx:**

**Layout:**
- Full viewport height
- Two-column grid (60/40 split on desktop)
- Left: Content (badge, headline, description, stats, CTAs)
- Right: Visual card showing automation systems
- Background: Gradient from white to secondary
- Subtle grid pattern overlay
- Floating geometric shape animation

**Content Structure:**
```typescript
// Badge: "✦ Agency Operations Expert"
// Headline: "Eliminate 40+ Hours/Week of Manual Agency Work"
//   - "40+ Hours/Week" should have gradient text effect
// Description: 2-3 lines explaining value proposition
// Stats Grid (3 columns):
//   - 50+ Websites Automated
//   - 70+ Businesses Tracked  
//   - 40+ Hours/Week Saved
// CTAs (2 buttons):
//   - Primary: "Book Free Audit" (filled, with arrow icon)
//   - Secondary: "See How It Works" (outlined)
```

**Visual Card (Right Side):**
```typescript
// White card with shadow and border
// Floating animation (up and down)
// Title: "11 Production Systems Built"
// List of 6 key automations with checkmarks:
//   - Automated blog posting (50+ sites)
//   - Client reporting (GSC/GA4)
//   - Citations tracking (70+ businesses)
//   - GBP automation
//   - Performance monitoring
//   - Social media content
```

**Technical Elements:**
```typescript
// Add subtle code snippet in background
// Example: 
const automation = {
  websites: 50,
  businesses: 70,
  hoursSaved: 40,
  systems: 11
}
// Display as decorative element with syntax highlighting
```

**Animations:**
- Stagger fade-in for all elements (100ms delay between each)
- Number counter animation for stats
- Floating animation for visual card
- Hover effects on buttons

---

#### 5.3 Problem/Solution Section

**components/sections/ProblemSolution.tsx:**

**Layout:**
- Section header (centered)
- Two-column split view
- Left: Problem box (red/warning theme)
- Right: Solution box (gradient primary/accent)

**Section Header:**
```typescript
// Label: "THE PROBLEM" (uppercase, accent color)
// Title: "Every New Client Adds More Manual Work"
// Description: 2-3 sentences about agency scaling pain
```

**Problem Box:**
```typescript
// Background: Secondary color
// Icon: ❌ (top-right, large, semi-transparent)
// Title: "Without Automation"
// List of 6 pain points:
//   • 15+ hours/week on manual client reporting
//   • Content teams manually posting to 50+ websites
//   • 3+ hours per client onboarding
//   • Manual citation tracking across 70+ businesses
//   • Team burnout during "report season"
//   • Can't scale without hiring more people
// Hover effect: Translate up slightly
```

**Solution Box:**
```typescript
// Background: Linear gradient (primary to accent)
// Color: White text
// Icon: ✓ (top-right, large, semi-transparent)
// Title: "With Automation"
// Description: 1 sentence intro
// List of 6 benefits (checkmarks):
//   ✓ Blog posts publish automatically across all sites
//   ✓ Client reports generate from live data (GSC/GA4)
//   ✓ Citations monitored with real-time alerts
//   ✓ Client onboarding reduced from 3 hours to 15 minutes
//   ✓ Performance tracking runs continuously
//   ✓ Team focuses on strategy, not repetitive tasks
// Hover effect: Translate up slightly
```

---

#### 5.4 Systems Section

**components/sections/Systems.tsx:**

**Layout:**
- Section header (centered)
- 3-column grid (responsive: 2 on tablet, 1 on mobile)
- 11 system cards total
- Background: Gradient from white to secondary

**Section Header:**
```typescript
// Label: "PROVEN SYSTEMS" (uppercase, accent color)
// Title: "11 Automations That Transformed Operations"
// Description: "Every system below is running in production, serving real clients, eliminating manual work."
```

**System Card Structure:**
```typescript
interface SystemCard {
  icon: string // Emoji (📝, 📊, 📍, etc.)
  title: string
  description: string
  impact: string // e.g., "Saved 20 hours/week"
}

// Example:
{
  icon: "📝",
  title: "Automated Blog Posting",
  description: "Content automatically publishes to 50+ websites with proper formatting, schema markup, and scheduling—no manual WordPress work.",
  impact: "Saved 20 hours/week"
}
```

**All 11 Systems:**
1. **Automated Blog Posting** (📝) - Saved 20 hours/week
2. **Automated Reporting** (📊) - Saved 15 hours/week
3. **Citations Tracker** (📍) - 24/7 monitoring
4. **GBP Automation** (🏢) - Saved 8 hours/week
5. **Performance Monitoring** (⚡) - Proactive alerts
6. **Social Content Generation** (📱) - Scaled content 10x
7. **Client Onboarding** (🎯) - 90% time reduction
8. **Employee Onboarding** (👥) - Consistent process
9. **Schema Generation** (🔗) - 100% coverage
10. **Video Generation** (🎬) - 10x content output
11. **Lead Generation** (📧) - 3x conversion rate

**Card Styling:**
```typescript
// Background: White
// Border: 2px secondary (changes to accent on hover)
// Top border: 4px gradient (appears on hover with scale animation)
// Padding: 2.5rem
// Border radius: 16px
// Shadow: Appears on hover
// Transform: Translate up on hover
// Icon: Large (2.5rem), margin bottom 1.5rem
// Title: 1.35rem, primary color, semibold
// Description: 0.95rem, medium text, line-height 1.7
// Impact badge: Small pill, accent background with low opacity, accent text
```

---

#### 5.5 Testimonials Section

**components/sections/Testimonials.tsx:**

**Layout:**
- Section header (centered)
- 3-column grid (responsive: 1 on mobile)
- 3 testimonial cards

**Section Header:**
```typescript
// Label: "WHAT FOUNDERS SAY" (uppercase, accent color)
// Title: "Trusted by Real Agencies"
// Description: "Companies I've worked with building operational systems that transform delivery."
```

**Testimonial Card Structure:**
```typescript
interface Testimonial {
  quote: string
  author: string
  position: string
  company: string
  avatar: string // Initials for avatar
}
```

**3 Testimonials:**

1. **RobustCraft**
```typescript
{
  quote: "Muhammad transformed our operational infrastructure. We went from drowning in manual work to having systems that run themselves. Our team can finally focus on strategy instead of repetitive tasks.",
  author: "RobustCraft Team",
  position: "Operations Lead",
  company: "RobustCraft",
  avatar: "RC"
}
```

2. **Business Upscalers**
```typescript
{
  quote: "The automated reporting system alone saved us 15+ hours every week. What used to take our entire team a full day now happens automatically. Game changer for our margins.",
  author: "Business Upscalers",
  position: "Managing Director",
  company: "Business Upscalers",
  avatar: "BU"
}
```

3. **BizScale**
```typescript
{
  quote: "Muhammad doesn't just build automations—he thinks in systems. He redesigned our entire delivery workflow and built the infrastructure to support it. We're scaling faster than ever without adding headcount.",
  author: "BizScale Leadership",
  position: "CEO",
  company: "BizScale",
  avatar: "BS"
}
```

**Card Styling:**
```typescript
// Background: Secondary color
// Padding: 2.5rem
// Border radius: 20px
// Border: 2px transparent (changes to accent on hover)
// Quote icon: Large opening quote ("), accent color, semi-transparent
// Quote text: 1.05rem, line-height 1.8
// Separator: 2px line between quote and author
// Author section:
//   - Avatar: Circle (50px), primary background, white text, initials
//   - Name: 1rem, primary color, semibold
//   - Position: 0.85rem, medium text
// Transform: Translate up on hover
// Shadow: Appears on hover
```

---

#### 5.6 Booking Section

**components/sections/Booking.tsx:**

**Layout:**
- Full-width section
- Background: Gradient (primary to accent)
- Color: White text
- Decorative rotating circle animation (background)
- Two-column layout (40/60 split)
- Left: Booking info
- Right: Cal.com embed

**Section Header:**
```typescript
// Label: "FREE OPERATIONS AUDIT" (uppercase, white semi-transparent)
// Title: "Let's Find Your 40+ Hidden Hours"
// Description: "Book a free 30-minute audit where I'll map your current workflow, identify your biggest bottlenecks, and show you exactly how to eliminate manual work."
```

**Booking Info (Left Column):**
```typescript
// Background: White 10% opacity with blur
// Border: 1px white 20% opacity
// Border radius: 20px
// Padding: 3rem

// Title: "What You'll Get:"
// Benefits list (5 items with checkmark icons):
//   ✓ Complete operational workflow analysis
//   ✓ Top 3 automation opportunities identified
//   ✓ Prioritized action plan with ROI projections
//   ✓ Specific recommendations for your agency
//   ✓ Resource guide and implementation framework

// Guarantee box:
//   Background: White 15% opacity
//   Border radius: 12px
//   Padding: 1.5rem
//   Text: "No pitch. No obligation. Just tactical insights you can implement immediately. Even if we never work together, you'll leave with a clear roadmap to eliminate operational bottlenecks."
```

**Cal.com Embed (Right Column):**
```typescript
// Container:
//   Background: White
//   Border radius: 20px
//   Shadow: Large (30px, 80px blur)
//   Overflow: Hidden
//   Min height: 700px

// Cal.com embed code:
<div 
  style={{
    width: '100%',
    height: '700px',
    overflow: 'hidden',
    borderRadius: '20px'
  }}
>
  <iframe
    src="https://cal.com/muhammad-usman-940b2a274/30min"
    width="100%"
    height="100%"
    frameBorder="0"
    style={{ border: 0 }}
  />
</div>
```

**Technical Background Element:**
```typescript
// Add decorative code snippet or system diagram in background
// Semi-transparent, non-intrusive
// Reinforces technical expertise
```

---

#### 5.7 CTA Section

**components/sections/CTA.tsx:**

**Layout:**
- Background: Secondary color
- Padding: 6rem vertical
- Text centered
- Max width: 800px

**Content:**
```typescript
// Title: "Ready to Transform Your Operations?"
// Description: "Stop drowning in manual work. Start building automated systems that scale your delivery without scaling your headcount. Book your free audit today."
// Button: "Book Your Free Audit" (primary style with arrow icon)
```

---

#### 5.8 Footer

**components/layout/Footer.tsx:**

**Layout:**
- Background: Primary color
- Color: White text
- 4-column grid (responsive: 2 on tablet, 1 on mobile)
- Footer bottom: Copyright and credits

**4 Columns:**

1. **Brand Column (2x width):**
```typescript
// Logo/Name: "Muhammad Usman" (1.75rem, bold)
// Description: 2-3 sentences about expertise
// Social links (3 icons):
//   - LinkedIn (with actual link)
//   - GitHub (placeholder or actual)
//   - Email (mailto link)
// Icons: Circle background (white 10% opacity)
// Hover: White background, primary text color
```

2. **Quick Links:**
```typescript
// Heading: "Quick Links"
// Links:
//   - About (#about)
//   - Systems (#systems)
//   - Testimonials (#testimonials)
//   - Book Audit (#booking)
```

3. **Services:**
```typescript
// Heading: "Services"
// Links:
//   - Operations Audit
//   - Automation Setup
//   - Systems Consulting
//   - Retainer Packages
// All link to #booking
```

4. **Resources:**
```typescript
// Heading: "Resources"
// Links:
//   - Case Studies (#systems)
//   - Client Results (#testimonials)
//   - LinkedIn (external)
//   - Contact (#booking)
```

**Footer Bottom:**
```typescript
// Border top: 1px white 10% opacity
// Text: "© 2025 Muhammad Usman. All rights reserved. Built with operational precision."
// Font size: 0.9rem
// Color: White 70% opacity
```

---

### Step 6: Utility Components

#### 6.1 Button Component

**components/ui/Button.tsx:**

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white border-2 border-primary hover:bg-transparent hover:text-primary hover:shadow-lg',
        secondary: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
        accent: 'bg-accent text-white border-2 border-accent hover:bg-transparent hover:text-accent',
        ghost: 'bg-transparent text-primary hover:bg-secondary',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
```

---

#### 6.2 Counter Component

**components/ui/Counter.tsx:**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export default function Counter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  className = '' 
}: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}
```

---

#### 6.3 FadeIn Animation Component

**components/animations/FadeIn.tsx:**

```typescript
'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: 'easeOut' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

#### 6.4 Grid Pattern Background

**components/ui/GridPattern.tsx:**

```typescript
export default function GridPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-secondary/50" />
    </div>
  )
}
```

---

### Step 7: Data Files

**lib/data.ts:**

```typescript
export const automationSystems = [
  {
    icon: '📝',
    title: 'Automated Blog Posting',
    description: 'Content automatically publishes to 50+ websites with proper formatting, schema markup, and scheduling—no manual WordPress work.',
    impact: 'Saved 20 hours/week',
  },
  {
    icon: '📊',
    title: 'Automated Reporting',
    description: 'Client reports generate automatically from GSC and GA4 data. Real-time dashboards replace monthly manual work.',
    impact: 'Saved 15 hours/week',
  },
  {
    icon: '📍',
    title: 'Citations Tracker',
    description: 'Monitors citations and backlinks for 70+ businesses with automated alerts when issues are detected.',
    impact: '24/7 monitoring',
  },
  {
    icon: '🏢',
    title: 'GBP Automation',
    description: 'Google Business Profile posts sync automatically across client accounts with scheduled publishing and performance tracking.',
    impact: 'Saved 8 hours/week',
  },
  {
    icon: '⚡',
    title: 'Performance Monitoring',
    description: 'Website performance tracked via PageSpeed Insights with instant alerts when client sites underperform.',
    impact: 'Proactive alerts',
  },
  {
    icon: '📱',
    title: 'Social Content Generation',
    description: 'Social media content generated and scheduled automatically across platforms with brand-consistent messaging.',
    impact: 'Scaled content 10x',
  },
  {
    icon: '🎯',
    title: 'Client Onboarding',
    description: 'New client setup automated from intake forms to account access, reducing onboarding time from 3+ hours to 15 minutes.',
    impact: '90% time reduction',
  },
  {
    icon: '👥',
    title: 'Employee Onboarding',
    description: 'New team member onboarding automated with account setup, documentation delivery, and training schedules.',
    impact: 'Consistent process',
  },
  {
    icon: '🔗',
    title: 'Schema Generation',
    description: 'Technical SEO schema markup automatically generated and implemented for all blog posts and pages.',
    impact: '100% coverage',
  },
  {
    icon: '🎬',
    title: 'Video Generation',
    description: 'Faceless videos automatically created for content campaigns with text-to-speech and visual templates.',
    impact: '10x content output',
  },
  {
    icon: '📧',
    title: 'Lead Generation',
    description: 'Lead capture, scoring, and email campaign automation with CRM integration and follow-up sequences.',
    impact: '3x conversion rate',
  },
]

export const testimonials = [
  {
    quote: "Muhammad transformed our operational infrastructure. We went from drowning in manual work to having systems that run themselves. Our team can finally focus on strategy instead of repetitive tasks.",
    author: "RobustCraft Team",
    position: "Operations Lead",
    company: "RobustCraft",
    avatar: "RC"
  },
  {
    quote: "The automated reporting system alone saved us 15+ hours every week. What used to take our entire team a full day now happens automatically. Game changer for our margins.",
    author: "Business Upscalers",
    position: "Managing Director",
    company: "Business Upscalers",
    avatar: "BU"
  },
  {
    quote: "Muhammad doesn't just build automations—he thinks in systems. He redesigned our entire delivery workflow and built the infrastructure to support it. We're scaling faster than ever without adding headcount.",
    author: "BizScale Leadership",
    position: "CEO",
    company: "BizScale",
    avatar: "BS"
  },
]

export const stats = [
  { number: 50, suffix: '+', label: 'Websites Automated' },
  { number: 70, suffix: '+', label: 'Businesses Tracked' },
  { number: 40, suffix: '+', label: 'Hours/Week Saved' },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#systems', label: 'Systems' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export const footerLinks = {
  quickLinks: [
    { href: '#about', label: 'About' },
    { href: '#systems', label: 'Systems' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#booking', label: 'Book Audit' },
  ],
  services: [
    { href: '#booking', label: 'Operations Audit' },
    { href: '#booking', label: 'Automation Setup' },
    { href: '#booking', label: 'Systems Consulting' },
    { href: '#booking', label: 'Retainer Packages' },
  ],
  resources: [
    { href: '#systems', label: 'Case Studies' },
    { href: '#testimonials', label: 'Client Results' },
    { href: 'https://linkedin.com/in/muhammad-usman-940b2a274', label: 'LinkedIn' },
    { href: '#booking', label: 'Contact' },
  ],
}

export const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/muhammad-usman-940b2a274',
    icon: 'linkedin', // Use lucide-react icons
  },
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: 'github',
  },
  {
    name: 'Email',
    href: 'mailto:shanisticdev@gmail.com',
    icon: 'mail',
  },
]
```

---

### Step 8: Utility Functions

**lib/utils.ts:**

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function smoothScroll(targetId: string) {
  const element = document.getElementById(targetId.replace('#', ''))
  if (element) {
    const offsetTop = element.offsetTop - 100 // Account for fixed nav
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })
  }
}
```

---

### Step 9: Technical Design Elements

#### 9.1 Code Snippet Decorative Element

Add this as a background element in hero or sections:

```typescript
// components/ui/CodeSnippet.tsx
export default function CodeSnippet() {
  return (
    <div className="absolute right-0 top-20 opacity-10 font-mono text-xs select-none pointer-events-none">
      <pre className="text-code-bg">
{`const automation = {
  websites: 50,
  businesses: 70,
  hoursSaved: 40,
  systems: 11,
  status: 'running'
}

async function optimizeAgency() {
  const bottlenecks = await analyze()
  const systems = await build(bottlenecks)
  return eliminate(manualWork)
}`}
      </pre>
    </div>
  )
}
```

---

#### 9.2 System Architecture Diagram

For the Systems section, add a visual flow diagram:

```typescript
// Optional: Add after the systems grid
// Shows: Manual Work → Analysis → Automation → Scaled Delivery
// Use SVG with arrows and icons
// Keep it minimal and technical
```

---

#### 9.3 Terminal-Style Elements

Add terminal-like boxes for technical credibility:

```typescript
// components/ui/Terminal.tsx
export default function Terminal({ command, output }: { command: string, output: string }) {
  return (
    <div className="bg-code-bg rounded-lg overflow-hidden font-mono text-sm">
      <div className="bg-dark-700 px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-code-text text-xs">terminal</span>
      </div>
      <div className="p-4">
        <div className="text-green-400">$ {command}</div>
        <div className="text-code-text mt-2">{output}</div>
      </div>
    </div>
  )
}

// Usage in Hero or Systems section:
<Terminal 
  command="analyze agency operations" 
  output="Found 40+ hours/week of eliminable manual work across 11 systems" 
/>
```

---

### Step 10: Responsive Design Guidelines

**Breakpoints:**
```typescript
// Mobile: < 768px
// Tablet: 768px - 1024px
// Desktop: > 1024px
```

**Key Responsive Changes:**

1. **Navigation:**
   - Mobile: Hamburger menu
   - Desktop: Full horizontal nav

2. **Hero:**
   - Mobile: Single column, visual card below content
   - Desktop: Two-column layout

3. **Stats:**
   - Mobile: Single column
   - Tablet: 3 columns
   - Desktop: 3 columns

4. **Problem/Solution:**
   - Mobile: Stack vertically
   - Desktop: Side by side

5. **Systems Grid:**
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3 columns

6. **Testimonials:**
   - Mobile: 1 column (carousel)
   - Desktop: 3 columns

7. **Booking:**
   - Mobile: Stack (info then embed)
   - Desktop: Side by side (40/60)

8. **Footer:**
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 4 columns

---

### Step 11: Performance Optimization

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

**Image Optimization:**
- Use Next.js Image component for all images
- Provide width and height
- Use priority for above-the-fold images
- Lazy load below-the-fold content

**Code Splitting:**
- Use dynamic imports for heavy components
- Example:
```typescript
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div>Loading...</div>,
})
```

---

### Step 12: Accessibility Guidelines

1. **Semantic HTML:**
   - Use proper heading hierarchy (h1 → h2 → h3)
   - Use semantic tags (nav, main, section, footer)
   - Add ARIA labels where needed

2. **Keyboard Navigation:**
   - All interactive elements accessible via Tab
   - Focus states visible
   - Skip to main content link

3. **Color Contrast:**
   - All text meets WCAG AA standards
   - Primary on white: 7.2:1 (AAA)
   - White on primary: 7.2:1 (AAA)

4. **Alt Text:**
   - All images have descriptive alt text
   - Decorative images: alt=""

---

### Step 13: SEO Optimization

**app/page.tsx metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Muhammad Usman - Agency Operations Automation Expert',
  description: 'Eliminate 40+ hours/week of manual agency work. I run automated delivery systems for 50+ websites & 70+ businesses. Book your free operations audit.',
  keywords: [
    'agency automation',
    'operations automation',
    'marketing agency automation',
    'workflow automation',
    'AI automation',
    'agency operations',
    'business automation',
  ],
  openGraph: {
    title: 'Eliminate 40+ Hours/Week of Manual Agency Work',
    description: 'Proven automation systems for marketing agencies. 50+ websites automated, 70+ businesses tracked.',
    images: ['/og-image.jpg'], // Create this
  },
}
```

**Structured Data (JSON-LD):**
Add to app/layout.tsx:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Muhammad Usman',
      jobTitle: 'Technical Operations Lead',
      description: 'Agency operations automation expert',
      url: 'https://yourdomain.com',
      sameAs: [
        'https://linkedin.com/in/muhammad-usman-940b2a274',
      ],
    }),
  }}
/>
```

---

### Step 14: Cal.com Integration

**Booking Section Embed:**

```typescript
// components/sections/Booking.tsx

<div className="cal-embed">
  <div
    style={{
      width: '100%',
      height: '700px',
      overflow: 'hidden',
      borderRadius: '20px',
    }}
  >
    <iframe
      src="https://cal.com/muhammad-usman-940b2a274/30min"
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0 }}
      title="Book Free Operations Audit"
    />
  </div>
</div>
```

**Alternative: Cal.com Inline Embed (Recommended):**

Install Cal.com embed package:
```bash
npm install @calcom/embed-react
```

Then use:
```typescript
'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

export default function BookingEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal('ui', {
        styles: { branding: { brandColor: '#163D48' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])

  return (
    <Cal
      calLink="muhammad-usman-940b2a274/30min"
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  )
}
```

---

### Step 15: Deployment Checklist

**Before Deploying:**

1. ✅ All images optimized (WebP/AVIF)
2. ✅ Meta tags complete (title, description, OG tags)
3. ✅ Favicon added
4. ✅ robots.txt configured
5. ✅ sitemap.xml generated
6. ✅ Analytics added (Google Analytics or Plausible)
7. ✅ Cal.com link tested and working
8. ✅ All links working (internal and external)
9. ✅ Mobile responsive tested
10. ✅ Performance tested (Lighthouse score > 90)
11. ✅ Accessibility tested (WAVE, axe DevTools)
12. ✅ Cross-browser tested (Chrome, Firefox, Safari)

**Deployment Options:**

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts for production deployment
```

**Option 2: Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**Environment Variables:**
- Set up any API keys in Vercel/Netlify dashboard
- Add to `.env.local` for local development

---

### Step 16: Post-Launch

**Analytics Setup:**

Add Google Analytics or Plausible to track:
- Page views
- Section scroll depth
- CTA button clicks
- Cal.com booking starts
- Form submissions

**Example (Google Analytics 4):**
```typescript
// app/layout.tsx
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

**Testing:**
- Test all CTAs
- Test Cal.com booking flow
- Test mobile navigation
- Test form submissions
- Check page load speed

---

## TECHNICAL VIBE ENHANCEMENTS

To strengthen the technical aesthetic:

### 1. Add Binary/Hex Background Pattern

```typescript
// components/ui/BinaryBackground.tsx
export default function BinaryBackground() {
  const binary = '01'.repeat(100)
  
  return (
    <div className="absolute inset-0 -z-10 opacity-5 font-mono text-xs overflow-hidden">
      {binary.split('').map((digit, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {digit}
        </span>
      ))}
    </div>
  )
}
```

### 2. Add System Status Indicators

```typescript
// Show "systems operational" indicators
<div className="flex items-center gap-2 text-sm">
  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
  <span className="font-mono text-dark-light">All systems operational</span>
</div>
```

### 3. Add API-Style Response Cards

```typescript
// Format stats as API responses
{
  "status": 200,
  "data": {
    "websites_automated": 50,
    "businesses_tracked": 70,
    "hours_saved_weekly": 40
  }
}
```

### 4. Add Loading Skeleton States

```typescript
// For better perceived performance
export function SystemCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 w-10 bg-secondary rounded mb-4" />
      <div className="h-6 bg-secondary rounded mb-2" />
      <div className="h-20 bg-secondary rounded" />
    </div>
  )
}
```

---

## FINAL TECHNICAL STACK SUMMARY

```
Framework: Next.js 14+ (App Router)
Language: TypeScript
Styling: Tailwind CSS
Animations: Framer Motion
Icons: Lucide React
Font: Poppins (all weights)
Monospace: JetBrains Mono
Booking: Cal.com embed
Analytics: Google Analytics 4 / Plausible
Deployment: Vercel / Netlify
```

---

## DEVELOPMENT WORKFLOW

1. **Setup Project** (30 minutes)
   - Initialize Next.js
   - Configure Tailwind
   - Set up fonts
   - Create folder structure

2. **Build Layout Components** (1 hour)
   - Navigation
   - Footer
   - Basic page structure

3. **Build UI Components** (1 hour)
   - Button
   - Card
   - Badge
   - Counter
   - Animation wrappers

4. **Build Sections** (3-4 hours)
   - Hero (1 hour)
   - Problem/Solution (30 min)
   - Systems (1 hour)
   - Testimonials (30 min)
   - Booking (30 min)
   - CTA (15 min)

5. **Polish & Optimize** (1-2 hours)
   - Responsive testing
   - Animation timing
   - Performance optimization
   - Accessibility audit

6. **Deploy & Test** (30 minutes)
   - Deploy to Vercel
   - Test production build
   - Verify Cal.com integration
   - Check analytics

**Total Estimated Time: 7-9 hours**

---

## CURSOR AI SPECIFIC INSTRUCTIONS

When implementing with Cursor AI, use these prompts:

### Prompt 1: Initial Setup
```
Create a Next.js 14 project with TypeScript and Tailwind CSS. Configure Poppins font (weights 300-800) and JetBrains Mono for code elements. Set up the color palette with primary #163D48, secondary #E7EEF2, and accent #2E7D8F. Create the folder structure as specified in the implementation guide.
```

### Prompt 2: Layout Components
```
Build the Navigation component with sticky positioning, blur effect on scroll, smooth scroll to sections, and mobile hamburger menu. Then create the Footer with 4 columns, social links, and copyright. Use the design specifications from the implementation guide.
```

### Prompt 3: Hero Section
```
Create the Hero section with a two-column layout (60/40 split). Left side: badge, headline with gradient text on "40+ Hours/Week", description, 3-column stats grid with animated counters, and two CTAs. Right side: floating card showing 11 production systems. Add grid pattern background and floating geometric shapes. Use Framer Motion for animations.
```

### Prompt 4: Systems Section
```
Build the Systems section with a 3-column responsive grid of 11 automation system cards. Each card should have an icon, title, description, and impact badge. Add hover effects (translate up, border color change, top gradient border). Use the automation systems data from lib/data.ts.
```

### Prompt 5: Booking Section
```
Create the Booking section with gradient background (primary to accent). Two-column layout: left side has booking info with benefits list and guarantee box, right side embeds Cal.com iframe (https://cal.com/muhammad-usman-940b2a274/30min). Add decorative rotating circle animation in background.
```

### Prompt 6: Final Polish
```
Add scroll-triggered fade-in animations to all sections using Framer Motion. Implement smooth scroll behavior. Add loading states and skeleton screens. Optimize images. Test responsive design on mobile, tablet, and desktop. Ensure accessibility (ARIA labels, keyboard navigation, color contrast).
```

---

## TROUBLESHOOTING COMMON ISSUES

### Issue 1: Fonts Not Loading
**Solution:** Verify font imports in layout.tsx and ensure CSS variables are applied to html element.

### Issue 2: Cal.com Iframe Height Issues
**Solution:** Set explicit height (700px) and use overflow-hidden on container.

### Issue 3: Animations Not Triggering
**Solution:** Check that components are wrapped in 'use client' directive and Framer Motion is properly installed.

### Issue 4: Tailwind Classes Not Working
**Solution:** Verify tailwind.config.ts includes all component paths in content array.

### Issue 5: Build Errors
**Solution:** Check TypeScript errors with `npm run build`. Common issues: missing alt tags, unused imports, type mismatches.

---

## MAINTENANCE & UPDATES

**Weekly:**
- Check Cal.com booking link is working
- Review analytics for user behavior
- Test all CTAs and links

**Monthly:**
- Update testimonials if you get new ones
- Add new automation systems to the grid
- Refresh stats (websites, businesses, hours saved)
- Update meta descriptions for SEO

**Quarterly:**
- Review and update content
- Optimize images further
- Run Lighthouse audit
- Update dependencies

---

## SUCCESS METRICS TO TRACK

1. **Conversion Rate:** Booking page visits → Cal.com bookings
2. **Engagement:** Average time on page, scroll depth
3. **Traffic Sources:** Direct, LinkedIn, organic search
4. **Popular Sections:** Which sections get most engagement
5. **Mobile vs Desktop:** Device breakdown
6. **CTA Performance:** Which buttons get most clicks

**Target Benchmarks:**
- Page load speed: < 2 seconds
- Lighthouse score: > 90
- Conversion rate: 5-10% (booking page visitors → bookings)
- Bounce rate: < 40%
- Average session: > 2 minutes

---

## FINAL CHECKLIST FOR CURSOR IMPLEMENTATION

Before considering the project complete:

- [ ] All sections implemented and responsive
- [ ] Poppins font loading correctly
- [ ] All animations smooth and performant
- [ ] Cal.com embed working and tested
- [ ] Mobile navigation functional
- [ ] All links working (internal anchors + external)
- [ ] Images optimized and lazy-loaded
- [ ] Meta tags complete for SEO
- [ ] Favicon added
- [ ] Color palette consistent throughout
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Performance optimized (Lighthouse > 90)
- [ ] Analytics integrated
- [ ] Deployed to production
- [ ] SSL certificate active
- [ ] Custom domain connected (if applicable)
- [ ] All CTAs tracked in analytics
- [ ] Contact information correct
- [ ] Social links updated
- [ ] No console errors in production

---

**This implementation guide is complete and ready to hand to Cursor AI for execution. The technical specifications, component details, and step-by-step instructions provide everything needed to build a conversion-optimized, technically-aesthetic portfolio website.**

**Estimated project completion time with Cursor AI: 6-8 hours of focused development.**