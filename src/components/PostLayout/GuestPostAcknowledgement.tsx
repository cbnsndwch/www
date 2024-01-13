import Link from 'next/link';

import type { GuestPost } from '@/lib/posts/contracts';

export type GuestPostAcknowledgementProps = {
    post: GuestPost;
};

export default function GuestPostAcknowledgement({
    post,
}: GuestPostAcknowledgementProps) {
    return (
        <p className="mt-4 text-sm italic">
            This guest post first appeared in{' '}
            <Link
                href={post.guest.url}
                rel="noopener noreferrer follow"
                className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
            >
                {post.guest.firstAppearedOn}
            </Link>
        </p>
    );
}
