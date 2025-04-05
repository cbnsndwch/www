import { type Metadata } from 'next';

import Container from '@/components/Container';
// import GhlCalendar from '@/components/Calendar';

// const CALENDAR_LINK = process.env.NEXT_PUBLIC_CALENDAR_LINK!;

const title = 'Book a Call with Serge';

export const metadata: Metadata = {
    title,
    description:
        "In this call we'll discuss your app or service and what it would take to bring it into the HighLevel Marketplace.",
};

export default function BookGhlIntegrationDiscoveryCall() {
    return (
        <Container className="mt-16 sm:mt-32">
            <h1 className="mb-16 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {title}
            </h1>

            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
                Thank you for your interest in booking a call! Due to my current
                workload, I am not taking new calls at this time.
            </p>

            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
                In the meantime, feel free to take a look at my recent Open
                Source projects on GitHub, and follow me on social media for
                updates.
            </p>

            {/* 
            <GhlCalendar
                id="IISw0HjboChm3kmItS5S_1707771903047"
                link={CALENDAR_LINK}
            /> 
            */}
        </Container>
    );
}
