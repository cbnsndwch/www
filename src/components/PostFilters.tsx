'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import clsx from 'clsx';

interface PostFiltersProps {
    authors: string[];
    tags: string[];
    years: string[];
    months: { label: string; value: string }[];
}

export function PostFilters({ authors, tags, years, months }: PostFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleFilterChange = (name: string, value: string) => {
        const query = createQueryString(name, value);
        router.push(`/posts?${query}`, { scroll: false });
    };

    const currentAuthor = searchParams.get('author') || '';
    const currentTag = searchParams.get('tag') || '';
    const currentYear = searchParams.get('year') || '';
    const currentMonth = searchParams.get('month') || '';

    const hasFilters = currentAuthor || currentTag || currentYear || currentMonth;

    const clearFilters = () => {
        router.push('/posts', { scroll: false });
    };

    return (
        <div className="mb-12 flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="author" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Author
                </label>
                <select
                    id="author"
                    value={currentAuthor}
                    onChange={(e) => handleFilterChange('author', e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-amber-500"
                >
                    <option value="">All Authors</option>
                    {authors.map((author) => (
                        <option key={author} value={author}>
                            {author}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="tag" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Tag
                </label>
                <select
                    id="tag"
                    value={currentTag}
                    onChange={(e) => handleFilterChange('tag', e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-amber-500"
                >
                    <option value="">All Tags</option>
                    {tags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="year" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Year
                </label>
                <select
                    id="year"
                    value={currentYear}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-amber-500"
                >
                    <option value="">All Years</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="month" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Month
                </label>
                <select
                    id="month"
                    value={currentMonth}
                    onChange={(e) => handleFilterChange('month', e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-amber-500"
                >
                    <option value="">All Months</option>
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>

            {hasFilters && (
                <button
                    onClick={clearFilters}
                    className="mb-1 text-sm font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}
