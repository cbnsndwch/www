import { data, useParams } from 'react-router';

import Container from '@/components/Container';
import ArrowLeftIcon from '@/components/PostLayout/ArrowLeftIcon';
import { Link } from '@/components/primitives';
import Prose from '@/components/Prose';
import { toMetaDescriptors } from '@/lib/content/metadata';
import { formatDate } from '@/lib/formatDate';
import { getProjectUpdate } from '@/lib/projects/content';

export function meta({
    params
}: {
    params: { slug?: string; updateSlug?: string };
}) {
    const update =
        params.slug && params.updateSlug
            ? getProjectUpdate(params.slug, params.updateSlug)
            : undefined;

    if (!update) {
        return [{ title: 'Not found - Sergio Leon' }];
    }

    return toMetaDescriptors({
        title: update.title,
        description: update.description,
        openGraph: {
            type: 'article',
            title: update.title,
            description: update.description,
            images: update.image ? [{ url: update.image }] : undefined
        }
    });
}

export function loader({
    params
}: {
    params: { slug?: string; updateSlug?: string };
}) {
    const found =
        params.slug && params.updateSlug
            ? getProjectUpdate(params.slug, params.updateSlug)
            : undefined;

    if (!found) {
        throw data('Update not found', { status: 404 });
    }

    return null;
}

export default function ProjectUpdateRoute() {
    const { slug, updateSlug } = useParams();
    const update = getProjectUpdate(slug!, updateSlug!)!;

    const { Component } = update;

    return (
        <Container className="mt-16 lg:mt-32">
            <div className="lg:relative">
                <div className="mx-auto max-w-2xl">
                    <Link
                        href={`/projects/${slug}/updates`}
                        aria-label="Back to updates"
                        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-20 lg:-top-1.5 lg:mb-0 xl:-left-24"
                    >
                        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
                    </Link>
                    <article>
                        <header className="flex flex-col">
                            <time
                                dateTime={update.date}
                                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-400"
                            >
                                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                                <span className="ml-3">
                                    {formatDate(update.date)}
                                </span>
                            </time>
                            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                                {update.title}
                            </h1>
                        </header>
                        <Prose className="mt-8">
                            <Component />
                        </Prose>
                    </article>
                </div>
            </div>
        </Container>
    );
}
