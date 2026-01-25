import { type Metadata } from 'next';

import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllPosts } from '@/lib/posts/utils';
import PostSummary from '@/components/PostSummary';

export const metadata: Metadata = {
    title: 'Posts',
    description:
        'Some of my long-ish form thoughts on programming, leadership, product design, and more, plus thoughts from good friends, collected in chronological order. '
};

export default async function PostsIndex() {
    let posts = await getAllPosts();

    return (
        <SimpleLayout
            title="Writing on software, startups, company building, and multiculturalism."
            intro="Some of my long-ish form thoughts on programming, leadership, product design, and more, plus thoughts from good friends, collected in chronological order. "
        >
            <div className="relative max-w-3xl">
                <div className="absolute left-[25%] top-0 bottom-0 hidden w-px bg-zinc-100 dark:bg-zinc-700/40 md:block" />
                <div className="flex flex-col space-y-16">
                    {!posts?.length && (
                        <p className="text-center">
                            No posts yet. Check back soon!
                        </p>
                    )}

                    {posts.map(post => (
                        <PostSummary
                            key={post.slug}
                            post={post}
                            layout="timeline"
                            tagColor="amber"
                        />
                    ))}
                </div>
            </div>
        </SimpleLayout>
    );
}
