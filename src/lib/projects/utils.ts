import { ComponentType } from 'react';
import { join } from 'path';
import glob from 'fast-glob';

import { Project, ProjectWithSlug } from './contracts';
import { getProjectUpdates } from './updates';

type ProjectModule = {
    default: ComponentType;
    project: Project;
};

async function importProject(
    projectFilename: string
): Promise<ProjectWithSlug> {
    const projectModule = (await import(
        `../../app/projects/${projectFilename}`
    )) as ProjectModule;

    if (!projectModule.project) {
        throw new Error(`Project exports missing in ${projectFilename}`);
    }

    return {
        slug: projectFilename.replace(/(\/page)?\.mdx$/, ''),
        ...projectModule.project
    };
}

/**
 * Get all projects from the projects directory. Optionally include drafts.
 *
 * @param includeDrafts Whether to include draft projects in the results.
 */
export async function getAllProjects(includeDrafts = false) {
    const projectsDirectory = join(process.cwd(), 'src/app/projects');

    // We only want directories that contain a page.mdx (the project landing page)
    let projectFilenames = await glob('*/page.mdx', {
        cwd: projectsDirectory
    });

    let projects = await Promise.all(projectFilenames.map(importProject));

    if (!includeDrafts) {
        projects = projects.filter(project => !project.draft);
    }

    // Sort by explicit order first, then by date
    const sortedProjects = projects.sort((a, z) => {
        if (a.order !== undefined || z.order !== undefined) {
            return (a.order ?? Infinity) - (z.order ?? Infinity);
        }
        return +new Date(z.date) - +new Date(a.date);
    });

    return sortedProjects;
}

/**
 * Get all updates for all projects.
 *
 * @param includeDrafts Whether to include draft updates.
 */
export async function getAllProjectUpdates(includeDrafts = false) {
    const projects = await getAllProjects(includeDrafts);
    const allUpdates = await Promise.all(
        projects.map(project => getProjectUpdates(project.slug, includeDrafts))
    );

    return allUpdates
        .flat()
        .sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

export { getProjectUpdates } from './updates';
