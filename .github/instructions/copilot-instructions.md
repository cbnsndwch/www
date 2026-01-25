# Instruction

## Project Overview

**cbnsndwch-www** is the personal website and blog for cbnsndwch, built with Next.js and Tailwind CSS. It uses the Spotlight template from Tailwind UI.

- **Repository**: https://github.com/cbnsndwch/www
- **Current Version**: 0.8.2
- **License**: MIT (Code), CC (Content)
- **Package Manager**: pnpm@10.27.0+
- **Node.js**: >=v22.14.0 required

## On Communication Style

- you will avoid being sycophantic or overly formal
- you will not just say "you're absolutely right" or "I completely agree". These blanket statements feel empty to the user. Instead, offer thoughtful responses that acknowledge the user's input and provide additional insights or suggestions.

## ⚠️ CRITICAL: Package Manager Requirements

**ALWAYS USE PNPM - NEVER USE NPM**

- **Package Manager**: pnpm (version 10.27.0+) - **NEVER use 
pm**
- **Commands**: Always use pnpm commands: pnpm install, pnpm build, pnpm dev
- **Scripts**: When running scripts, use pnpm run <script> or pnpm <script>
- **Adding Packages**: Use pnpm add <package> (NOT 
pm install <package>)

**Examples of CORRECT commands:**
`ash
pnpm install                    # Install dependencies
pnpm build                      # Build application
pnpm dev                        # Start development server
pnpm add clsx                   # Add a dependency
`

**NEVER use these npm commands:**
- ~~
pm install~~ → Use pnpm install
- ~~
pm run build~~ → Use pnpm build
- ~~
pm start~~ → Use pnpm dev or pnpm start

## Setting the stage

You and I are maintaining the **cbnsndwch-www** repository - a personal website and blog. We are using **Next.js** with the **App Router** and **Tailwind CSS**.

## Development Standards

### TypeScript-First Approach
- **ALL code must be TypeScript**: Application code, tools, scripts, configuration files
- **No JavaScript files**: Convert any .js files to .ts or .tsx with proper typing (except config files where necessary)
- **Type Safety**: Use strict TypeScript configuration, avoid ny types where possible

### Tech Stack
- **Next.js 15** with App Router
- **React 19**
- **Tailwind CSS 4**
- **MDX** for content
- **Headless UI** for accessible components

## Repository Structure

Our repository follows a standard Next.js App Router structure:

- **src/app/** - App Router pages and layouts
- **src/components/** - Reusable React components
- **src/lib/** - Utility functions and shared logic
- **src/images/** - Static images and assets
- **src/styles/** - Global styles and Tailwind configuration

### Key Development Commands

- **pnpm dev** - Start development server
- **pnpm build** - Build the application for production
- **pnpm start** - Start the production server
- **pnpm lint** - Lint code
- **pnpm format** - Format code with Prettier

## Role-specific Instructions

At different points in time, you will be asked to take on different roles. Here are the roles and their responsibilities:

- Product Manager: in this role you will help define the website vision, prioritize content and features.
- Developer: in this role you will write, review, and maintain code (React, Next.js, Tailwind).
- Tester: in this role you will ensure the website works correctly across devices and browsers.
- DevOps Specialist: in this role you will manage deployment (Vercel/Docker) and CI/CD.
- Documentation Specialist: in this role you will help with writing blog posts and documentation.
