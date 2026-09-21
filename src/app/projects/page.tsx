import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Card from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllProjects } from '@/lib/projects/utils';

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
            {...props}
        >
            <path d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06-1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z" />
        </svg>
    );
}

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Things I’ve made trying to put my dent in the universe.'
};

export default async function Projects() {
    const projects = await getAllProjects();

    return (
        <SimpleLayout
            title="Projects"
            intro="Erden is a platform I’m building for real, though it isn’t public yet. The rest are tools I needed and couldn’t find, which is the only reason I’ve ever started anything. Most are open source, so if something here piques your interest, read the code, file an issue, or send a PR."
        >
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map(project => (
                    <Card
                        as="li"
                        key={project.slug}
                        className="rounded-2xl bg-zinc-50/40 p-10 ring-1 ring-zinc-900/5 transition-colors hover:bg-zinc-50/80 dark:bg-zinc-800/10 dark:ring-white/10 dark:hover:bg-zinc-800/30"
                    >
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:ring-white/10">
                            <Image
                                src={project.logo}
                                alt=""
                                className="h-full w-full object-cover"
                                unoptimized
                            />
                        </div>
                        <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                            <Link href={`/projects/${project.slug}`}>
                                <span className="absolute -inset-px z-20 rounded-2xl" />
                                <span className="relative z-10">
                                    {project.name}
                                </span>
                            </Link>
                        </h2>
                        <Card.Description className="flex-1">
                            {project.description}
                        </Card.Description>
                        {project.link ? (
                            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
                                {(() => {
                                    const Icon = project.link!.icon || LinkIcon;
                                    return (
                                        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-amber-500" />
                                    );
                                })()}
                                <span className="ml-2">
                                    {project.link!.label}
                                </span>
                            </p>
                        ) : (
                            <p className="relative z-10 mt-6 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                                Not public yet
                            </p>
                        )}
                    </Card>
                ))}
            </ul>
        </SimpleLayout>
    );
}
