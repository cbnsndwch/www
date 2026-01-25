import { StaticImageData } from 'next/image';

export interface ProjectLink {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface ProjectUpdate {
    title: string;
    date: string;
    description: string;
    content?: string;
    draft?: boolean;
}

export interface ProjectUpdateWithSlug extends ProjectUpdate {
    slug: string;
    projectSlug: string;
}

export interface Project {
    name: string;
    description: string;
    logo: string | StaticImageData;
    link: ProjectLink;
    secondaryLink?: ProjectLink;
    tech?: string[];
    draft?: boolean;
    date: string; // Launch or latest update
}

export interface ProjectWithSlug extends Project {
    slug: string;
}
