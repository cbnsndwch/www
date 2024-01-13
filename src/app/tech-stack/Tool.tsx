import type { PropsWithChildren } from 'react';

import Card from '@/components/Card';

export type ToolProps = PropsWithChildren<{
    title: string;
    href?: string;
    cta?: string;
}>;

export default function Tool({ title, href, cta, children }: ToolProps) {
    return (
        <Card as="li">
            <Card.Title newTab as="h3" href={href}>
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
            {cta && <Card.Cta>{cta}</Card.Cta>}
        </Card>
    );
}
