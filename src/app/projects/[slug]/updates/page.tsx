import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SimpleLayout } from '@/components/SimpleLayout';
import Card from '@/components/Card';
import { formatDate } from '@/lib/formatDate';
import { getAllProjects, getProjectUpdates } from '@/lib/projects/utils';

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
        <SimpleLayout
            title={`Updates for ${project.name}`}
            intro={`Stay up to date with the latest news, features, and announcements for ${project.name}.`}
        >
            <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
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
        </SimpleLayout>
    );
}
