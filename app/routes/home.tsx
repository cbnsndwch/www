import { Link } from 'react-router';

import { getRecentPosts } from '@/lib/posts/content';

export function meta() {
    return [
        { title: 'Sergio Leon' },
        {
            name: 'description',
            content:
                'Knowledge collector, tallbike rider, software crafter, event host, OSS contributor.'
        }
    ];
}

export default function Home() {
    const posts = getRecentPosts(5);

    return (
        <main className="mx-auto w-full max-w-2xl px-4 py-24">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                Sergio Leon
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                React Router 8 on Cloudflare Workers. Content pipeline check:
                the posts below come from MDX resolved at build time.
            </p>
            <ul className="mt-10 space-y-4">
                {posts.map(post => (
                    <li key={post.slug}>
                        <Link
                            to={`/posts/${post.slug}`}
                            className="font-medium text-zinc-800 hover:text-amber-500 dark:text-zinc-200"
                        >
                            {post.meta.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <p className="mt-10">
                <Link to="/posts" className="text-amber-600">
                    All posts
                </Link>
            </p>
        </main>
    );
}
