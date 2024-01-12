import type { ComponentPropsWithoutRef } from 'react';

import { NavItem } from './NavItem';

export default function DesktopNavigation(
    props: ComponentPropsWithoutRef<'nav'>,
) {
    return (
        <nav {...props}>
            <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                <NavItem href="/about">About</NavItem>
                <NavItem href="/posts">Posts</NavItem>
                {/* <NavItem href="/projects">Projects</NavItem> */}
                <NavItem href="/speaking">Speaking</NavItem>
                <NavItem href="/tech-stack">Tech</NavItem>
            </ul>
        </nav>
    );
}
