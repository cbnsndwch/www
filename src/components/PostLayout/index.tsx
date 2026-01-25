'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { AppContext } from '@/app/providers';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import { formatDate } from '@/lib/formatDate';
import {
    type PostWithSlug,
    isGuestPost,
    isOwnPost
} from '@/lib/posts/contracts';
import avatarImage from '@/images/avatar.jpg';

import ArrowLeftIcon from './ArrowLeftIcon';
import CoverImage from './CoverImage';
import PostTagList from '../Tags/PostTagList';
import GuestPostAcknowledgement from './GuestPostAcknowledgement';

type PostLayoutProps = {
    post: PostWithSlug;
    children: React.ReactNode;
};

export default function PostLayout({ post, children }: PostLayoutProps) {
    let router = useRouter();
    let { previousPathname } = useContext(AppContext);

    return (
        <Container className="mt-8 lg:mt-16">
            <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                    {previousPathname && (
                        <button
                            type="button"
                            onClick={() => router.back()}
                            aria-label="Go back to post"
                            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
                        >
                            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
                        </button>
                    )}
                    <article>
                        <header className="flex flex-col">
                            <time
                                dateTime={post.date}
                                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
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
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Author
                                        </span>
                                    </div>
                                </div>
                                {!isOwnPost(post) && (
                                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-500 dark:ring-amber-500/20">
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
