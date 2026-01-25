import { type Metadata } from 'next';

import Container from '@/components/Container';

import HideEngagementWidget from './HideEngagementWidget';

const title = 'Work With Me on Your GHL Integration';

export const metadata: Metadata = {
    title,
    description:
        'Expert GoHighLevel integration services for agencies and businesses. Custom API integrations, Marketplace apps, and white-label solutions.',
};

// TODO: Replace with actual form URL once form is created in GHL
const GHL_FORM_URL = process.env.NEXT_PUBLIC_GHL_INQUIRY_FORM_URL;

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
    );
}

function XIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
}

export default function GhlIntegrationInquiry() {
    return (
        <Container className="mt-16 sm:mt-32">
            <HideEngagementWidget />

            {/* Hero Section */}
            <header className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    {title}
                </h1>
                <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-400">
                    I help agencies and businesses unlock the full potential of
                    GoHighLevel through custom integrations, Marketplace apps,
                    and tailored automation solutions.
                </p>
            </header>

            {/* Value Proposition */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    What I Help With
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: 'Custom API Integrations',
                            description:
                                'Connect GHL to any external system—CRMs, payment processors, custom APIs, and more.',
                        },
                        {
                            title: 'Marketplace App Development',
                            description:
                                'Build and launch apps on the GHL Marketplace to scale your reach or solve internal needs.',
                        },
                        {
                            title: 'Workflow Automation',
                            description:
                                'Design powerful automations that go beyond native capabilities.',
                        },
                        {
                            title: 'White-Label Solutions',
                            description:
                                'Custom-branded integrations and tools for your agency clients.',
                        },
                        {
                            title: 'Migration & Upgrades',
                            description:
                                'Seamlessly move from other platforms or upgrade existing integrations.',
                        },
                        {
                            title: 'Strategic Consultation',
                            description:
                                'Expert guidance on GHL architecture and integration strategy.',
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-zinc-300 p-6 dark:border-zinc-700/50"
                        >
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Right Fit Criteria */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    Is This Right For You?
                </h2>
                <p className="mt-4 text-zinc-700 dark:text-zinc-400">
                    I&apos;m selective about the projects I take on to ensure I
                    can deliver exceptional results for every client.
                </p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    {/* Good Fit */}
                    <div>
                        <h3 className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                            <CheckIcon className="h-5 w-5" />
                            Great Fit
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-400">
                            <li className="flex gap-3">
                                <CheckIcon className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>
                                    Businesses with existing GHL accounts
                                    looking to expand capabilities
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <CheckIcon className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>
                                    Companies ready to invest in custom
                                    solutions that drive real ROI
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <CheckIcon className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>
                                    Teams with clear project requirements and
                                    realistic timelines
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <CheckIcon className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>
                                    Partners who value quality and deep
                                    collaboration over quick fixes
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Not a Fit */}
                    <div>
                        <h3 className="flex items-center gap-2 font-semibold text-zinc-600 dark:text-zinc-400">
                            <XIcon className="h-5 w-5" />
                            Probably Not a Fit
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-500">
                            <li className="flex gap-3">
                                <XIcon className="h-5 w-5 shrink-0" />
                                <span>
                                    Exploratory conversations without defined
                                    projects
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <XIcon className="h-5 w-5 shrink-0" />
                                <span>
                                    Price-shopping for the lowest bidder
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <XIcon className="h-5 w-5 shrink-0" />
                                <span>
                                    Very small budgets (under $2,500)
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <XIcon className="h-5 w-5 shrink-0" />
                                <span>
                                    Urgent turnarounds without flexibility
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Process Overview */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    How It Works
                </h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            step: '01',
                            title: 'Submit Your Inquiry',
                            description:
                                'Fill out the form below with details about your project and goals.',
                        },
                        {
                            step: '02',
                            title: 'Personal Review',
                            description:
                                'I personally review every submission within 1-2 business days.',
                        },
                        {
                            step: '03',
                            title: 'Discovery Call',
                            description:
                                "If we're aligned, you'll receive a private calendar link to book a call.",
                        },
                        {
                            step: '04',
                            title: 'Proposal & Engagement',
                            description:
                                'We discuss scope, timeline, and terms to kick off your project.',
                        },
                    ].map((item) => (
                        <div key={item.step} className="relative">
                            <span className="text-5xl font-bold text-zinc-200 dark:text-zinc-800">
                                {item.step}
                            </span>
                            <h3 className="mt-2 font-semibold text-zinc-900 dark:text-zinc-100">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Premium Positioning */}
            <section className="mt-16 rounded-2xl bg-zinc-100 p-8 dark:bg-zinc-800/50">
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    &ldquo;This isn&apos;t the cheapest option—it&apos;s the
                    right one.&rdquo;
                </p>
                <p className="mt-4 text-zinc-700 dark:text-zinc-400">
                    I focus on quality over quantity, taking on a limited number
                    of projects to ensure exceptional results. My rates reflect
                    the expertise and dedication I bring to each engagement.
                </p>
            </section>

            {/* Inquiry Form */}
            <section className="mt-16" id="inquiry-form">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    Start Your Inquiry
                </h2>
                <p className="mt-4 text-zinc-700 dark:text-zinc-400">
                    Tell me about your project and I&apos;ll get back to you
                    within 1-2 business days.
                </p>

                <div className="mt-8">
                    {GHL_FORM_URL ? (
                        <iframe
                            src={GHL_FORM_URL}
                            className="w-full rounded-lg border-0"
                            style={{ minHeight: '800px' }}
                            title="Project Inquiry Form"
                        />
                    ) : (
                        <div className="rounded-lg border border-dashed border-zinc-400 p-8 text-center dark:border-zinc-700">
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Form coming soon. In the meantime, reach out via{' '}
                                <a
                                    href="https://www.linkedin.com/in/cbnsndwch/"
                                    className="text-amber-500 transition hover:text-amber-600 dark:hover:text-amber-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>{' '}
                                or{' '}
                                <a
                                    href="https://twitter.com/cbnsndwch"
                                    className="text-amber-500 transition hover:text-amber-600 dark:hover:text-amber-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Twitter/X
                                </a>
                                .
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </Container>
    );
}
