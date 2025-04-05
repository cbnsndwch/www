import { type Metadata } from 'next';

import Container from '@/components/Container';
import GhlCalendar from '@/components/Calendar';

const CALENDAR_LINK = process.env.NEXT_PUBLIC_CALENDAR_LINK!;

const title = 'Book a Call with Serge';

export const metadata: Metadata = {
    title,
    description:
        "In this call we'll discuss your app or service and what it would take to bring it into the HighLevel Marketplace.",
};

export default function BookGhlIntegartionDiscoveryCall() {
    return (
        <Container className="mt-16 sm:mt-32">
            <h1 className="mb-16 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {title}
            </h1>

            <GhlCalendar
                id="IISw0HjboChm3kmItS5S_1707771903047"
                link={CALENDAR_LINK}
            />

            <iframe
                id="inline-fuxVsAYeDri7WxSorR76"
                src="https://link.1nationup.com/widget/form/fuxVsAYeDri7WxSorR76"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '3px',
                }}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="GHL Integrations Appointment Request"
                data-height="654"
                data-layout-iframe-id="inline-fuxVsAYeDri7WxSorR76"
                data-form-id="fuxVsAYeDri7WxSorR76"
                title="GHL Integrations Appointment Request"
            ></iframe>
            <script
                async
                src="https://link.1nationup.com/js/form_embed.js"
            ></script>
        </Container>
    );
}
