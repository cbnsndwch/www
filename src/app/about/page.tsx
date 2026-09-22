import clsx from 'clsx';

import Container from '@/components/Container';
import { Image } from '@/components/primitives';
import { Link } from '@/components/primitives';
import {
    GitHubIcon,
    FacebookIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/components/SocialIcons';
import portraitImage from '@/images/portrait.jpg';
import type { Metadata } from '@/lib/content/metadata';

function SocialLink({
    className,
    href,
    children,
    icon: Icon
}: {
    className?: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}) {
    return (
        <li className={clsx(className, 'flex')}>
            <Link
                href={href}
                className="group flex text-sm font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
            >
                <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-amber-500" />
                <span className="ml-4">{children}</span>
            </Link>
        </li>
    );
}

function A({
    href,
    children,
    external
}: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}) {
    return (
        <Link
            href={href}
            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
            {...(external ? { target: '_blank' } : {})}
        >
            {children}
        </Link>
    );
}

const title = 'I build software, and I build the room it gets built in.';

const description =
    'Sergio León, a software engineer in Miami. Havana-born, marketplace-obsessed, and convinced this city can be a first-class place to do serious engineering.';

export const metadata: Metadata = {
    title: 'About',
    description
};

export default function About() {
    return (
        <Container className="mt-16 sm:mt-32">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                    <div className="max-w-xs px-2.5 lg:max-w-none">
                        <Image
                            src={portraitImage}
                            alt=""
                            sizes="(min-width: 1024px) 32rem, 20rem"
                            className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                        />
                    </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        {title}
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-zinc-700 dark:text-zinc-400">
                        <p>
                            I&apos;m Serge. I grew up in Havana, where the
                            fastest way to learn something was to take it apart
                            and to find the other people taking it apart with
                            you. I studied telecommunications engineering, then
                            spent four years teaching it, which is where I
                            learned that explaining a system out loud is the
                            only reliable way to find out whether you actually
                            understand it. I&apos;ve been doing some version of
                            that ever since.
                        </p>
                        <p>
                            Miami is where the rest of it happened. I co-founded{' '}
                            <A href="https://www.1nationup.com" external>
                                1NationUp
                            </A>
                            , which grew into the branding and marketing partner
                            for thousands of small businesses across South
                            Florida, and ran it as CTO until this year. I
                            co-founded and ran engineering at ChatHQ through its
                            acquisition. Along the way I got a reputation as the
                            person who knows where the bodies are buried in
                            somebody else&apos;s API.
                        </p>
                        <p>
                            These days I work for myself. I&apos;m the CTO at{' '}
                            <A href="https://getextendly.com" external>
                                Extendly
                            </A>
                            , where we help agency owners survive and then enjoy
                            their HighLevel journey, and I&apos;m Builder in
                            Residence at{' '}
                            <A href="https://thelabmiami.com" external>
                                The LAB Miami
                            </A>
                            . The rest goes to a small number of engagements at
                            a time: platform architecture, thorny integrations,
                            getting a team from &quot;it works on my
                            machine&quot; to something that ships on a schedule.
                            If that sounds useful, my{' '}
                            <A href="/services/startup-partner">
                                startup partner
                            </A>{' '}
                            and{' '}
                            <A href="/services/ghl-dev-partner">
                                HighLevel dev partner
                            </A>{' '}
                            pages explain how I usually work.
                        </p>
                        <p>
                            The thing I&apos;m building now is{' '}
                            <A href="https://pahoy.app" external>
                                PaHoy
                            </A>
                            , a startup building the services marketplace for
                            Cubans on the island and across the diaspora. Find,
                            compare, contact, and eventually pay for work
                            wherever it happens. It&apos;s the app I&apos;ve
                            been circling for the better part of twenty years,
                            and the one that matters most to me.
                        </p>
                        <p>
                            On the side there&apos;s{' '}
                            <A href="/projects/erden">Erden</A>, a platform for
                            publishing and checking evidence-backed ontologies,
                            plus a pile of <A href="/projects">open source</A> I
                            keep going because I needed the tools myself.
                        </p>
                        <p>
                            And then there&apos;s the room. I co-host{' '}
                            <A href="https://events.helloworld.miami" external>
                                hello_miami Hack Night
                            </A>
                            , now twice a week across Wynwood and South Beach.
                            No pitches, no panels, just engineers and designers
                            and founders building in the same room until
                            something works. It&apos;s grown into partnerships
                            with Clerk, The LAB, Moonlighter FabLab and others,
                            and into a broader{' '}
                            <A href="/miami">mission for the city</A>: proving
                            that Miami can be a place where serious engineering
                            happens.
                        </p>
                        <p>
                            Offline I ride a tallbike, read too much science
                            fiction, and collect knowledge I have no immediate
                            use for. Come say hi at a Hack Night; that&apos;s
                            still the best way to reach me.
                        </p>
                    </div>
                </div>
                <div className="lg:pl-20">
                    <ul>
                        <SocialLink
                            href="https://twitter.com/cbnsndwch"
                            icon={TwitterIcon}
                        >
                            X
                        </SocialLink>
                        <SocialLink
                            href="https://www.facebook.com/cbnsndwch"
                            icon={FacebookIcon}
                            className="mt-4"
                        >
                            Facebook
                        </SocialLink>
                        <SocialLink
                            href="https://github.com/cbnsndwch"
                            icon={GitHubIcon}
                            className="mt-4"
                        >
                            GitHub
                        </SocialLink>
                        <SocialLink
                            href="https://www.linkedin.com/in/cbnsndwch/"
                            icon={LinkedInIcon}
                            className="mt-4"
                        >
                            LinkedIn
                        </SocialLink>
                    </ul>
                </div>
            </div>
        </Container>
    );
}
