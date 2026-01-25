'use client';

import clsx from 'clsx';

export type CardEyebrowProps<T extends React.ElementType = 'p'> = {
    as?: T;
    decorate?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'>;

export default function CardEyebrow<T extends React.ElementType = 'p'>({
    as,
    decorate = false,
    className,
    children,
    ...props
}: CardEyebrowProps<T>) {
    let Component = as ?? 'p';

    return (
        <Component
            className={clsx(
                className,
                'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500 dark:text-zinc-500',
                decorate && 'pl-3.5'
            )}
            {...props}
        >
            {decorate && (
                <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                >
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                </span>
            )}
            {children}
        </Component>
    );
}
