import { lazy, Suspense, useSyncExternalStore } from 'react';

/**
 * `react-tweet`'s client entry re-exports through modules that import CSS,
 * which the SSR build cannot statically resolve. Loading it lazily in the
 * browser keeps it out of the server bundle entirely.
 */
const ReactTweet = lazy(async () => {
    const mod = await import('react-tweet');

    return { default: mod.Tweet };
});

function Placeholder({ id }: { id: string }) {
    return (
        <a
            href={`https://x.com/i/status/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700/40"
        >
            View this post on X
        </a>
    );
}

const subscribe = () => () => {};

export default function Tweet({ id }: { id: string }) {
    // false during SSR and the first client render, true afterwards
    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    );

    return (
        <div className="not-prose my-10 flex justify-center">
            {mounted ? (
                <Suspense fallback={<Placeholder id={id} />}>
                    <ReactTweet id={id} />
                </Suspense>
            ) : (
                <Placeholder id={id} />
            )}
        </div>
    );
}
