import clsx from 'clsx';

import PostTag from './PostTag';

export type PostTagLisProps = {
    tags: string[];
    className?: string;
    color?: 'cyan' | 'amber';
    isFilterable?: boolean;
};

export default function PostTagList({
    tags,
    className,
    color = 'cyan',
    isFilterable = true
}: PostTagLisProps) {
    return (
        <div className={clsx('flex flex-wrap gap-x-3 gap-y-2', className)}>
            {tags.map(tag => (
                <PostTag
                    key={tag}
                    color={color}
                    title={tag.toLowerCase()}
                    href={isFilterable ? `/posts?tag=${tag}` : undefined}
                />
            ))}
        </div>
    );
}
