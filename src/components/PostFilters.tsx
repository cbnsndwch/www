'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { X } from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PostFiltersProps {
    authors: string[];
    tags: string[];
    years: string[];
    months: { label: string; value: string }[];
}

export function PostFilters({
    authors,
    tags,
    years,
    months
}: PostFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== 'all') {
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

    const currentAuthor = searchParams.get('author') || 'all';
    const currentTag = searchParams.get('tag') || 'all';
    const currentYear = searchParams.get('year') || 'all';
    const currentMonth = searchParams.get('month') || 'all';

    const hasFilters =
        (currentAuthor && currentAuthor !== 'all') ||
        (currentTag && currentTag !== 'all') ||
        (currentYear && currentYear !== 'all') ||
        (currentMonth && currentMonth !== 'all');

    const clearFilters = () => {
        router.push('/posts', { scroll: false });
    };

    return (
        <div className="mb-12 flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-500 dark:text-zinc-400">
                    Author
                </Label>
                <Select
                    value={currentAuthor}
                    onValueChange={value => handleFilterChange('author', value)}
                >
                    <SelectTrigger className="w-45 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                        <SelectValue placeholder="All Authors" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Authors</SelectItem>
                        {authors.map(author => (
                            <SelectItem key={author} value={author}>
                                {author}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-500 dark:text-zinc-400">
                    Tag
                </Label>
                <Select
                    value={currentTag}
                    onValueChange={value => handleFilterChange('tag', value)}
                >
                    <SelectTrigger className="w-45 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                        <SelectValue placeholder="All Tags" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Tags</SelectItem>
                        {tags.map(tag => (
                            <SelectItem key={tag} value={tag}>
                                {tag}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-500 dark:text-zinc-400">
                    Year
                </Label>
                <Select
                    value={currentYear}
                    onValueChange={value => handleFilterChange('year', value)}
                >
                    <SelectTrigger className="w-35 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                        <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {years.map(year => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-500 dark:text-zinc-400">
                    Month
                </Label>
                <Select
                    value={currentMonth}
                    onValueChange={value => handleFilterChange('month', value)}
                >
                    <SelectTrigger className="w-35 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                        <SelectValue placeholder="All Months" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Months</SelectItem>
                        {months.map(month => (
                            <SelectItem key={month.value} value={month.value}>
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {hasFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="mb-0.5 text-amber-600 hover:text-amber-500 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-900/20 gap-1.5"
                >
                    <X className="h-4 w-4" />
                    Clear filters
                </Button>
            )}
        </div>
    );
}
