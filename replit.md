# CMS-RTL

## Overview
A Vue 3 frontend application built with Vite, TypeScript, Pinia for state management, and Vue Router for navigation.

## Project Architecture
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite 7
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Language**: TypeScript
- **Testing**: Vitest (unit), Playwright (e2e)

## Directory Structure
```
src/
├── assets/        # Static assets and CSS
├── components/    # Reusable Vue components
├── router/        # Vue Router configuration
├── stores/        # Pinia stores
├── views/         # Page-level components
├── App.vue        # Root component
└── main.ts        # Application entry point
```

## Development
- Dev server runs on port 5000
- Uses `npm run dev` to start development

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run e2e tests
- `npm run lint` - Run linting
- `npm run format` - Format code

## Deployment
- Static site deployment
- Build command: `npm run build`
- Output directory: `dist`
