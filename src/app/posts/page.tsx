import { type Metadata } from 'next';
import Image from 'next/image';

import Card from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllPosts } from '@/lib/posts/utils';
import { isOwnPost, PostWithSlug } from '@/lib/posts/contracts';
import { formatDate } from '@/lib/formatDate';
import avatarImage from '@/images/avatar.jpg';
import PostTagList from '@/components/Tags/PostTagList';

type PostSummaryProps = {
    post: PostWithSlug;
};

function PostSummary({ post }: PostSummaryProps) {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card.Eyebrow
                as="time"
                dateTime={post.date}
                className="mt-1 hidden text-xs md:block md:pr-8 md:text-right"
            >
                {formatDate(post.date)}
            </Card.Eyebrow>

            <Card className="md:col-span-3 md:pl-8">
                <Card.Title href={`/posts/${post.slug}`}>
                    {post.title}
                </Card.Title>

                <div className="mt-1 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Image
                            src={post.authorAvatar || avatarImage}
                            alt={post.author}
                            className="h-5 w-5 border border-zinc-200 rounded-full bg-zinc-100 object-cover dark:border-zinc-700 dark:bg-zinc-800"
                        />
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                            {post.author}
                        </span>
                        {!isOwnPost(post) && (
                            <span className="inline-flex items-center rounded-full bg-amber-50 px-1.5 py-0 text-[10px] font-medium text-amber-800 ring-1 ring-inset ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20">
                                GUEST
                            </span>
                        )}
                    </div>
                    <Card.Eyebrow
                        as="time"
                        dateTime={post.date}
                        className="text-xs md:hidden"
                        decorate
                    >
                        {formatDate(post.date)}
                    </Card.Eyebrow>
                </div>

                <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
                    {post.cover?.image && (
                        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-64">
                            <Image
                                src={post.cover.image}
                                alt={post.cover.title || ''}
                                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                sizes="(min-width: 768px) 32rem, 100vw"
                            />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <Card.Description>{post.description}</Card.Description>

                        {post.tags?.length && (
                            <PostTagList
                                tags={post.tags}
                                className="mt-4"
                                color="amber"
                            />
                        )}
                    </div>
                </div>

                <Card.Cta className="mt-4">Read post</Card.Cta>
            </Card>
        </article>
    );
}

export const metadata: Metadata = {
    title: 'Posts',
    description:
        'Some of my long-ish form thoughts on programming, leadership, product design, and more, plus thoughts from good friends, collected in chronological order. '
};

export default async function PostsIndex() {
    let posts = await getAllPosts();

    return (
        <SimpleLayout
            title="Writing on software, startups, company building, and multiculturalism."
            intro="Some of my long-ish form thoughts on programming, leadership, product design, and more, plus thoughts from good friends, collected in chronological order. "
        >
            <div className="relative max-w-3xl">
                <div className="absolute left-[25%] top-0 bottom-0 hidden w-px bg-zinc-100 dark:bg-zinc-700/40 md:block" />
                <div className="flex flex-col space-y-16">
                    {!posts?.length && (
                        <p className="text-center">
                            No posts yet. Check back soon!
                        </p>
                    )}

                    {posts.map(post => (
                        <PostSummary key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </SimpleLayout>
    );
}
