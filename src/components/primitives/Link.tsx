import type { ComponentPropsWithoutRef } from 'react';
import { Link as RouterLink } from 'react-router';

export type LinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    /** Kept as `href` so call sites migrated from next/link read unchanged. */
    href: string;
    prefetch?: boolean | 'intent' | 'render' | 'none' | 'viewport';
    replace?: boolean;
};

function isExternal(href: string) {
    return (
        /^[a-z][a-z0-9+.-]*:/i.test(href) ||
        href.startsWith('//') ||
        href.startsWith('#')
    );
}

/**
 * Drop-in replacement for `next/link`.
 *
 * Internal hrefs go through React Router so navigation stays client side;
 * anything absolute, protocol-relative or a bare fragment falls back to a
 * plain anchor, which is what next/link did too.
 */
export default function Link({
    href,
    prefetch: _prefetch,
    replace,
    children,
    ...props
}: LinkProps) {
    if (isExternal(href)) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }

    return (
        <RouterLink to={href} replace={replace} {...props}>
            {children}
        </RouterLink>
    );
}
