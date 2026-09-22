import { useEffect } from 'react';

export type ScriptProps = {
    src: string;
    id?: string;
    async?: boolean;
    defer?: boolean;
    /** Accepted for parity with next/script; loading is always deferred here. */
    strategy?: string;
};

/**
 * Drop-in replacement for `next/script`.
 *
 * Injects the tag once on mount and leaves it in place, so repeat navigations
 * do not re-execute third-party bundles.
 */
export default function Script({ src, id, async = true, defer }: ScriptProps) {
    useEffect(() => {
        const existing = id
            ? document.getElementById(id)
            : document.querySelector(`script[src="${src}"]`);

        if (existing) {
            return;
        }

        const tag = document.createElement('script');
        tag.src = src;
        tag.async = async;

        if (id) {
            tag.id = id;
        }

        if (defer) {
            tag.defer = true;
        }

        document.body.appendChild(tag);
    }, [src, id, async, defer]);

    return null;
}
