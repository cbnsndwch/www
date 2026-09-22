import { data, useParams } from 'react-router';

import PostLayout from '@/components/PostLayout';
import { toMetaDescriptors } from '@/lib/content/metadata';
import { getPost } from '@/lib/posts/content';

export function meta({ params }: { params: { slug?: string } }) {
    const post = params.slug ? getPost(params.slug) : undefined;

    if (!post) {
        return [{ title: 'Not found - Sergio Leon' }];
    }

    return toMetaDescriptors({
        title: post.title,
        description: post.description,
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.description,
            images: post.cover?.image
                ? [{ url: post.cover.image, alt: post.cover.title }]
                : undefined
        }
    });
}

export function loader({ params }: { params: { slug?: string } }) {
    if (!params.slug || !getPost(params.slug)) {
        throw data('Post not found', { status: 404 });
    }

    return null;
}

export default function PostRoute() {
    const { slug } = useParams();
    const post = getPost(slug!)!;

    const { Component } = post;

    return (
        <PostLayout post={post}>
            <Component />
        </PostLayout>
    );
}
