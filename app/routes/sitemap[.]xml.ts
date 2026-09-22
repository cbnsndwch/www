import { getAllPosts } from '@/lib/posts/content';
import { getAllProjectUpdates, getAllProjects } from '@/lib/projects/content';

const SITE_URL = 'https://www.cbnsndwch.io';

type Entry = { path: string; lastModified?: string; priority: number };

export async function loader() {
    const entries: Entry[] = [
        { path: '/', priority: 1 },
        { path: '/about', priority: 0.9 },
        { path: '/speaking', priority: 0.8 },
        { path: '/tech-stack', priority: 0.8 },
        { path: '/miami', priority: 0.8 },
        { path: '/posts', priority: 0.8 },
        { path: '/projects', priority: 0.8 }
    ];

    for (const post of getAllPosts()) {
        entries.push({
            path: `/posts/${post.slug}`,
            lastModified: post.date,
            priority: 0.65
        });
    }

    for (const project of getAllProjects()) {
        entries.push({
            path: `/projects/${project.slug}`,
            lastModified: project.date,
            priority: 0.75
        });
        entries.push({
            path: `/projects/${project.slug}/updates`,
            priority: 0.6
        });
    }

    for (const update of getAllProjectUpdates()) {
        entries.push({
            path: `/projects/${update.projectSlug}/updates/${update.slug}`,
            lastModified: update.date,
            priority: 0.5
        });
    }

    const now = new Date().toISOString();
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
    .map(
        entry => `    <url>
        <loc>${SITE_URL}${entry.path}</loc>
        <lastmod>${new Date(entry.lastModified ?? now).toISOString()}</lastmod>
        <priority>${entry.priority}</priority>
    </url>`
    )
    .join('\n')}
</urlset>`;

    return new Response(body, {
        headers: {
            'content-type': 'application/xml',
            'cache-control': 'public, max-age=3600'
        }
    });
}
