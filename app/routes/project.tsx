import { data, useParams } from 'react-router';

import ProjectLayout from '@/components/ProjectLayout';
import { toMetaDescriptors } from '@/lib/content/metadata';
import { getProject, getProjectUpdates } from '@/lib/projects/content';

export function meta({ params }: { params: { slug?: string } }) {
    const project = params.slug ? getProject(params.slug) : undefined;

    if (!project) {
        return [{ title: 'Not found - Sergio Leon' }];
    }

    return toMetaDescriptors({
        title: project.name,
        description: project.description
    });
}

export function loader({ params }: { params: { slug?: string } }) {
    if (!params.slug || !getProject(params.slug)) {
        throw data('Project not found', { status: 404 });
    }

    return null;
}

export default function ProjectRoute() {
    const { slug } = useParams();
    const project = getProject(slug!)!;

    const { Component } = project;

    return (
        <ProjectLayout project={project} updates={getProjectUpdates(slug!)}>
            <Component />
        </ProjectLayout>
    );
}
