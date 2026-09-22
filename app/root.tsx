import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError
} from 'react-router';

import { Providers } from '@/app/providers';
import { Layout as SiteChrome } from '@/components/Layout';
import '@/styles/tailwind.css';

const SITE_NAME = 'Sergio Leon';
const DESCRIPTION =
    'Knowledge collector, tallbike rider, software crafter, event host, OSS contributor.';

export function meta() {
    return [
        { title: `${SITE_NAME} - ${DESCRIPTION}` },
        { name: 'description', content: DESCRIPTION },
        { name: 'twitter:card', content: 'summary_large_image' }
    ];
}

export function links() {
    return [
        { rel: 'icon', href: '/favicon.ico' },
        {
            rel: 'alternate',
            type: 'application/rss+xml',
            href: '/feed.xml',
            title: SITE_NAME
        }
    ];
}

/**
 * Sets the theme class before first paint so a dark-mode visitor never sees a
 * light flash. `next-themes` did this with its own inline script; on Workers
 * the document shell is ours, so we inline it here.
 */
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||((!s||s==='system')&&d)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full antialiased" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
            </head>
            <body className="flex h-full bg-zinc-50 dark:bg-black">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <Providers>
            <div className="flex w-full">
                <SiteChrome>
                    <Outlet />
                </SiteChrome>
            </div>
        </Providers>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    const isResponse = isRouteErrorResponse(error);
    const status = isResponse ? error.status : 500;
    const title = status === 404 ? 'Page not found' : 'Something went wrong';
    const detail =
        status === 404
            ? 'That page does not exist, or it moved.'
            : 'An unexpected error occurred.';

    return (
        <Providers>
            <div className="flex w-full">
                <SiteChrome>
                    <main className="mx-auto flex w-full max-w-2xl flex-col justify-center px-4 py-24 sm:px-8">
                        <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
                            {status}
                        </p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                            {detail}
                        </p>
                    </main>
                </SiteChrome>
            </div>
        </Providers>
    );
}
