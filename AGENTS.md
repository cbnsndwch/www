# Copilot Instructions for cbnsndwch-www

Personal website and blog built with **Next.js 15 App Router**, **React 19**, **Tailwind CSS 4**, and **MDX**.

## Critical Rules

- **Package Manager**: Use **pnpm** exclusively (v10.27.0+). Never use npm.
- **TypeScript Only**: All code must be TypeScript with strict typing. No `any` types.
- **Communication**: Avoid sycophantic responses. Provide thoughtful, specific feedback.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm lint     # ESLint
pnpm format   # Prettier
```

## Architecture

### Directory Structure

- [src/app/](src/app/) — App Router pages, layouts, and API routes
- [src/app/posts/](src/app/posts/) — MDX blog posts (each post is a directory with `page.mdx`)
- [src/components/](src/components/) — React components (organized by feature)
- [src/lib/](src/lib/) — Utility functions and shared logic
- [src/styles/](src/styles/) — Global styles and Tailwind config

### Component Patterns

**Server Components by Default**: Use React Server Components unless client interactivity is required. Mark client components with `'use client'` directive.

**Compound Components**: Components like `Card` use compound pattern (see [src/components/Card/index.tsx](src/components/Card/index.tsx)):

```tsx
<Card>
  <Card.Title href="/posts/example">Post Title</Card.Title>
  <Card.Description>Description text</Card.Description>
  <Card.Cta>Read post</Card.Cta>
</Card>
```

**Container Component**: Wrap page content with `Container` from [src/components/Container/](src/components/Container/).

### Blog Post Structure

Posts live in `src/app/posts/{slug}/page.mdx`. Each exports a `post` object and uses `PostLayout`:

```mdx
import PostLayout from '@/components/PostLayout';

export const post = {
  author: 'Sergio Leon',
  date: '2024-01-11',
  title: 'Post Title',
  description: 'SEO description',
  tags: ['tag1', 'tag2'],
  cover: { image: coverImage, title: 'Credit', creditUrl: 'https://...' },
};

export const metadata = { title: post.title, description: post.description };

export default function (props) {
  return <PostLayout post={post} {...props} />;
}

Your MDX content here...
```

Post types are defined in [src/lib/posts/contracts.ts](src/lib/posts/contracts.ts). Use `draft: true` to hide posts from production.

## Styling

- **Tailwind CSS**: Use utility classes exclusively. Avoid custom CSS.
- **Dark Mode**: Site uses `next-themes`. Styles must work in both light/dark modes.
- **Prose Content**: MDX content is wrapped in `Prose` component with Tailwind Typography.
- **Images**: Always use `next/image` for optimization.

## Key Integrations

- **Vercel Analytics & Speed Insights**: Integrated in root layout
- **RSS Feed**: Generated at `/feed.xml` via [src/app/feed.xml/route.ts](src/app/feed.xml/route.ts)
- **Path Aliases**: Use `@/` for `src/` imports (e.g., `@/components/Card`)

## Role-Specific Instructions

Detailed instructions for specific roles are in [.github/instructions/](.github/instructions/):

- `developer.instructions.md` — Code implementation guidelines
- `documentation-specialist.instructions.md` — Content creation patterns
- `product-manager.instructions.md` — Strategic planning
- `tester.instructions.md` — Testing checklists
- `devops-specialist.instructions.md` — Deployment (Docker/Vercel)
