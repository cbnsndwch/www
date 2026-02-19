import { notFound } from 'next/navigation';
import Link from 'next/link';
import { type Metadata } from 'next';

import { getAllProjectUpdates, getProjectUpdates } from '@/lib/projects/utils';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import { formatDate } from '@/lib/formatDate';
import ArrowLeftIcon from '@/components/PostLayout/ArrowLeftIcon';

export async function generateStaticParams() {
    const updates = await getAllProjectUpdates();
    return updates.map(update => ({
        slug: update.projectSlug,
        updateSlug: update.slug
    }));
}

type ProjectUpdatePageProps = {
    params: Promise<{ slug: string; updateSlug: string }>;
};

export async function generateMetadata({
    params
}: ProjectUpdatePageProps): Promise<Metadata> {
    const { slug, updateSlug } = await params;
    const projectUpdates = await getProjectUpdates(slug);
    const update = projectUpdates.find(u => u.slug === updateSlug);

    if (!update) {
        return {};
    }

    const images = update.image
        ? [
              {
                  url: update.image.src,
                  width: update.image.width,
                  height: update.image.height,
                  alt: update.title
              }
          ]
        : [];

    return {
        title: update.title,
        description: update.description,
        openGraph: {
            title: update.title,
            description: update.description,
            type: 'article',
            images
        },
        twitter: {
            card: images.length > 0 ? 'summary_large_image' : 'summary',
            title: update.title,
            description: update.description,
            images: images.map(i => i.url)
        }
    };
}

export default async function ProjectUpdatePage({
    params
}: ProjectUpdatePageProps) {
    const { slug, updateSlug } = await params;
    const projectUpdates = await getProjectUpdates(slug);
    const update = projectUpdates.find(u => u.slug === updateSlug);

    if (!update) {
        notFound();
    }

    // We import the MDX content dynamically
    const { default: PostContent } = await import(
        `../../../../projects/${slug}/updates/${updateSlug}/content.mdx`
    );

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
                            <PostContent />
                        </Prose>
                    </article>
                </div>
            </div>
        </Container>
    );
}
