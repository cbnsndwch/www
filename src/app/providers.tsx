'use client';

import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import { createContext, useRef, useEffect } from 'react';

function usePrevious<T>(value: T) {
    const ref = useRef<T>(null);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export const AppContext = createContext<{ previousPathname?: string | null }>(
    {}
);

export function Providers({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const previousPathname = usePrevious(pathname);

    return (
        <AppContext.Provider value={{ previousPathname }}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    );
}
