import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/tailwind.css';


import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout';
import EngagementWidget from '@/components/EngagementWidget';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    twitter: {
        card: 'summary_large_image',
    },
    title: {
        template: '%s - Sergio Leon',
        default:
            'Sergio Leon - knowledge collector, tallbike rider, software crafter, event host, OSS contributor.',
    },
    description:
        'I’m VP of Engineering at Extendly, where we help marketing agency owners make their HighLevel journey easier, and the CTO and Co-Founder 1NationUp, the One-Stop-Shop branding and marketing partners for thousands of small businesses across South Florida',
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
                <Analytics />
                <EngagementWidget
                    widgetId={process.env.NEXT_PUBLIC_ENGAGEMENT_WIDGET_ID || ''}
                />
            </body>
        </html>
    );
}
