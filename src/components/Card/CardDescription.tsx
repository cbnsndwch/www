import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

export default function CardDescription({
    children,
    className
}: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            className={clsx(
                'relative z-10 mt-2 text-sm text-zinc-700 dark:text-zinc-300',
                className
            )}
        >
            {children}
        </div>
    );
}
