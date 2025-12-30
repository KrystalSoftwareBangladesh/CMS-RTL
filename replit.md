# Rising Trading Ltd. - Global Trading Website

## Overview
A Vue 3 website for Rising Trading Ltd. - a global trading company based in Bangladesh. Features a modular component architecture with reusable base components, centralized data management, and custom theme colors based on the company logo.

## Project Architecture
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4 with custom theme
- **Routing**: Vue Router 4
- **i18n**: vue-i18n for multi-language support
- **Language**: TypeScript
- **Fonts**: Inter (body), Poppins (headings)

## Multi-Language Support
The website supports 6 languages for the countries served:
- **English** (USA, UK, Canada, Australia)
- **French** (Canada)
- **Norwegian** (Norway)
- **Hindi** (India)
- **Chinese** (China)
- **Bengali** (Bangladesh)

Translation files are in `src/i18n/locales/`. Use `useI18n()` and `t('key')` to translate text.
Language selection is persisted to localStorage.

## Brand Colors (based on logo)
- **Primary (Navy)**: #2D3A5C - Main brand color for headers, dark sections
- **Secondary (Red)**: #E63946 - Accent color for buttons, highlights, CTAs
- **Light variants**: primary-light, secondary-light
- **Dark variants**: primary-dark, secondary-dark

## Directory Structure
```
src/
├── assets/
│   ├── images/          # Stock images and assets
│   └── main.css         # Tailwind configuration with theme colors
├── components/
│   ├── base/            # Reusable UI components
│   │   ├── BaseButton.vue
│   │   ├── BaseCard.vue
│   │   ├── SectionHeader.vue
│   │   └── ServiceCard.vue
│   ├── layout/          # Layout components
│   │   ├── AppNavbar.vue   # Uses company logo
│   │   └── AppFooter.vue   # Uses company logo
│   ├── admin/           # Admin panel components
│   │   ├── AdminLayout.vue    # Main admin layout wrapper
│   │   ├── AdminSidebar.vue   # Navigation sidebar
│   │   ├── AdminHeader.vue    # Header with language/profile
│   │   ├── StatCard.vue       # Dashboard statistics cards
│   │   └── DataTable.vue      # Reusable data table with CRUD actions
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
├── i18n/                # Internationalization
│   ├── index.ts         # i18n configuration
│   └── locales/         # Translation files (200+ keys per language)
│       ├── en.json      # English
│       ├── fr.json      # French
│       ├── no.json      # Norwegian
│       ├── hi.json      # Hindi
│       ├── zh.json      # Chinese
│       └── bn.json      # Bengali
├── router/              # Vue Router configuration
├── views/               # Page-level components
│   ├── HomeView.vue
│   ├── AboutView.vue
│   ├── ServicesView.vue
│   ├── PortfolioView.vue
│   ├── NewsView.vue
│   ├── ContactView.vue
│   └── admin/           # Admin panel views
│       ├── AdminDashboard.vue
│       ├── AdminServices.vue
│       ├── AdminNews.vue
│       ├── AdminProjects.vue
│       ├── AdminTestimonials.vue
│       ├── AdminFAQ.vue
│       └── AdminSettings.vue
├── App.vue
└── main.ts
public/
├── logo.png            # Company logo (transparent)
```

## Theme Color Usage
All colors are defined in `src/assets/main.css` using CSS variables:
- Use `bg-primary`, `text-primary`, `border-primary` for navy blue
- Use `bg-secondary`, `text-secondary`, `border-secondary` for red accent
- Variants: `primary-light`, `primary-dark`, `secondary-light`, `secondary-dark`
- Never hardcode colors like `slate-800` or `teal-500` - use theme colors instead

## Development
- Dev server runs on port 5000
- Uses `npm run dev` to start development

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linting
- `npm run type-check` - TypeScript type checking

## Deployment
- Static site deployment
- Build command: `npm run build`
- Output directory: `dist`

## Translation Structure
All translations are organized by sections with 200+ keys per language:
- **nav**: Navigation menu items
- **hero**: Homepage hero section
- **about**: About page and section content
- **services**: Services page with all service types and descriptions
- **portfolio**: Portfolio page with project titles, descriptions, and stats
- **news**: News page with article titles, excerpts, and newsletter section
- **contact**: Contact page with form labels and location info
- **cta**: Call-to-action sections
- **footer**: Footer links and content
- **faq**: All 5 FAQ questions and answers
- **testimonials**: Testimonial section labels
- **admin**: Complete admin panel translations (nav, dashboard, services, news, projects, testimonials, faq, settings)

## Design Patterns
- Active navbar indicators only show when scrolled (frosted glass state)
- Consistent component reuse across all pages (BaseCard, BaseButton, SectionHeader)
- All section components use theme colors for consistency
- Dynamic translations via useI18n() composable in all Vue components

## Admin Panel
Access the admin panel at `/admin`. Features include:
- **Dashboard**: Overview with statistics, recent activity, and quick actions
- **Services**: Manage logistics services (CRUD operations)
- **News**: Manage news articles and blog posts
- **Projects**: Manage portfolio projects
- **Testimonials**: Manage customer testimonials
- **FAQ**: Manage frequently asked questions
- **Settings**: Company information, social links, SEO settings

Admin panel uses the same theme colors and reuses base components (BaseCard, BaseButton) for consistency. Full multi-language support with reactive translations when switching languages.
