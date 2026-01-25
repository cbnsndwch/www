import Image from 'next/image';
import Card from '@/components/Card';
import PostTagList from '@/components/Tags/PostTagList';

import { formatDate } from '@/lib/formatDate';
import { isOwnPost, type PostWithSlug } from '@/lib/posts/contracts';
import avatarImage from '@/images/avatar.jpg';

export type PostSummaryProps = {
    post: PostWithSlug;
};

export default function PostSummary({ post }: PostSummaryProps) {
    return (
        <Card as="article">
            <Card.Title href={`/posts/${post.slug}`}>{post.title}</Card.Title>

            <div className="z-10 mt-1 flex items-center gap-3">
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
            </div>

            <Card.Eyebrow
                as="time"
                dateTime={post.date}
                decorate
                className="mt-3 text-xs"
            >
                {formatDate(post.date)}
            </Card.Eyebrow>

            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
                {post.cover?.image && (
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-64">
                        <Image
                            src={post.cover.image}
                            alt={post.cover.title || ''}
                            className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            sizes="(min-width: 640px) 32rem, 100vw"
                        />
                    </div>
                )}
                <div className="flex flex-col">
                    <Card.Description>{post.description}</Card.Description>

                    {post.tags?.length && (
                        <PostTagList
                            tags={post.tags}
                            className="z-10 mt-4"
                            color="cyan"
                        />
                    )}
                </div>
            </div>

            <Card.Cta className="mt-4">Continue reading</Card.Cta>
        </Card>
    );
}
