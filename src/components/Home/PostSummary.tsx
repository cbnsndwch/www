import Card from '@/components/Card';
import PostTagList from '@/components/Tags/PostTagList';

import { formatDate } from '@/lib/formatDate';
import { isGuestPost, type PostWithSlug } from '@/lib/posts/contracts';

export type PostSummaryProps = {
    post: PostWithSlug;
};

export default function PostSummary({ post }: PostSummaryProps) {
    return (
        <Card as="article">
            <Card.Title href={`/posts/${post.slug}`}>
                {post.title}
                <span className="ml-1 mt-2 text-sm font-light italic">
                    by {post.author}
                </span>
            </Card.Title>

            <Card.Eyebrow as="time" dateTime={post.date} decorate>
                {formatDate(post.date)}
            </Card.Eyebrow>
            <Card.Description>{post.description}</Card.Description>
            {post.tags?.length && (
                <PostTagList
                    tags={post.tags}
                    className="z-10 mt-4"
                    color="cyan"
                />
            )}
            <Card.Cta>Continue reading</Card.Cta>
        </Card>
    );
}
