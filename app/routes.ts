import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('miami', 'routes/miami.tsx'),
    route('posts', 'routes/posts.tsx'),
    route('posts/:slug', 'routes/post.tsx'),
    route('projects', 'routes/projects.tsx'),
    route('projects/:slug', 'routes/project.tsx'),
    route('projects/:slug/updates', 'routes/project-updates.tsx'),
    route('projects/:slug/updates/:updateSlug', 'routes/project-update.tsx'),
    route('speaking', 'routes/speaking.tsx'),
    route('services/ghl-dev-partner', 'routes/services.ghl-dev-partner.tsx'),
    route('services/startup-partner', 'routes/services.startup-partner.tsx'),
    route('tech-stack', 'routes/tech-stack.tsx'),
    route('thank-you', 'routes/thank-you.tsx'),
    route('feed.xml', 'routes/feed[.]xml.ts'),
    route('sitemap.xml', 'routes/sitemap[.]xml.ts'),
    route('*', 'routes/not-found.tsx')
] satisfies RouteConfig;
