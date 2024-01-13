import type { ComponentPropsWithoutRef } from 'react';

import { Section } from '@/components/Section';

export default function ToolsSection({
    children,
    ...props
}: ComponentPropsWithoutRef<typeof Section>) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    );
}
