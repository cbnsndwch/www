import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import Card from '@/components/Card';
import { formatDate } from '@/lib/formatDate';
import { getAllProjects, getProjectUpdates } from '@/lib/projects/utils';
import ArrowLeftIcon from '@/components/PostLayout/ArrowLeftIcon';
import Container from '@/components/Container';

export async function generateStaticParams() {
    const projects = await getAllProjects();
    return projects.map(project => ({
        slug: project.slug
    }));
}

type ProjectUpdatesPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({
    params
}: ProjectUpdatesPageProps): Promise<Metadata> {
    const { slug } = await params;
    const projects = await getAllProjects();
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return {};
    }

    return {
        title: `${project.name} Updates`,
        description: `Latest news and announcements for ${project.name}`
    };
}

export default async function ProjectUpdatesPage({
    params
}: ProjectUpdatesPageProps) {
    const { slug } = await params;
    const projects = await getAllProjects();
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    const updates = await getProjectUpdates(slug);

    return (
        <Container className="mt-16 lg:mt-32">
            <div className="lg:relative">
                <div className="mx-auto max-w-2xl">
                    <Link
                        href={`/projects/${slug}`}
                        aria-label={`Back to ${project.name}`}
                        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-20 lg:-top-1.5 lg:mb-0 xl:-left-24"
                    >
                        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
                    </Link>

                    <header className="flex flex-col">
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                            Updates for {project.name}
                        </h1>
                        <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                            Stay up to date with the latest news, features, and
                            announcements for {project.name}.
                        </p>
                    </header>

                    <div className="mt-16 sm:mt-20 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                        <div className="flex max-w-3xl flex-col space-y-16">
                            {updates.map(update => (
                                <Card as="article" key={update.slug}>
                                    <Card.Title
                                        href={`/projects/${slug}/updates/${update.slug}`}
                                    >
                                        {update.title}
                                    </Card.Title>
                                    <Card.Eyebrow
                                        as="time"
                                        dateTime={update.date}
                                        decorate
                                    >
                                        {formatDate(update.date)}
                                    </Card.Eyebrow>
                                    <Card.Description>
                                        {update.description}
                                    </Card.Description>
                                    <Card.Cta>Read update</Card.Cta>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
