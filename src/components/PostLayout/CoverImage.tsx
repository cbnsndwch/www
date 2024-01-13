import Image from 'next/image';
import Link from 'next/link';

import type { PostCover } from '@/lib/posts';

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
                    alt="the OG sandwich of south florida"
                />
            )}
            {cover?.title && (
                <small>
                    <em>
                        {cover.creditUrl ? (
                            <Link
                                href={cover.creditUrl}
                                target="_blank"
                                rel="noopener nofollow"
                            >
                                {cover.title}
                            </Link>
                        ) : (
                            cover.title
                        )}
                    </em>
                </small>
            )}
        </>
    );
}
