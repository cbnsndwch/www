import { collect, slugFromDirectory, type ContentEntry } from '../content/glob';

import { isGuestPost, isOwnPost, type Post } from './contracts';

// Resolved at build time by Vite, so no filesystem access at request time.
const modules = import.meta.glob('/src/app/posts/*/page.mdx', { eager: true });

const entries: ContentEntry<Post>[] = collect<Post>(
    modules,
    'post',
    slugFromDirectory
);

export type PostEntry = ContentEntry<Post> & { slug: string };

function bySlug(): Map<string, PostEntry> {
    return new Map(entries.map(entry => [entry.slug, entry]));
}

const index = bySlug();

/**
 * Every post, newest first. Drafts are excluded unless asked for.
 */
export function getAllPosts(includeDrafts = false): PostEntry[] {
    const posts = includeDrafts
        ? entries
        : entries.filter(entry => !entry.meta.draft);

    return [...posts].sort(
        (a, z) => +new Date(z.meta.date) - +new Date(a.meta.date)
    );
}

/**
 * A single post, or `undefined` when the slug is unknown.
 */
export function getPost(slug: string): PostEntry | undefined {
    return index.get(slug);
}

/**
 * The most recent posts written by Serge.
 */
export function getRecentPosts(count = 5, includeDrafts = false): PostEntry[] {
    if (count < 1) {
        throw new Error('count must be greater than 0');
    }

    return getAllPosts(includeDrafts)
        .filter(entry => isOwnPost(entry.meta))
        .slice(0, count);
}

/**
 * The most recent guest posts. Never includes drafts.
 */
export function getRecentGuestPosts(count = 2): PostEntry[] {
    if (count < 1) {
        throw new Error('count must be greater than 0');
    }

    return getAllPosts(false)
        .filter(entry => isGuestPost(entry.meta))
        .slice(0, count);
}
