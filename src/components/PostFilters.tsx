'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';

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
        (name: string, value: string[]) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value.length > 0) {
                params.set(name, value.join(','));
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleFilterChange = (name: string, value: string[]) => {
        const query = createQueryString(name, value);
        router.push(`/posts?${query}`, { scroll: false });
    };

    const getParamArray = (name: string) => {
        const val = searchParams.get(name);
        return val ? val.split(',') : [];
    };

    const currentAuthors = getParamArray('author');
    const currentTags = getParamArray('tag');
    const currentYears = getParamArray('year');
    const currentMonths = getParamArray('month');

    const hasFilters =
        currentAuthors.length > 0 ||
        currentTags.length > 0 ||
        currentYears.length > 0 ||
        currentMonths.length > 0;

    const clearFilters = () => {
        router.push('/posts', { scroll: false });
    };

    return (
        <div className="mb-12 flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-500 dark:text-zinc-400">
                    Author
                </Label>
                <MultiSelect
                    placeholder="All Authors"
                    options={authors.map(a => ({ label: a, value: a }))}
                    selected={currentAuthors}
                    onChange={val => handleFilterChange('author', val)}
                    className="w-45 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-500 dark:text-zinc-400">Tag</Label>
                <MultiSelect
                    placeholder="All Tags"
                    options={tags.map(t => ({ label: t, value: t }))}
                    selected={currentTags}
                    onChange={val => handleFilterChange('tag', val)}
                    className="w-45 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-500 dark:text-zinc-400">Year</Label>
                <MultiSelect
                    placeholder="All Years"
                    options={years.map(y => ({ label: y, value: y }))}
                    selected={currentYears}
                    onChange={val => handleFilterChange('year', val)}
                    className="w-35 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-500 dark:text-zinc-400">
                    Month
                </Label>
                <MultiSelect
                    placeholder="All Months"
                    options={months}
                    selected={currentMonths}
                    onChange={val => handleFilterChange('month', val)}
                    className="w-35 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                />
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
