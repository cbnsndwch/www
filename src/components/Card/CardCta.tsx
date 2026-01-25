import { PropsWithChildren } from 'react';

import ChevronRightIcon from './ChevronRightIcon';

export default function CardCta({
    children,
    className
}: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            aria-hidden="true"
            className={`relative z-10 mt-4 flex items-center text-sm font-medium text-amber-500 ${className}`}
        >
            {children}
            <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
        </div>
    );
}
