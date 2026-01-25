import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container';
import Prose from '@/components/Prose';
import {
    ProjectWithSlug,
    ProjectUpdateWithSlug
} from '@/lib/projects/contracts';
import { formatDate } from '@/lib/formatDate';
import Card from '@/components/Card';

type ProjectLayoutProps = {
    project: ProjectWithSlug;
    updates?: ProjectUpdateWithSlug[];
    children: React.ReactNode;
};

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function ProjectLayout({
    project,
    updates = [],
    children
}: ProjectLayoutProps) {
    return (
        <Container className="mt-16 sm:mt-32">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                    <div className="max-w-xs px-2.5 lg:max-w-none">
                        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                            <Image
                                src={project.logo}
                                alt={`${project.name} logo`}
                                className="h-16 w-16"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        {project.name}
                    </h1>
                    <div className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                        {project.description}
                    </div>

                    <div className="mt-6 flex gap-6">
                        {(() => {
                            const PrimaryIcon = project.link.icon || LinkIcon;
                            return (
                                <Link
                                    href={project.link.href}
                                    className="group flex gap-2 text-sm font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                                >
                                    <PrimaryIcon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-amber-500" />
                                    {project.link.label}
                                </Link>
                            );
                        })()}
                        {project.secondaryLink && (() => {
                            const SecondaryIcon = project.secondaryLink.icon || LinkIcon;
                            return (
                                <Link
                                    href={project.secondaryLink.href}
                                    className="group flex gap-2 text-sm font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                                >
                                    <SecondaryIcon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-amber-500" />
                                    {project.secondaryLink.label}
                                </Link>
                            );
                        })()}
                    </div>

                    <Prose className="mt-10" data-mdx-content>
                        {children}
                    </Prose>
                </div>

                <div className="lg:pl-20">
                    <div className="flex flex-col gap-12">
                        {project.tech && (
                            <section>
                                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                                    Tech Stack
                                </h2>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {project.tech.map(tech => (
                                        <li
                                            key={tech}
                                            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {updates.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                                        Latest Updates
                                    </h2>
                                    <Link
                                        href={`/projects/${project.slug}/updates`}
                                        className="text-sm font-medium text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-500"
                                    >
                                        View all
                                    </Link>
                                </div>
                                <ul role="list" className="mt-6 space-y-10">
                                    {updates.slice(0, 3).map(update => (
                                        <li key={update.slug}>
                                            <Card>
                                                <Card.Title
                                                    href={`/projects/${project.slug}/updates/${update.slug}`}
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
                                            </Card>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
