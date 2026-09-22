import { data, Link, useParams } from 'react-router';

import { getPost } from '@/lib/posts/content';

export function meta({ params }: { params: { slug?: string } }) {
    const entry = params.slug ? getPost(params.slug) : undefined;

    return [
        { title: entry ? `${entry.meta.title} - Sergio Leon` : 'Not found' },
        { name: 'description', content: entry?.meta.description ?? '' }
    ];
}

export default function PostRoute() {
    const { slug } = useParams();
    const entry = slug ? getPost(slug) : undefined;

    if (!entry) {
        throw data('Post not found', { status: 404 });
    }

    const { Component, meta } = entry;

    return (
        <main className="mx-auto w-full max-w-2xl px-4 py-24">
            <Link to="/posts" className="text-sm text-amber-600">
                &larr; Back to posts
            </Link>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                {meta.title}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">{meta.date}</p>
            <div className="prose dark:prose-invert mt-10 max-w-none">
                <Component />
            </div>
        </main>
    );
}
