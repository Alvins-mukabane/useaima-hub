

# USEAIMA Landing Page — Implementation Plan

## Overview
A modern, professional landing page for USEAIMA — an AI platform ecosystem with multiple products, content sections, and a startup brand identity. Built with React + Tailwind CSS, featuring dark/light mode, smooth animations, and responsive design.

## Pages & Sections (Single-Page with scroll sections + dedicated pages)

### Global
- **Sticky Navbar** with links: Home, Blog (external → blog.useaima.com), Finance, Health, Kids, FAQs, About
- Mobile hamburger menu
- Dark/light mode toggle
- **Footer** with contact email, section links, social placeholders, Privacy/Terms links

### Home Page (scroll-based)
1. **Hero Section** — Bold headline "Build Smarter. Live Better. Powered by AI." with gradient background, animated elements, two CTA buttons (Explore Tools / Read Blog)
2. **Product Ecosystem** — 5 product cards (FinanceAI, EmailAI, KidsAI, SocialPulse, HealthAI) with icons, descriptions, status badges (Live/Beta/Coming Soon), and CTA buttons. Card-based layout with hover micro-interactions
3. **Blog Preview** — 3–5 sample posts with title, description, category tags, and "Go to Blog" button
4. **Newsletter Signup** — Email capture section with clean design
5. **FAQ Section** — Accordion-style with the specified questions

### Finance Page (`/finance`)
- FinanceAI product spotlight
- Financial education content cards
- Crypto & market insights section
- Product changelog/updates area

### Health Page (`/health`)
- HealthAI product spotlight (Coming Soon)
- Health AI insights and preventive care content
- Upcoming features preview

### Kids Page (`/kids`)
- KidsAI product showcase
- Safe AI emphasis with trust-building visuals
- Learning + entertainment highlights

### About Page (`/about`)
- Platform story and mission
- Indie hacker / startup founder narrative
- Vision for AI assistants in everyday life

## Design Approach
- Minimal, modern SaaS aesthetic
- Soft gradients with glassmorphism cards
- Strong typography hierarchy
- Smooth scroll animations using CSS/Intersection Observer
- Dark/light mode via Tailwind dark class
- Mobile-first responsive design
- Consistent spacing, clean card-based UI

## Component Structure
- `Navbar`, `Footer`, `ThemeToggle`
- `HeroSection`, `ProductCard`, `ProductEcosystem`
- `BlogPreview`, `BlogCard`
- `FAQSection`, `NewsletterSignup`
- `SectionHeader` (reusable)
- Dedicated page components for Finance, Health, Kids, About

## Search
- Simple client-side search overlay for filtering products and blog content

