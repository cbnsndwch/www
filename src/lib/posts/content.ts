import {
    collect,
    slugFromDirectory,
    type ContentComponent
} from '../content/glob';

import { isGuestPost, isOwnPost, type Post } from './contracts';

const modules = import.meta.glob('/src/app/posts/*/page.mdx', { eager: true });

export type PostEntry = Post & { slug: string; Component: ContentComponent };

const entries = collect<Post>(
    modules,
    'post',
    slugFromDirectory
) as PostEntry[];
const index = new Map(entries.map(entry => [entry.slug, entry]));

/** Every post, newest first. Drafts excluded unless asked for. */
export function getAllPosts(includeDrafts = false): PostEntry[] {
    const posts = includeDrafts ? entries : entries.filter(p => !p.draft);

    return [...posts].sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

export function getPost(slug: string): PostEntry | undefined {
    return index.get(slug);
}

/** The most recent posts written by Serge. */
export function getRecentPosts(count = 5, includeDrafts = false): PostEntry[] {
    if (count < 1) {
        throw new Error('count must be greater than 0');
    }

    return getAllPosts(includeDrafts).filter(isOwnPost).slice(0, count);
}

/** The most recent guest posts. Never includes drafts. */
export function getRecentGuestPosts(count = 2): PostEntry[] {
    if (count < 1) {
        throw new Error('count must be greater than 0');
    }

    return getAllPosts(false).filter(isGuestPost).slice(0, count);
}
