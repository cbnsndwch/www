import type { ComponentPropsWithoutRef } from 'react';

import { NavItem } from './NavItem';

export default function DesktopNavigation(
    props: ComponentPropsWithoutRef<'nav'>
) {
    return (
        <nav {...props}>
            <ul className="flex whitespace-nowrap rounded-full bg-zinc-100 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/10 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                <NavItem href="/about">About</NavItem>
                <NavItem href="/posts">Posts</NavItem>
                <NavItem href="/projects">Open Source</NavItem>
                <NavItem href="/miami">Miami Hub</NavItem>
                {/* <NavItem href="/speaking">Speaking</NavItem> */}
            </ul>
        </nav>
    );
}
