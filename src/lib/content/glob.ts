import type { ComponentType } from 'react';

export type ContentComponent = ComponentType<Record<string, unknown>>;

/**
 * Turn an eager `import.meta.glob` record into flat, slug-bearing entries.
 *
 * `import.meta.glob` resolves at build time, so the whole content set is
 * baked into the bundle. That is what makes this work on Workers, where
 * there is no filesystem to read at request time.
 *
 * Entries are flattened (metadata spread onto the entry alongside `slug` and
 * `Component`) so presentation components can keep consuming the same shape
 * they did under the previous loader.
 */
export function collect<TMeta extends object>(
    modules: Record<string, unknown>,
    metaKey: string,
    toSlug: (path: string) => string
): Array<TMeta & { slug: string; Component: ContentComponent }> {
    return Object.entries(modules).map(([path, mod]) => {
        const record = mod as Record<string, unknown>;
        const meta = record[metaKey] as TMeta | undefined;

        if (!meta) {
            throw new Error(`${path} is missing its \`${metaKey}\` export`);
        }

        return {
            ...meta,
            slug: toSlug(path),
            Component: record.default as ContentComponent
        };
    });
}

/**
 * Slug for content stored as `<dir>/<slug>/page.mdx`.
 */
export function slugFromDirectory(path: string): string {
    const match = /\/([^/]+)\/page\.mdx$/.exec(path);

    if (!match) {
        throw new Error(`Cannot derive a slug from ${path}`);
    }

    return match[1];
}
