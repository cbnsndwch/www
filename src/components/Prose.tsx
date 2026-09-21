import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

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
