import type { PropsWithChildren } from 'react';
import Link from 'next/link';

import ContainerInner from './Container/Inner';
import ContainerOuter from './Container/Outer';

type NavLinkProps = PropsWithChildren<{
    href: string;
}>;

function NavLink({ href, children }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="transition hover:text-amber-500 dark:hover:text-amber-400"
        >
            {children}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer className="mt-32 flex-none">
            <ContainerOuter>
                <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
                    <ContainerInner>
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                <NavLink href="/about">About</NavLink>
                                <NavLink href="/posts">Posts</NavLink>
                                <NavLink href="/projects">Open Source</NavLink>
                                <NavLink href="/miami">Miami Hub</NavLink>
                                <NavLink href="/speaking">Speaking</NavLink>
                            </div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                &copy; {new Date().getFullYear()} cbnsndwch LLC.
                                All rights reserved.
                            </p>
                        </div>
                    </ContainerInner>
                </div>
            </ContainerOuter>
        </footer>
    );
}
