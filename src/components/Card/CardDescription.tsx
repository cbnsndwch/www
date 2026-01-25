import type { PropsWithChildren } from 'react';

export default function CardDescription({ children }: PropsWithChildren) {
    return (
        <div className="relative z-10 mt-2 text-sm text-zinc-700 dark:text-zinc-400">
            {children}
        </div>
    );
}
