import { ComponentType } from 'react';
import glob from 'fast-glob';

interface Post {
    title: string;
    description: string;
    author: string;
    date: string;
    draft?: boolean;
}

export interface PostWithSlug extends Post {
    slug: string;
}

type PostModule = {
    default: ComponentType;
    post: Post;
};

async function importPost(postFilename: string): Promise<PostWithSlug> {
    let { post } = (await import(`../app/posts/${postFilename}`)) as PostModule;

    return {
        slug: postFilename.replace(/(\/page)?\.mdx$/, ''),
        ...post,
    };
}

export async function getAllPosts() {
    let articleFilenames = await glob('*/page.mdx', {
        cwd: './src/app/posts',
    });

    let posts = await Promise.all(articleFilenames.map(importPost));

    const sortedActivePosts = posts
        .filter((post) => !post.draft)
        .sort((a, z) => +new Date(z.date) - +new Date(a.date));

    return sortedActivePosts;
}
