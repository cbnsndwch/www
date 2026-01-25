import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

export interface MultiSelectProps {
    options: { label: string; value: string }[];
    selected: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    className?: string;
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = 'Select...',
    className
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (value: string) => {
        onChange(selected.filter(s => s !== value));
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'flex min-h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
                        className
                    )}
                >
                    <div className="flex flex-wrap gap-1">
                        {selected.length > 0 ? (
                            selected.map(value => {
                                const option = options.find(
                                    o => o.value === value
                                );
                                return (
                                    <Badge
                                        key={value}
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleUnselect(value);
                                        }}
                                    >
                                        {option?.label || value}
                                        <X className="ml-1 h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </Badge>
                                );
                            })
                        ) : (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-(--radix-popover-trigger-width) p-0"
                align="start"
            >
                <Command className="w-full">
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {options.map(option => {
                                const isSelected = selected.includes(
                                    option.value
                                );
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            const newSelected = isSelected
                                                ? selected.filter(
                                                      s => s !== option.value
                                                  )
                                                : [...selected, option.value];
                                            onChange(newSelected);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className={cn(
                                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50 [&_svg]:invisible'
                                            )}
                                        >
                                            <Check className={cn('h-4 w-4')} />
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selected.length > 0 && (
                            <>
                                <Separator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => onChange([])}
                                        className="justify-center text-center cursor-pointer"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
