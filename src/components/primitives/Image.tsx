import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export type ImageProps = Omit<
    ComponentPropsWithoutRef<'img'>,
    'src' | 'width' | 'height'
> & {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;

    /** Fill the nearest positioned ancestor, matching next/image's `fill`. */
    fill?: boolean;

    /**
     * Accepted so call sites can keep their existing props. Vite emits plain
     * URLs, so there is no optimizer to opt out of or to prioritise.
     */
    sizes?: string;
    unoptimized?: boolean;
    priority?: boolean;
    quality?: number;
    placeholder?: string;
};

/**
 * Drop-in replacement for `next/image`.
 *
 * Vite resolves an image import to a URL string, so this renders a plain
 * `<img>`. Loading is lazy unless the call site marks the image as priority,
 * which is the behaviour next/image gave us for above-the-fold art.
 */
export default function Image({
    src,
    alt,
    fill,
    className,
    priority,
    // swallowed: meaningful only to the Next optimizer
    unoptimized: _unoptimized,
    quality: _quality,
    placeholder: _placeholder,
    ...props
}: ImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            className={clsx(
                fill && 'absolute inset-0 h-full w-full',
                className
            )}
            {...props}
        />
    );
}
