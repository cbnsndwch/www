import clsx from 'clsx';

import PostTag from './PostTag';

export type PostTagLisProps = {
    tags: string[];
    className?: string;
    color?: 'cyan' | 'amber';
};

export default function PostTagList({
    tags,
    className,
    color = 'cyan'
}: PostTagLisProps) {
    return (
        <div className={clsx('flex flex-wrap gap-x-3 gap-y-2', className)}>
            {tags.map(tag => (
                <PostTag key={tag} color={color} title={tag.toLowerCase()} />
            ))}
        </div>
    );
}
