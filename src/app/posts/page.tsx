import { type Metadata } from 'next';

import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllPosts } from '@/lib/posts/utils';
import PostSummary from '@/components/PostSummary';
import { PostFilters } from '@/components/PostFilters';

export const metadata: Metadata = {
    title: 'Posts',
    description:
        'Some of my long-ish form thoughts on programming, leadership, product design, and more, plus thoughts from good friends, collected in chronological order. '
};

const MONTHS = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
];

export default async function PostsIndex(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const author =
        typeof searchParams.author === 'string' ? searchParams.author : '';
    const tag = typeof searchParams.tag === 'string' ? searchParams.tag : '';
    const year = typeof searchParams.year === 'string' ? searchParams.year : '';
    const month =
        typeof searchParams.month === 'string' ? searchParams.month : '';

    const allPosts = await getAllPosts();

    const authors = Array.from(new Set(allPosts.map(p => p.author))).sort();
    const tags = Array.from(
        new Set(allPosts.flatMap(p => p.tags || []))
    ).sort();
    const years = Array.from(
        new Set(allPosts.map(p => p.date.split('-')[0]))
    ).sort((a, b) => b.localeCompare(a));

    const posts = allPosts.filter(post => {
        if (author && post.author !== author) return false;
        if (tag && !post.tags?.includes(tag)) return false;
        if (year && !post.date.startsWith(year)) return false;
        if (month) {
            const postMonth = post.date.split('-')[1];
            if (postMonth !== month) return false;
        }
        return true;
    });

    return (
        <SimpleLayout
            title="Writing on software, startups, company building, and multiculturalism."
            intro="Some of my long-ish form thoughts on programming, leadership, product design, and more, plus thoughts from good friends, collected in chronological order. "
        >
            <PostFilters
                authors={authors}
                tags={tags}
                years={years}
                months={MONTHS}
            />

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
