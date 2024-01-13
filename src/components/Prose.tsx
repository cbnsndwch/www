import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

export default function Prose({
    className,
    ...props
}: ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            className={clsx(className, 'prose dark:prose-invert')}
            {...props}
        />
    );
}
