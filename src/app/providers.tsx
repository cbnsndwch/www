'use client';

import { createContext, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

function usePrevious<T>(value: T) {
    let ref = useRef<T>(null);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export const AppContext = createContext<{ previousPathname?: string | null }>(
    {}
);

export function Providers({ children }: { children: React.ReactNode }) {
    let pathname = usePathname();
    let previousPathname = usePrevious(pathname);

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
