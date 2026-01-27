import { type Metadata } from 'next';

import Container from '@/components/Container';

import HideEngagementWidget from '../ghl-dev-partner/HideEngagementWidget';

const title = 'Work With Me to Build & Launch Your Startup Tech Faster';

export const metadata: Metadata = {
    title,
    description:
        'I help founders, indie hackers, and vibe coders turn ideas into real products — without long engineering lead times, confusing hand-offs, or wasted dev budget.'
};

// TODO: Replace with actual form URL once form is created
const INQUIRY_FORM_URL = process.env.NEXT_PUBLIC_STARTUP_INQUIRY_FORM_URL;

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

function RocketIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
        </svg>
    );
}

export default function StartupPartnerServicePage() {
    return (
        <Container className="mt-16 sm:mt-32">
            <HideEngagementWidget />

            {/* Hero Section */}
            <header className="max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    {title}
                </h1>
                <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-400">
                    I help founders, indie hackers, and vibe coders turn ideas
                    into real products — without long engineering lead times,
                    confusing hand-offs, or wasted dev budget.
                </p>
                <p className="mt-4 text-zinc-700 dark:text-zinc-400">
                    Whether you&apos;re launching an MVP, building automation
                    that actually works, or architecting your next technical
                    leap, I bridge the gap between concept and launch with clear
                    execution and speed.
                </p>
            </header>

            {/* What I Help With */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    What I Help With
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: 'Product & MVP Development',
                            description:
                                'Ship your first version fast — from user flows to production-ready code.'
                        },
                        {
                            title: 'Architecture & Scalability',
                            description:
                                'Design a foundation that survives growth and pivoting.'
                        },
                        {
                            title: 'Lean Tech Strategy',
                            description:
                                "What to build now vs later — so you don't burn runway on the wrong features."
                        },
                        {
                            title: 'API & Platform Integrations',
                            description:
                                'Connect to Stripe, Notion, Slack, AI APIs, or your favorite tools.'
                        },
                        {
                            title: 'Automation & DevOps',
                            description:
                                "Deploy continuous delivery, monitoring, and workflow automation that doesn't break."
                        },
                        {
                            title: 'Hands-On Coaching',
                            description:
                                "I don't just write code — I help you think like a founder + CTO."
                        }
                    ].map(item => (
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

            {/* Pain Points Section */}
            <section className="mt-16 rounded-2xl bg-zinc-100 p-8 dark:bg-zinc-800/50">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    Why This Matters
                </h2>
                <p className="mt-4 text-zinc-700 dark:text-zinc-400">
                    Building tech in a world of stack choices, AI tools, cloud
                    services, and launch pressure can feel like spinning plates.
                    You know your idea could work, but you&apos;re stuck on the
                    build, the trade-offs, and the unknowns.
                </p>
                <p className="mt-4 font-medium text-zinc-800 dark:text-zinc-200">
                    You&apos;re not alone — countless founders get slowed down
                    by:
                </p>
                <ul className="mt-4 space-y-3 text-zinc-700 dark:text-zinc-400">
                    <li className="flex gap-3">
                        <RocketIcon className="h-5 w-5 shrink-0 text-amber-500" />
                        <span>
                            Trying to learn everything before launching —
                            instead of shipping something real first.
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <RocketIcon className="h-5 w-5 shrink-0 text-amber-500" />
                        <span>
                            Wasting time choosing between frameworks and tools
                            instead of building value.
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <RocketIcon className="h-5 w-5 shrink-0 text-amber-500" />
                        <span>
                            Paying agencies that deliver code, not insight (or
                            product sense).
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <RocketIcon className="h-5 w-5 shrink-0 text-amber-500" />
                        <span>
                            Feeling like you&apos;re CEO, PM, and engineer all
                            at once — which burns energy fast.
                        </span>
                    </li>
                </ul>
                <p className="mt-6 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    The smarter path is to partner with someone who fluidly
                    moves between product thinking, code, and delivery — turning
                    uncertainty into progress.
                </p>
            </section>

            {/* Right Fit Criteria */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    Who This Is For
                </h2>

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
                                    Solo founders, indie hackers, and
                                    bootstrappers who want to build with intent,
                                    not spend months stuck on technical details.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <CheckIcon className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>
                                    Teams ready to go from idea → prototype →
                                    revenue with an expert partner helping the
                                    hardest parts.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <CheckIcon className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>
                                    Founders who value clear accountability,
                                    practical product decisions, and measurable
                                    outcomes.
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
                                    Consulting engagements without a real
                                    product or market problem defined yet.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <XIcon className="h-5 w-5 shrink-0" />
                                <span>
                                    People looking for the &ldquo;cheapest
                                    quote.&rdquo;
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <XIcon className="h-5 w-5 shrink-0" />
                                <span>
                                    Projects with vague goals and no commitment
                                    to ship.
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
                <p className="mt-4 text-zinc-700 dark:text-zinc-400">
                    You don&apos;t need a huge team or waterfall process.
                    Here&apos;s the flow:
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            step: '01',
                            title: 'Share Your Vision',
                            description:
                                'Fill out a short brief about your idea, customers, and goals.'
                        },
                        {
                            step: '02',
                            title: 'Rapid Alignment',
                            description:
                                'We hash out scope, priorities, and a pragmatic plan you actually want to build.'
                        },
                        {
                            step: '03',
                            title: 'Build & Ship',
                            description:
                                'Code gets written, tested, deployed — and you see progress every sprint.'
                        },
                        {
                            step: '04',
                            title: 'Iterate With Confidence',
                            description:
                                'We refine with real user feedback, not guesswork.'
                        }
                    ].map(item => (
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
                <p className="mt-8 text-zinc-700 dark:text-zinc-400">
                    This isn&apos;t about endless feature lists. It&apos;s about
                    moving forward fast with clarity and quality.
                </p>
            </section>

            {/* Testimonial Placeholder */}
            {/* <section className="mt-16 rounded-2xl bg-zinc-100 p-8 dark:bg-zinc-800/50">
                <blockquote className="text-lg font-medium italic text-zinc-900 dark:text-zinc-100">
                    &ldquo;Working with Sergio was like having a CTO in my
                    pocket — not just code, but strategy.&rdquo;
                </blockquote>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                    — Testimonial placeholder
                </p>
            </section> */}

            {/* CTA Section */}
            <section className="mt-16" id="inquiry-form">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    Let&apos;s Build Something Real
                </h2>
                <p className="mt-4 text-zinc-700 dark:text-zinc-400">
                    If you&apos;re ready to turn your idea into traction, drop a
                    note below. I personally review every inquiry and respond
                    within 1–2 business days.
                </p>

                <div className="mt-8">
                    {INQUIRY_FORM_URL ? (
                        <iframe
                            src={INQUIRY_FORM_URL}
                            style={{ minHeight: '800px' }}
                            className="w-full rounded-lg border-0"
                            title="Startup Inquiry Form"
                            sandbox="allow-scripts allow-forms allow-same-origin"
                            allow=""
                            loading="lazy"
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
