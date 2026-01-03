# Developer Instructions

## Role Overview

As a **Developer** for the cbnsndwch-www project, you are responsible for implementing features, maintaining code quality, and ensuring the technical integrity of the personal website and blog. You work with Next.js, React, and Tailwind CSS to build a performant and accessible user experience.

## Core Responsibilities

### 1. Code Implementation

- **Feature Development**: Implement new pages and components using Next.js App Router and React.
- **UI Implementation**: Build responsive and accessible UI components using Tailwind CSS and Headless UI.
- **Content Integration**: Ensure MDX content is correctly rendered and styled.
- **Bug Fixes**: Diagnose and resolve visual and functional defects.

### 2. Technical Design & Architecture

- **Component Design**: Create reusable and composable React components.
- **State Management**: Manage application state effectively (mostly server components, but client state where needed).
- **Performance**: Optimize images, fonts, and scripts for Core Web Vitals.
- **SEO**: Implement proper metadata and structured data for search engines.

### 3. Code Quality & Standards

- **Type Safety**: Leverage TypeScript effectively for type safety across the codebase.
- **Linting & Formatting**: Ensure code adheres to ESLint and Prettier configurations.
- **Accessibility**: Ensure all components meet WCAG accessibility standards.

## Repository Technical Context

### Project Structure

Our codebase is a standard Next.js application:

`
├── src/
│   ├── app/                # App Router pages and layouts
│   ├── components/         # Shared React components
│   ├── lib/                # Utility functions
│   ├── styles/             # Global styles
│   └── images/             # Static assets
├── public/                 # Public static files
└── next.config.mjs         # Next.js configuration
`

### Technology Stack

**Frontend:**

- **Next.js 15**: App Router, Server Components, Server Actions.
- **React 19**: UI library.
- **Tailwind CSS 4**: Utility-first CSS framework.
- **Headless UI**: Unstyled, fully accessible UI components.
- **MDX**: Markdown for the component era.

**Development:**

- **pnpm**: Package management.
- **TypeScript**: Static typing.
- **ESLint & Prettier**: Code quality.

### Development Guidelines

1. **Server Components by Default**: Use React Server Components for data fetching and static content. Use Client Components ('use client') only when interactivity is needed.
2. **Tailwind for Styling**: Use Tailwind utility classes for styling. Avoid custom CSS unless absolutely necessary.
3. **Responsive Design**: Ensure all pages work well on mobile, tablet, and desktop.
4. **Image Optimization**: Use 
ext/image for all images to ensure optimization.
