# Dependency Update Workflow

> **Agent Scope**: This is a focused, single-purpose task. Complete one update group at a time before moving to the next.

## Context

This project uses **pnpm** for dependency management. Dependencies are defined in `package.json`.

### Key Files

- `package.json` - Contains all dependency definitions
- `pnpm-lock.yaml` - Lockfile

---

## Step-by-Step Process

### 1. Discover Outdated Packages

```bash
pnpm ncu
```

Report findings in a structured format:

```
<outdated_packages>
  group: "TypeScript & Build"
  packages:
    - name: "typescript"
      current: "^5.3.0"
      latest: "^5.4.0"
</outdated_packages>
```

### 2. Group by Topic/Area

Organize packages into logical groups for atomic updates:

- **Next.js & React**: next, react, react-dom, @types/react*
- **UI & Tailwind**: tailwindcss, postcss, @headlessui/*, clsx
- **MDX & Content**: @mdx-js/*, @next/mdx, feed, cheerio
- **Build & Tools**: typescript, eslint, prettier, @types/node

### 3. Update One Group at a Time

For each group, follow this cycle:

#### A. Make the Change

```bash
pnpm ncu -u -f "<package-pattern>"
```

#### B. Install

```bash
pnpm install
```

#### C. Validate

```bash
pnpm build
```

#### D. Handle Errors

If build or tests fail:

```
<error_context>
  package: "typescript"
  version_change: "5.3.0 -> 5.4.0"
  error_type: "build"
  error_message: "..."
  attempted_fix: "..."
</error_context>
```

Options:
1. Fix the breaking change if straightforward
2. Pin to a working minor version
3. Revert and skip this package, noting it for manual review

#### E. Commit

```bash
git add -A && git commit -m "chore(deps): update <area/topic> packages"
```

### 4. Repeat for Next Group

Continue until all groups are processed.

---

## Recovery Procedures

### If a group update breaks the build:

1. Identify the specific package causing the issue
2. Try updating that package to a patch version instead
3. If still broken, revert the group: `git checkout -- .`
4. Document the issue and move to the next group

### If tests fail after update:

1. Check if it's a real regression or a test that needs updating
2. For snapshot tests, regenerate if changes are expected
3. For behavioral changes, update test expectations or fix code

---

## Completion Checklist

Before finishing, verify:

- [ ] All outdated packages have been addressed (updated or documented as skipped)
- [ ] Build passes: `pnpm build`
- [ ] Tests pass: `pnpm test`
- [ ] All changes are committed with descriptive messages
- [ ] Any skipped packages are documented with reasons

---

## Important Constraints

- **Always use pnpm** — never npm or yarn
- **Use turbo for builds** — `pnpm build` invokes turbo
- **One group per commit** — atomic, reversible changes
- **Catalog versions are the source of truth** — individual `package.json` files should use `catalog:shared` references, not hardcoded versions