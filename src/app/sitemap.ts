import { MetadataRoute } from 'next';

import { getAllPosts } from '@/lib/posts/utils';
import { getAllProjects, getAllProjectUpdates } from '@/lib/projects/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
        throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable');
    }

    const map: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1
        },
        {
            url: `${siteUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9
        },
        {
            url: `${siteUrl}/speaking`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${siteUrl}/tech-stack`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${siteUrl}/miami`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${siteUrl}/posts`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8
        },
        {
            url: `${siteUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8
        }
    ];

    const posts = await getAllPosts();

    for (const post of posts) {
        const url = String(new URL(`/posts/${post.slug}`, siteUrl));

        map.push({
            url,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly',
            priority: 0.65
        });
    }

    const projects = await getAllProjects();

    for (const project of projects) {
        const url = String(new URL(`/projects/${project.slug}`, siteUrl));

        map.push({
            url,
            lastModified: new Date(project.date),
            changeFrequency: 'weekly',
            priority: 0.75
        });

        const updatesUrl = String(
            new URL(`/projects/${project.slug}/updates`, siteUrl)
        );
        map.push({
            url: updatesUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6
        });
    }

    const updates = await getAllProjectUpdates();

    for (const update of updates) {
        const url = String(
            new URL(
                `/projects/${update.projectSlug}/updates/${update.slug}`,
                siteUrl
            )
        );

        map.push({
            url,
            lastModified: new Date(update.date),
            changeFrequency: 'monthly',
            priority: 0.5
        });
    }

    return map;
}
