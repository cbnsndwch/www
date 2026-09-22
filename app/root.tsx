import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from 'react-router';

import '../src/styles/tailwind.css';

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
            </head>
            <body className="flex h-full bg-zinc-50 dark:bg-black">
                <div className="flex w-full">{children}</div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
    const isResponse = isRouteErrorResponse(error);
    const title = isResponse ? `${error.status}` : 'Something went wrong';
    const detail = isResponse
        ? error.statusText || 'That page could not be found.'
        : 'An unexpected error occurred.';

    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col justify-center px-4 py-24">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                {title}
            </h1>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                {detail}
            </p>
        </main>
    );
}
