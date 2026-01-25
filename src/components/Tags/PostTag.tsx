import clsx from 'clsx';
import Link from 'next/link';

export type PostTagProps = {
    title: string;
    color?: 'cyan' | 'amber';
    href?: string;
};

const COLORS = {
    cyan: 'bg-sky-500/15 text-sky-700 hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20',
    amber: 'bg-amber-400/20 text-amber-700 hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:hover:bg-amber-400/15'
};

export default function PostTag({ title, color = 'cyan', href }: PostTagProps) {
    const className = clsx(
        'inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider transition',
        COLORS[color] ?? COLORS.cyan
    );

    if (href) {
        return (
            <Link href={href} className={className}>
                {title}
            </Link>
        );
    }

    return <span className={className}>{title}</span>;
}
