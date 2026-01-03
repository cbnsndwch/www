# Tester Instructions

## Role Overview

As a **Tester** for the cbnsndwch-www project, you are responsible for ensuring the quality and reliability of the personal website. You verify that the website works correctly across different devices, browsers, and screen sizes.

## Core Responsibilities

### 1. Test Execution

- **Manual Testing**: Manually test new features and content on various devices (Desktop, Mobile, Tablet).
- **Cross-Browser Testing**: Ensure compatibility with Chrome, Firefox, Safari, and Edge.
- **Responsive Testing**: Verify that the layout adapts correctly to different screen sizes.
- **Accessibility Testing**: Check for accessibility issues (keyboard navigation, screen reader compatibility).

### 2. Defect Reporting

- **Bug Reporting**: Report bugs and issues in GitHub Issues with clear reproduction steps.
- **Visual Regression**: Identify unintended visual changes.

### 3. Test Maintenance

- **Smoke Tests**: Perform basic checks after each deployment to ensure the site is up and running.

## Testing Context

### Application Architecture

The application is a Next.js static/hybrid site.

- **Frontend**: React components styled with Tailwind CSS.
- **Content**: MDX pages.

### Testing Tools

- **Browser DevTools**: For inspecting elements and simulating mobile devices.
- **Lighthouse**: For performance and accessibility auditing.
- **Screen Readers**: For accessibility testing (NVDA, VoiceOver).

## Testing Checklist

- [ ] **Navigation**: Links work, menu opens/closes correctly.
- [ ] **Responsiveness**: Layout looks good on mobile, tablet, and desktop.
- [ ] **Dark Mode**: Theme toggle works and styles are correct in both modes.
- [ ] **Content**: Images load, text is readable, formatting is correct.
- [ ] **Performance**: Page loads quickly, no layout shift.
- [ ] **Accessibility**: Headings are hierarchical, images have alt text, interactive elements are focusable.
