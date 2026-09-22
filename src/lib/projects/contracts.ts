import type { ImageAsset } from '../content/image';

export interface ProjectLink {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface ProjectUpdate {
    title: string;
    date: string;
    description: string;
    image?: ImageAsset;
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
    logo: ImageAsset;
    link?: ProjectLink;
    secondaryLink?: ProjectLink;
    tech?: string[];
    draft?: boolean;
    order?: number;
    date: string; // Launch or latest update
}

export interface ProjectWithSlug extends Project {
    slug: string;
}
