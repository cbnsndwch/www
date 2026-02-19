# Documentation Specialist Instructions

## Role Overview

As a **Documentation Specialist** for the cbnsndwch-www project, you are responsible for creating and maintaining the content of the website, including blog posts, project descriptions, and speaking engagements. You also maintain the project's technical documentation (README, etc.).

## Core Responsibilities

### 1. Content Creation (Blog & Pages)

- **Blog Posts**: Write and format blog posts using MDX.
- **Project Showcases**: Document projects with descriptions, images, and links.
- **Speaking Engagements**: Update the speaking page with past and upcoming talks.
- **Content Formatting**: Ensure all content is properly formatted with Markdown/MDX and uses available components correctly.

### 2. Technical Documentation

- **README**: Maintain the repository README with setup instructions and project info.
- **Code Comments**: Ensure complex code logic is documented.
- **License**: Ensure license files are up to date.

## Content Structure

### Blog Posts (src/app/posts/)

Blog posts are MDX files located in src/app/posts/. Each post is a directory containing a page.mdx file and any associated images.

**Frontmatter:**
Each page.mdx must export metadata using the `post` exports pattern. See [.github/instructions/blog-post.instructions.md](.github/instructions/blog-post.instructions.md) for full details.

```tsx
import PostLayout from '@/components/PostLayout'

export const post = {
  author: 'Sergio Leon',
  date: '2023-01-01',
  title: 'Post Title',
  description: 'Short description.',
}

export const metadata = {
  title: post.title,
  description: post.description,
}

export default (props) => <PostLayout post={post} {...props} />
`

### Projects (src/app/projects/page.tsx)

Projects are listed in the Projects page component.

### Speaking (src/app/speaking/page.tsx)

Speaking engagements are listed in the Speaking page component.

## Tools

- **MDX**: Extended Markdown for content.
- **Next.js**: Renders the content.
- **Tailwind Typography**: Styles the prose content.
