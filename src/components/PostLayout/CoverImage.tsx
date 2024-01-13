import Image from 'next/image';
import Link from 'next/link';

import type { PostCover } from '@/lib/posts/contracts';

export type CoverImageProps = {
    cover?: PostCover;
};

export default function CoverImage({ cover }: CoverImageProps) {
    if (!cover) {
        return null;
    }

    return (
        <>
            {cover?.image && (
                <Image
                    src={cover.image}
                    alt={cover.title ?? ''}
                    className="mb-0"
                />
            )}
            {cover?.title && (
                <p className="mt-2 w-full text-center text-sm italic">
                    {cover.creditUrl ? (
                        <Link
                            href={cover.creditUrl}
                            target="_blank"
                            rel="noopener nofollow"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                        >
                            {cover.title}
                        </Link>
                    ) : (
                        cover.title
                    )}
                </p>
            )}
        </>
    );
}
