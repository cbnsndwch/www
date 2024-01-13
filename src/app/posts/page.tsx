import { type Metadata } from 'next';

import Card from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { type PostWithSlug, getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/formatDate';

type PostSummaryProps = {
    post: PostWithSlug;
};

function PostSummary({ post }: PostSummaryProps) {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card className="md:col-span-3">
                <Card.Title href={`/posts/${post.slug}`}>
                    {post.title}
                </Card.Title>
                <Card.Eyebrow
                    as="time"
                    dateTime={post.date}
                    className="md:hidden"
                    decorate
                >
                    {formatDate(post.date)}
                </Card.Eyebrow>
                <Card.Description>{post.description}</Card.Description>
                <Card.Cta>Read post</Card.Cta>
            </Card>
            <Card.Eyebrow
                as="time"
                dateTime={post.date}
                className="mt-1 hidden md:block"
            >
                {formatDate(post.date)}
            </Card.Eyebrow>
        </article>
    );
}

export const metadata: Metadata = {
    title: 'Posts',
    description:
        'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
};

export default async function PostsIndex() {
    let posts = await getAllPosts();

    return (
        <SimpleLayout
            title="Writing on software, startups, company building, and multiculturality."
            intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        >
            <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                <div className="flex max-w-3xl flex-col space-y-16">
                    {!posts?.length && (
                        <p className="text-center">
                            No posts yet. Check back soon!
                        </p>
                    )}

                    {posts.map((post) => (
                        <PostSummary key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </SimpleLayout>
    );
}
