import { ComponentType } from 'react';
import { join } from 'path';
import glob from 'fast-glob';

import { Post, PostWithSlug, isGuestPost, isOwnPost } from './contracts';

type PostModule = {
    default: ComponentType;
    post: Post;
};

async function importPost(postFilename: string): Promise<PostWithSlug> {
    const { default: content, post } = (await import(
        `../../app/posts/${postFilename}`
    )) as PostModule;

    const raw = content.toString();

    return {
        slug: postFilename.replace(/(\/page)?\.mdx$/, ''),
        raw,
        ...post
    };
}

/**
 * Get all posts from the posts directory. Optionally include drafts.
 *
 * @param includeDrafts Whether to include draft posts in the results.
 */
export async function getAllPosts(includeDrafts = false) {
    const postsDirectory = join(process.cwd(), 'src/app/posts');

    let articleFilenames = await glob('*/page.mdx', {
        cwd: postsDirectory
    });

    let posts = await Promise.all(articleFilenames.map(importPost));

    if (!includeDrafts) {
        posts = posts.filter(post => !post.draft);
    }

    const sortedPosts = posts.sort(
        (a, z) => +new Date(z.date) - +new Date(a.date)
    );

    return sortedPosts;
}

/**
 * Get the most recent posts from the posts directory. Optionally include drafts.
 *
 * @param count the number of posts to return. Defaults to `5`.
 * @param includeDrafts Whether to include draft posts in the results. Defaults to `false`.
 */
export async function getRecentPosts(count = 5, includeDrafts = false) {
    if (count < 1) {
        throw new Error('count must be greater than 0');
    }

    const posts = await getAllPosts(includeDrafts);
    const recentPosts = posts
        .filter(isOwnPost)
        .slice(0, Math.min(count, posts.length));

    return recentPosts;
}

/**
 * Get the most recent guest posts from the posts directory. Does not include drafts.
 *
 * @param count the number of posts to return. Defaults to `2`.
 */
export async function getRecentGuestPosts(count = 2) {
    if (count < 1) {
        throw new Error('count must be greater than 0');
    }

    const posts = await getAllPosts(false);
    const recentPosts = posts
        .filter(isGuestPost)
        .slice(0, Math.min(count, posts.length));

    return recentPosts;
}
