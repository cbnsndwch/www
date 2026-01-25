'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

export default function ThemeToggle() {
    let [mounted, setMounted] = useState(false);

    let { resolvedTheme, setTheme } = useTheme();
    let otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <button
            type="button"
            aria-label={
                mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'
            }
            className="group cursor-pointer rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
            onClick={() => setTheme(otherTheme)}
        >
            <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-amber-50 [@media(prefers-color-scheme:dark)]:stroke-amber-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-amber-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-amber-600" />
            <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 not-[@media_(prefers-color-scheme:dark)]:fill-amber-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-amber-500" />
        </button>
    );
}
