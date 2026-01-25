import { ComponentType } from 'react';
import { join } from 'path';
import glob from 'fast-glob';

import { ProjectUpdate, ProjectUpdateWithSlug } from './contracts';

type UpdateModule = {
    default: ComponentType;
    update: ProjectUpdate;
};

async function importUpdate(
    projectSlug: string,
    updateFilename: string
): Promise<ProjectUpdateWithSlug> {
    const { update } = (await import(
        `../../app/projects/${projectSlug}/updates/${updateFilename}`
    )) as UpdateModule;

    return {
        slug: updateFilename.replace(/(\/page)?\.mdx$/, ''),
        projectSlug,
        ...update
    };
}

/**
 * Get all updates for a specific project.
 *
 * @param projectSlug The slug of the project.
 * @param includeDrafts Whether to include draft updates.
 */
export async function getProjectUpdates(
    projectSlug: string,
    includeDrafts = false
) {
    const updatesDirectory = join(
        process.cwd(),
        `src/app/projects/${projectSlug}/updates`
    );

    let updateFilenames = await glob('**/page.mdx', {
        cwd: updatesDirectory
    });

    let updates = await Promise.all(
        updateFilenames.map(filename => importUpdate(projectSlug, filename))
    );

    if (!includeDrafts) {
        updates = updates.filter(update => !update.draft);
    }

    const sortedUpdates = updates.sort(
        (a, z) => +new Date(z.date) - +new Date(a.date)
    );

    return sortedUpdates;
}

/**
 * Get all updates for all projects.
 *
 * @param includeDrafts Whether to include draft updates.
 * @param allProjects A list of projects to get updates for.
 */
export async function getAllProjectUpdates(
    projectSlugs: string[],
    includeDrafts = false
) {
    const allUpdates = await Promise.all(
        projectSlugs.map(slug => getProjectUpdates(slug, includeDrafts))
    );

    return allUpdates
        .flat()
        .sort((a, z) => +new Date(z.date) - +new Date(a.date));
}
