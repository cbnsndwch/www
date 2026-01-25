import { notFound } from 'next/navigation';
import { getAllProjectUpdates } from '@/lib/projects/utils';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import { formatDate } from '@/lib/formatDate';
import BackButton from '@/components/PostLayout/BackButton';

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

export default async function ProjectUpdatePage({
    params
}: ProjectUpdatePageProps) {
    const { slug, updateSlug } = await params;
    const allUpdates = await getAllProjectUpdates();
    const update = allUpdates.find(
        u => u.projectSlug === slug && u.slug === updateSlug
    );

    if (!update) {
        notFound();
    }

    // We import the MDX content dynamically
    const { default: PostContent } = await import(
        `../../../../projects/${slug}/updates/${updateSlug}/page.mdx`
    );

    return (
        <Container className="mt-16 lg:mt-32">
            <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                    <BackButton />
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
