# Blog Post Instructions

## Role Overview

These instructions are specifically for creating and managing blog posts in the `src/app/posts/` directory.

## File Structure

- **Path**: `src/app/posts/[slug]/page.mdx`
- **Slug**: Kebab-case, descriptive of the post title.

## Frontmatter & Metadata

In this project, we use a **JavaScript object export** named `post` for metadata (often referred to as 'Frontmatter' in our documentation). This replaces traditional YAML frontmatter to allow for strong typing and direct component imports.

### Note on Terminology
While you may see references to "Frontmatter" in other documentation, it always refers to this JavaScript object pattern, not the YAML `---` syntax.

### Required Exports

Every `.mdx` file must export the following:

1. **`post` object**: Contains all metadata used by the layout and components.
2. **`metadata` object**: Next.js Metadata API object.
3. **Default Export**: A React component rendering `PostLayout`.

### Template

```tsx
import Image from 'next/image';
import PostLayout from '@/components/PostLayout';
import coverImage from './cover.jpg'; // Optional

export const post = {
  author: 'Sergio Leon',
  date: 'YYYY-MM-DD',
  title: 'Post Title',
  description: 'A brief description for SEO and previews.',
  cover: {
    image: coverImage, // Imported static asset
    title: 'Alt text for cover image',
    creditUrl: 'https://...', // Optional credit link
  },
  tags: ['tag1', 'tag2'],
};

export const metadata = {
  title: post.title,
  description: post.description,
  openGraph: {
    title: post.title,
    description: post.description,
    type: 'article',
    url: `/posts/slug-here`, // Optional
    images: [
       // If applicable
    ]
  },
};

export default function (props) {
  return <PostLayout post={post} {...props} />;
}
```

## Content Guidelines

- **MDX**: Use standard Markdown syntax. React components can be imported and used directly.
- **Images**:
  - Place images in the same directory as the `page.mdx` file.
  - Import them: `import myImage from './image.png'`.
  - Use Next.js `<Image />`: `<Image src={myImage} alt="..." />`.
- **Code Blocks**: Supported syntax highlighting via Prism (configured globally).

## Checklist

- [ ] `post` object exported with all required fields (author, date, title, description).
- [ ] `metadata` exported using values from `post`.
- [ ] `PostLayout` wraps the content.
- [ ] Imports are correct (absolute imports from `@/` preferred for components).
- [ ] File extension is `.mdx`.
