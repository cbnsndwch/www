import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout';
import EngagementWidget from '@/components/EngagementWidget';
import { NEXT_RUNTIME } from '@/lib/runtime';

import '@/styles/tailwind.css';

export const runtime = NEXT_RUNTIME;

export const metadata: Metadata = {
    title: {
        template: '%s - Sergio Leon',
        default:
            'Sergio Leon - knowledge collector, tallbike rider, software crafter.',
    },
    description:
        'I’m the CTO and Co-Founder of ChatHQ, where we help marketing agencies and SaaS startups increase Monthly Recurring Revenue and customer retention, and 1NationUp, the One-Stop-Shop branding and marketing partners for thousands of small businesses across South Florida.',
    alternates: {
        types: {
            'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
        },
    },
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" className="h-full antialiased" suppressHydrationWarning>
            <body className="flex h-full bg-zinc-50 dark:bg-black">
                <Providers>
                    <div className="flex w-full">
                        <Layout>{children}</Layout>
                    </div>
                </Providers>
                <SpeedInsights />
                <EngagementWidget
                    widgetId={process.env.VITE_ENGAGEMENT_WIDGET_ID || ''}
                />
            </body>
        </html>
    );
}
