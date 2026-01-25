import type { PostWithSlug } from '@/lib/posts/contracts';

import PostSummary from '../PostSummary';

export type PostSummaryListProps = {
    title: string;
    posts: PostWithSlug[];
    tagColor?: 'cyan' | 'amber';
};

export default function PostSummaryList({
    title,
    posts,
    tagColor = 'cyan'
}: PostSummaryListProps) {
    return (
        <div className="flex flex-col gap-16">
            <p className="text-left text-xl font-bold">{title}</p>
            {posts.map(post => (
                <PostSummary key={post.slug} post={post} tagColor={tagColor} />
            ))}
        </div>
    );
}
