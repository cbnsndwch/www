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
        <div className={clsx('flex gap-1', className)}>
            {tags.map(tag => (
                <PostTag key={tag} color={color} title={tag.toLowerCase()} />
            ))}
        </div>
    );
}
