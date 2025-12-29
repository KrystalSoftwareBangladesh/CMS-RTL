# CMS-RTL - Transportation Logistics Website

## Overview
A Vue 3 transportation/logistics website UI built with Vite, TypeScript, Tailwind CSS, and Vue Router. Features a modular component architecture with reusable base components and centralized data management.

## Project Architecture
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4 with custom theme
- **Routing**: Vue Router 4
- **Language**: TypeScript
- **Fonts**: Inter (body), Poppins (headings)

## Directory Structure
```
src/
├── assets/
│   ├── images/          # Stock images and assets
│   └── main.css         # Tailwind configuration and base styles
├── components/
│   ├── base/            # Reusable UI components
│   │   ├── BaseButton.vue
│   │   ├── BaseCard.vue
│   │   ├── SectionHeader.vue
│   │   └── ServiceCard.vue
│   ├── layout/          # Layout components
│   │   ├── Navbar.vue
│   │   └── Footer.vue
│   └── sections/        # Page sections
│       ├── HeroSection.vue
│       ├── AboutSection.vue
│       ├── ServicesSection.vue
│       ├── ProjectSection.vue
│       ├── CTASection.vue
│       ├── FAQSection.vue
│       ├── TestimonialsSection.vue
│       └── NewsSection.vue
├── data/                # Static content data
│   ├── faq.ts
│   ├── navigation.ts
│   ├── news.ts
│   ├── services.ts
│   └── testimonials.ts
├── router/              # Vue Router configuration
├── views/               # Page-level components
│   └── HomeView.vue
├── App.vue
└── main.ts
```

## Color Palette
- Primary: Slate-800 (dark backgrounds)
- Accent: Teal-500 (highlights, buttons)
- Text: Gray scale (50-900)
- Background: White, Gray-50

## Development
- Dev server runs on port 5000
- Uses `pnpm run dev` to start development

## Scripts
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run linting
- `pnpm run format` - Format code

## Deployment
- Static site deployment
- Build command: `pnpm run build`
- Output directory: `dist`
