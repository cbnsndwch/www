# Project Update Instructions

## Role Overview

These instructions are triggered when the user indicates an update has been made to an existing project (e.g., "hey there's an update to project ABC, go read the repo, see the releases, peruse the code and the changelog, and create an update post for it"). Your goal is to analyze the changes and generate appropriate content to announce and reflect the new version.

## Workflow

When asked to process a project update, follow these steps:

### 1. Information Gathering
- **Read the Repository**: Analyze the project's source code to understand the scope of the changes.
- **Review Releases**: Check the latest GitHub releases or tags for the project.
- **Peruse the Changelog**: Read the `CHANGELOG.md` or release notes to identify key features, bug fixes, and breaking changes.
- **Analyze Commits**: If a changelog is not available, review recent commit messages to understand what was built.

### 2. Content Generation: Update Post
- Create a new blog post in `src/app/posts/` announcing the update.
- Follow the guidelines in `blog-post.instructions.md` for the file structure, metadata, and layout.
- The post should include:
  - A catchy title (e.g., "Project ABC v2.0 is Here!").
  - A summary of the most impactful changes.
  - Technical details or code snippets if relevant to the audience.
  - A call to action (e.g., "Try it out", "Read the docs").

### 3. Project Landing Page & Metadata Review
- Locate the project's landing page in `src/app/projects/[slug]/page.tsx` or `src/app/projects/[slug]/page.mdx`.
- **Decision Point**: Does the landing page content still accurately reflect the project's current state?
  - If yes: Leave it as is.
  - If no: Propose updates to the copy, features list, or technical specifications.
- **Metadata**: Check the `metadata` object exported from the project page. Update the `description` or `title` if the project's core value proposition has changed.

### 4. Asset Evaluation
- **Decision Point**: Do the new features require new visual assets?
  - Review existing images in `src/images/projects/[slug]/` or `src/images/posts/`.
  - If the UI has changed significantly, or if new major features were added, suggest generating or capturing new screenshots/images.
  - If new images are needed, outline exactly what they should depict so the user can provide them.

## Checklist

- [ ] Gathered context from repo, releases, and changelog.
- [ ] Created a draft for the update blog post following `blog-post.instructions.md`.
- [ ] Reviewed the project's landing page for necessary copy/metadata updates.
- [ ] Evaluated the need for new images/assets and provided recommendations.
