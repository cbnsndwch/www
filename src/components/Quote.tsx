import type { ReactNode } from 'react';
import { Quote as QuoteIcon } from 'lucide-react';
import clsx from 'clsx';

interface QuoteProps {
    children: ReactNode;
    attribution?: string;
    className?: string;
}

export default function Quote({
    children,
    attribution,
    className
}: QuoteProps) {
    return (
        <figure
            className={clsx(
                'relative my-10 overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 px-8 py-10 dark:border-zinc-700/40 dark:bg-zinc-800/50',
                className
            )}
        >
            <QuoteIcon className="absolute -top-2 left-4 h-16 w-16 text-teal-500/10 dark:text-teal-400/10" />
            <p className="relative text-center text-xl font-medium leading-relaxed text-zinc-900 not-italic dark:text-zinc-100">
                {children}
            </p>
            {attribution && (
                <figcaption className="mt-6 text-right text-sm text-zinc-500 dark:text-zinc-400">
                    — {attribution}
                </figcaption>
            )}
            <QuoteIcon className="absolute -bottom-2 right-4 h-16 w-16 rotate-180 text-teal-500/10 dark:text-teal-400/10" />
        </figure>
    );
}
