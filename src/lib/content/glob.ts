import type { ComponentType } from 'react';

/**
 * A content module produced by the MDX pipeline.
 *
 * `import.meta.glob` resolves at build time, so the whole content set is
 * baked into the bundle. That is what makes this work on Workers, where
 * there is no filesystem to read at request time.
 */
export type ContentModule<TMeta> = {
    default: ComponentType<Record<string, unknown>>;
} & Record<string, unknown> & { [key: string]: unknown } & TMeta;

export type ContentEntry<TMeta> = {
    slug: string;
    Component: ComponentType<Record<string, unknown>>;
    meta: TMeta;
};

/**
 * Turn an eager `import.meta.glob` record into slug-keyed entries.
 *
 * @param modules the record returned by `import.meta.glob(..., { eager: true })`
 * @param metaKey the named export each module uses for its metadata
 * @param toSlug derives the slug from the module's path
 */
export function collect<TMeta>(
    modules: Record<string, unknown>,
    metaKey: string,
    toSlug: (path: string) => string
): ContentEntry<TMeta>[] {
    const entries: ContentEntry<TMeta>[] = [];

    for (const [path, mod] of Object.entries(modules)) {
        const record = mod as Record<string, unknown>;
        const meta = record[metaKey] as TMeta | undefined;

        if (!meta) {
            throw new Error(`${path} is missing its \`${metaKey}\` export`);
        }

        entries.push({
            slug: toSlug(path),
            Component: record.default as ComponentType<Record<string, unknown>>,
            meta
        });
    }

    return entries;
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
