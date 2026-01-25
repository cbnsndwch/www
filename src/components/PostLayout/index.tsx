import Image from 'next/image';

import Container from '@/components/Container';
import Prose from '@/components/Prose';
import avatarImage from '@/images/avatar.jpg';
import { formatDate } from '@/lib/formatDate';
import {
    type PostWithSlug,
    isGuestPost,
    isOwnPost
} from '@/lib/posts/contracts';

import PostTagList from '../Tags/PostTagList';

import BackButton from './BackButton';
import CoverImage from './CoverImage';
import GuestPostAcknowledgement from './GuestPostAcknowledgement';

type PostLayoutProps = {
    post: PostWithSlug;
    children: React.ReactNode;
};

export default async function PostLayout({ post, children }: PostLayoutProps) {
    return (
        <Container className="mt-8 lg:mt-16">
            <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                    <BackButton />
                    <article>
                        <header className="flex flex-col">
                            <time
                                dateTime={post.date}
                                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-400"
                            >
                                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                                <span className="ml-3">
                                    {formatDate(post.date)}
                                </span>
                            </time>

                            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                                {post.title}
                            </h1>

                            {post.tags?.length && (
                                <PostTagList
                                    tags={post.tags}
                                    className="mt-4"
                                    color="amber"
                                />
                            )}

                            <div className="mt-6 flex items-center justify-between border-y border-zinc-100 py-6 dark:border-zinc-700/40">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={post.authorAvatar || avatarImage}
                                        alt={post.author}
                                        className="h-10 w-10 border border-zinc-200 rounded-full bg-zinc-100 object-cover dark:border-zinc-700 dark:bg-zinc-800"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                            {post.author}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-zinc-500 dark:text-zinc-300">
                                                Author
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {!isOwnPost(post) && (
                                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/20 dark:text-amber-400 dark:ring-amber-500/20">
                                        Guest Post
                                    </span>
                                )}
                            </div>

                            {isGuestPost(post) && (
                                <GuestPostAcknowledgement post={post} />
                            )}
                        </header>

                        <Prose className="mt-8" data-mdx-content>
                            <CoverImage cover={post.cover} />

                            {children}
                        </Prose>
                    </article>
                </div>
            </div>
        </Container>
    );
}
