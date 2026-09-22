import {
    useLocation,
    useNavigate,
    useSearchParams as useRouterSearchParams
} from 'react-router';

/**
 * Drop-in replacement for `usePathname` from `next/navigation`.
 */
export function usePathname(): string {
    return useLocation().pathname;
}

/**
 * Drop-in replacement for `useRouter` from `next/navigation`, covering the
 * methods this site used.
 */
export function useRouter() {
    const navigate = useNavigate();

    return {
        push: (href: string, _options?: unknown) => navigate(href),
        replace: (href: string, _options?: unknown) =>
            navigate(href, { replace: true }),
        back: () => navigate(-1),
        forward: () => navigate(1),
        refresh: () => navigate('.', { replace: true })
    };
}

/**
 * Drop-in replacement for `useSearchParams` from `next/navigation`.
 */
export function useSearchParams(): URLSearchParams {
    return useRouterSearchParams()[0];
}
