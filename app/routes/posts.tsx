import { Link } from 'react-router';

import { getAllPosts } from '@/lib/posts/content';

export function meta() {
    return [{ title: 'Posts - Sergio Leon' }];
}

export default function Posts() {
    const posts = getAllPosts();

    return (
        <main className="mx-auto w-full max-w-2xl px-4 py-24">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                Posts
            </h1>
            <ul className="mt-10 space-y-8">
                {posts.map(post => (
                    <li key={post.slug}>
                        <Link
                            to={`/posts/${post.slug}`}
                            className="text-lg font-semibold text-zinc-800 hover:text-amber-500 dark:text-zinc-200"
                        >
                            {post.meta.title}
                        </Link>
                        <p className="mt-1 text-sm text-zinc-500">
                            {post.meta.date}
                        </p>
                        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                            {post.meta.description}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
