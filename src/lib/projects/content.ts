import {
    collect,
    slugFromDirectory,
    type ContentComponent
} from '../content/glob';

import type { Project, ProjectUpdate } from './contracts';

// Build-time resolution; no filesystem access at request time.
const projectModules = import.meta.glob('/src/app/projects/*/page.mdx', {
    eager: true
});

const updateModules = import.meta.glob(
    '/src/app/projects/*/updates/*/content.mdx',
    { eager: true }
);

export type ProjectEntry = Project & {
    slug: string;
    Component: ContentComponent;
};

export type UpdateEntry = ProjectUpdate & {
    slug: string;
    projectSlug: string;
    Component: ContentComponent;
};

const projects = collect<Project>(
    projectModules,
    'project',
    slugFromDirectory
) as ProjectEntry[];

const updates: UpdateEntry[] = Object.entries(updateModules).map(
    ([path, mod]) => {
        const match =
            /\/projects\/([^/]+)\/updates\/([^/]+)\/content\.mdx$/.exec(path);

        if (!match) {
            throw new Error(`Cannot derive project update slugs from ${path}`);
        }

        const record = mod as Record<string, unknown>;
        const meta = record.update as ProjectUpdate | undefined;

        if (!meta) {
            throw new Error(`${path} is missing its \`update\` export`);
        }

        return {
            ...meta,
            projectSlug: match[1],
            slug: match[2],
            Component: record.default as ContentComponent
        };
    }
);

const projectIndex = new Map(projects.map(entry => [entry.slug, entry]));

/**
 * Every project, ordered by explicit `order` then by date, newest first.
 */
export function getAllProjects(includeDrafts = false): ProjectEntry[] {
    const visible = includeDrafts
        ? projects
        : projects.filter(entry => !entry.draft);

    return [...visible].sort((a, z) => {
        if (a.order !== undefined || z.order !== undefined) {
            return (a.order ?? Infinity) - (z.order ?? Infinity);
        }

        return +new Date(z.date) - +new Date(a.date);
    });
}

export function getProject(slug: string): ProjectEntry | undefined {
    return projectIndex.get(slug);
}

/**
 * Updates for one project, newest first.
 */
export function getProjectUpdates(
    projectSlug: string,
    includeDrafts = false
): UpdateEntry[] {
    return updates
        .filter(entry => entry.projectSlug === projectSlug)
        .filter(entry => includeDrafts || !entry.draft)
        .sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

export function getProjectUpdate(
    projectSlug: string,
    updateSlug: string
): UpdateEntry | undefined {
    return updates.find(
        entry => entry.projectSlug === projectSlug && entry.slug === updateSlug
    );
}

/**
 * Every update across every project, newest first.
 */
export function getAllProjectUpdates(includeDrafts = false): UpdateEntry[] {
    return updates
        .filter(entry => includeDrafts || !entry.draft)
        .sort((a, z) => +new Date(z.date) - +new Date(a.date));
}
