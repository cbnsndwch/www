'use client';

import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type NavItemProps = PropsWithChildren<{
    href: string;
}>;

export function NavItem({ href, children }: NavItemProps) {
    let isActive = usePathname() === href;

    return (
        <li>
            <Link
                href={href}
                className={clsx(
                    'relative block px-3 py-2 transition',
                    isActive
                        ? 'text-amber-500 dark:text-amber-400'
                        : 'hover:text-amber-500 dark:hover:text-amber-400'
                )}
            >
                {children}
                {isActive && (
                    <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 dark:from-amber-400/0 dark:via-amber-400/40 dark:to-amber-400/0" />
                )}
            </Link>
        </li>
    );
}
