import clsx from 'clsx';

import Card from '@/components/Card';
import Container from '@/components/Container';
import { Image } from '@/components/primitives';
import { Link } from '@/components/primitives';
import { Section } from '@/components/Section';
import {
    InstagramIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/components/SocialIcons';
import image1 from '@/images/community/3f4f0c21-77ff-4b4e-92d2-4e6912fb38ed.png';
import image3 from '@/images/community/518877047_17907205785190767_9036288187190743634_n.jpg';
import image7 from '@/images/community/G5mVWz-XAAA4RHt.webp';
import image8 from '@/images/community/G5mVWz7WAAAa9a4.webp';
import image9 from '@/images/community/G5mVWzsXUAAE1uU.webp';
import image10 from '@/images/community/G7NcYrpW8AAhvBT.webp';
import image11 from '@/images/community/G7NcYrpWQAAaNqp.webp';
import image12 from '@/images/community/G7NcYrpX0AAeXhF.webp';
import image13 from '@/images/community/G7xNdXaWYAACOOt.webp';
import image14 from '@/images/community/G7xNdXYWIAAAd0W.webp';
import image15 from '@/images/community/G7xXHZ8XQAA9jLi.webp';
import image5 from '@/images/community/G3314HPXwAAB85H.webp';
import image6 from '@/images/community/G3314HXWUAA3DiJ.webp';
import image16 from '@/images/community/Gilzx1QXcAAjECN.webp';
import image17 from '@/images/community/GoRC6ckWsAEIUzM.webp';
import image18 from '@/images/community/Gx4FS_UX0AAj7ZH.webp';
import hn1 from '@/images/community/hack-night-2026-09-15-01.webp';
import hn2 from '@/images/community/hack-night-2026-09-15-02.webp';
import hn3 from '@/images/community/hack-night-2026-09-15-03.webp';
import hn4 from '@/images/community/hack-night-2026-09-15-04.webp';
import hn5 from '@/images/community/hack-night-2026-09-15-05.webp';
import hn6 from '@/images/community/hack-night-2026-09-15-06.webp';
import hn7 from '@/images/community/hack-night-2026-09-15-07.webp';
import hn8 from '@/images/community/hack-night-2026-09-15-08.webp';
import n1 from '@/images/community/hack-night-2026-09-17-01.webp';
import n2 from '@/images/community/hack-night-2026-09-17-02.webp';
import n3 from '@/images/community/hack-night-2026-09-17-03.webp';
import n4 from '@/images/community/hack-night-2026-09-17-04.webp';
import n5 from '@/images/community/hack-night-2026-09-17-05.webp';
import n6 from '@/images/community/hack-night-2026-09-17-06.webp';
import n7 from '@/images/community/hack-night-2026-09-17-07.webp';
import n8 from '@/images/community/hack-night-2026-09-17-08.webp';
import image2 from '@/images/community/reframed-lab-neon.webp';
import image4 from '@/images/community/reframed-moonlighter-group.webp';
import logoHelloMiami from '@/images/logos/hello-miami.svg';
import logoSprint from '@/images/logos/marketing-ai-sprint.webp';
import logoClerk from '@/images/logos/tile-clerk.webp';
import logoMoonlighter from '@/images/logos/tile-moonlighter.webp';
import logoSimplifai from '@/images/logos/tile-simplifai.webp';
import logoTeal from '@/images/logos/tile-teal.webp';
import logoTheLab from '@/images/logos/tile-the-lab.webp';
import type { Metadata } from '@/lib/content/metadata';

import { CommunityGallery, FeaturedPhotos } from './CommunityGallery';

const description =
    'Miami has capital, venues and a real inflow of technical people. It also needs a culture of serious engineering, and a memory. Here is what I am building toward that.';

export const metadata: Metadata = {
    title: 'Miami',
    description,
    openGraph: {
        title: 'Miami',
        description,
        type: 'website',
        images: [
            {
                url: '/miami/opengraph-image.png',
                width: 1200,
                height: 630,
                alt: 'Miami - A mission for the city'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Miami',
        description,
        images: ['/miami/opengraph-image.png']
    }
};

const UTM_PARAMS =
    '?utm_source=cbnsndwch.io&utm_medium=partner-highlights&utm_campaign=miami_hub';

const COMMUNITY_PHOTOS = [
    n1,
    n2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    hn1,
    hn2,
    hn3,
    hn4,
    hn5,
    hn6,
    hn7,
    hn8,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18
];

function CommunityHighlight({
    name,
    relationship,
    href,
    children,
    image
}: {
    name: string;
    relationship: string;
    href?: string;
    children: React.ReactNode;
    image?: any;
}) {
    return (
        <Card as="li">
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:ring-white/10">
                {image ? (
                    <Image
                        src={image}
                        alt={`${name} logo`}
                        className="h-full w-full object-cover"
                        unoptimized
                    />
                ) : (
                    <span className="text-xl font-bold text-zinc-400 dark:text-zinc-500">
                        {name.charAt(0)}
                    </span>
                )}
            </div>
            <Card.Title as="h3" href={href} newTab>
                {name}
            </Card.Title>
            <Card.Eyebrow>{relationship}</Card.Eyebrow>
            <Card.Description>{children}</Card.Description>
            {href && <Card.Cta>Visit website</Card.Cta>}
        </Card>
    );
}

function SocialLink({
    icon: Icon,
    href,
    children
}: {
    icon: any;
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
        >
            <Icon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-teal-500 dark:fill-zinc-400 dark:group-hover:fill-teal-400" />
            {children}
        </a>
    );
}

function InitiativeStrip({ images, alt }: { images: any[]; alt: string }) {
    return (
        <div className="relative z-10 mb-6 grid w-full grid-cols-3 gap-2 sm:gap-3">
            {images.map((image, i) => (
                <div
                    key={i}
                    className={clsx(
                        'relative aspect-4/3 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800',
                        i === 2 && 'hidden sm:block'
                    )}
                >
                    <Image
                        src={image}
                        alt={i === 0 ? alt : ''}
                        fill
                        sizes="(min-width: 640px) 15rem, 33vw"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}

function Pillar({
    number,
    title,
    children
}: {
    number: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="relative pl-12">
            <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
                {number}
            </span>
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                {title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
                {children}
            </p>
        </div>
    );
}

export default function MiamiPage() {
    return (
        <Container className="mt-16 sm:mt-32">
            <header className="max-w-2xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                        <Image
                            src={logoHelloMiami}
                            alt="hello_miami logo"
                            className="h-8 w-8"
                            unoptimized
                        />
                    </div>
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Personal Mission
                    </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    Miami needs a lot of things. I&apos;m working on the craft.
                </h1>
                <p className="mt-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
                    This city has capital, venues, conferences and a real inflow
                    of technical people, and it could use more of all of it. The
                    piece I&apos;ve taken on is the one closest to my hands: the
                    standard we hold the work to, and a memory. Every hackathon,
                    demo day and meetup here starts from zero. A fresh Luma
                    page, a fresh spreadsheet, a fresh Discord, and a talent
                    graph that evaporates the following Monday.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
                    My mission is to close that gap and make Miami a place where
                    serious engineering happens. That means a room that meets
                    every week without fail, standards that hold up anywhere,
                    and infrastructure so that what we build together
                    accumulates.
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                    <SocialLink
                        href="https://x.com/joinhello_miami"
                        icon={TwitterIcon}
                    >
                        @joinhello_miami
                    </SocialLink>
                    <SocialLink
                        href="https://instagram.com/joinhello_miami"
                        icon={InstagramIcon}
                    >
                        Instagram
                    </SocialLink>
                    <SocialLink
                        href="https://linkedin.com/in/hello-miami"
                        icon={LinkedInIcon}
                    >
                        LinkedIn
                    </SocialLink>
                </div>
            </header>

            <FeaturedPhotos images={COMMUNITY_PHOTOS} />

            <div className="mt-16 sm:mt-20 space-y-20">
                <Section title="The Thesis">
                    <div className="space-y-10">
                        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
                            Tech hubs are not built by incentives. They&apos;re
                            built by a critical mass of people who care about
                            the same craft, see each other often enough to hold
                            each other to it, and leave something behind. Four
                            things have to be true. None of them is money.
                        </p>

                        <div className="space-y-8">
                            <Pillar number="01" title="A reliable room">
                                Community is a function of frequency. Production
                                value matters far less. Hack Night runs twice a
                                week, every week, in Wynwood and in South Beach.
                                No pitches, no panels, no fireside chats, just
                                people building in the same room until something
                                works. Showing up consistently for years is the
                                entire trick, and it&apos;s the part most
                                ecosystems skip.
                            </Pillar>
                            <Pillar number="02" title="A standard to hold">
                                &quot;Sun and fun&quot; is a great brand for a
                                city. An engineering culture needs one of its
                                own, and the work here should be able to stand
                                next to work from anywhere. That means talking
                                openly about architecture, reading each
                                other&apos;s code, disagreeing in public, and
                                being unembarrassed about depth.
                            </Pillar>
                            <Pillar number="03" title="A memory">
                                The single biggest structural gap in Miami tech
                                is that nothing persists. Builders should hold a
                                stable identity across every event they touch,
                                and accrue a reputation that follows them. Hosts
                                should get real tooling. I am actively building
                                this layer with{' '}
                                <Link
                                    href={`https://thelabmiami.com/${UTM_PARAMS}`}
                                    target="_blank"
                                    className="font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
                                >
                                    The LAB
                                </Link>{' '}
                                as the founding design partner.
                            </Pillar>
                            <Pillar number="04" title="A path in">
                                A hub that only serves people who already made
                                it is a country club. The pipeline matters more
                                than the peak: local talent meeting global
                                standards, career changers finding a first room
                                that doesn&apos;t condescend, and students
                                discovering that the ceiling is much higher than
                                they were told.
                            </Pillar>
                        </div>

                        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                Where this is going
                            </h3>
                            <p className="mt-2 text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
                                The next chapter is heavier infrastructure:
                                hackathon-as-a-service tooling that gives Miami
                                a durable talent graph, deeper sponsor
                                relationships that fund the work without
                                distorting it, engagement with local government
                                and non-profits, and eventually putting capital
                                behind the most promising builders in the room.
                                I&apos;m being deliberate about sequence,
                                because the room came first for a reason, but
                                the ambition is not small.
                            </p>
                            <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
                                If you&apos;re a founder, a sponsor, an operator
                                or an investor who wants Miami to be genuinely
                                good at building software,{' '}
                                <Link
                                    href="https://x.com/cbnsndwch"
                                    target="_blank"
                                    className="font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
                                >
                                    come talk to me
                                </Link>
                                . I&apos;m easy to find on a Tuesday.
                            </p>
                        </div>
                    </div>
                </Section>

                <Section title="Active Initiatives">
                    <div className="space-y-10">
                        <Card as="article">
                            <InitiativeStrip
                                images={[n1, hn1, n4]}
                                alt="Builders at a recent hello_miami Hack Night"
                            />
                            <Card.Title
                                href="https://luma.com/hello_miami"
                                newTab
                            >
                                Hack Night @ hello_miami
                            </Card.Title>
                            <Card.Eyebrow decorate>
                                Twice a week • Wynwood & South Beach
                            </Card.Eyebrow>
                            <Card.Description>
                                We just want to hang out with other nerds and
                                build cool shit. Hack Night is our flagship
                                event where engineers, designers, and founders
                                come together to build in public. No pitches, no
                                fluff, just builders.
                            </Card.Description>
                            <Card.Cta>Join the next one on Luma</Card.Cta>
                        </Card>

                        <Card as="article">
                            <div className="relative z-10 mb-6 flex w-full max-w-sm items-center justify-center rounded-lg bg-white p-6 ring-1 ring-zinc-900/5 dark:ring-white/10">
                                <Image
                                    src={logoSprint}
                                    alt="The Marketing AI Sprint"
                                    className="h-auto w-full max-w-52"
                                    unoptimized
                                />
                            </div>
                            <Card.Title href="https://simplifai.studio" newTab>
                                The Marketing AI Sprint
                            </Card.Title>
                            <Card.Eyebrow decorate>
                                Upcoming • with The LAB Miami & SimplifAI Studio
                            </Card.Eyebrow>
                            <Card.Description>
                                A hackathon built around what AI actually
                                changes about marketing work. I&apos;m the
                                technical partner on this one: event
                                infrastructure, the submission and judging
                                pipeline, and making sure the builders in the
                                room have everything they need to ship something
                                real in a weekend. Still being planned; dates
                                and registration to follow.
                            </Card.Description>
                            <Card.Cta>See SimplifAI Studio</Card.Cta>
                        </Card>

                        {/* TODO: the impact report still only covers 2025.
                            Refresh it with 2026 year-to-date numbers, then
                            un-comment this card. */}
                        {/* <Card as="article">
                            <InitiativeStrip
                                images={[hn5, n6, hn6]}
                                alt="Hack Night sessions through the year"
                            />
                            <Card.Title
                                href="https://state-of-hack-night-2025.cbnsndwch.dev"
                                newTab
                            >
                                State of Hack Night 2025 Report
                            </Card.Title>
                            <Card.Eyebrow decorate>
                                Impact Report • Data Visualization
                            </Card.Eyebrow>
                            <Card.Description>
                                An interactive visualization of how our
                                community has grown, where builders are coming
                                from, and the technologies they&apos;re using to
                                shape Miami&apos;s future.
                            </Card.Description>
                            <Card.Cta>Explore the Data</Card.Cta>
                        </Card> */}
                    </div>
                </Section>

                <Section title="Partners & Supporters">
                    <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
                        <CommunityHighlight
                            name="Clerk"
                            relationship="Event Series Partner"
                            image={logoClerk}
                            href={`https://clerk.com/${UTM_PARAMS}`}
                        >
                            Authentication and user management built for
                            developers who have better things to do than roll
                            their own session handling. Their community team is
                            backing a monthly event series with us, running
                            through the end of 2026.
                        </CommunityHighlight>
                        <CommunityHighlight
                            name="The LAB / The DOCK"
                            relationship="Venue & Platform Partner"
                            image={logoTheLab}
                            href={`https://thelabmiami.com/${UTM_PARAMS}`}
                        >
                            Miami&apos;s original entrepreneur space, and the
                            campus-style home of our Tuesday sessions. Also my
                            design partner on the events infrastructure that
                            gives this city a memory.
                        </CommunityHighlight>
                        <CommunityHighlight
                            name="Moonlighter FabLab"
                            relationship="Venue Partner"
                            image={logoMoonlighter}
                            href={`https://moonlighterfablab.org/${UTM_PARAMS}`}
                        >
                            A S.T.E.A.M. Learning Center and digital fabrication
                            lab that serves as the perfect backdrop for our
                            Thursday night builds in Miami Beach.
                        </CommunityHighlight>
                        <CommunityHighlight
                            name="SimplifAI Studio"
                            relationship="Event Partner"
                            image={logoSimplifai}
                            href={`https://simplifai.studio/${UTM_PARAMS}`}
                        >
                            Co-conspirators on The Marketing AI Sprint, bringing
                            the applied-AI perspective that keeps the event
                            grounded in real marketing work.
                        </CommunityHighlight>
                        <CommunityHighlight
                            name="Teal"
                            relationship="Hack Night Sponsor"
                            image={logoTeal}
                            href={`https://tealhq.com/${UTM_PARAMS}`}
                        >
                            Tools that help people run their careers on purpose.
                            Teal sponsors Hack Night and helps us keep it free
                            for everyone who walks in.
                        </CommunityHighlight>
                    </ul>
                </Section>

                <Section title="Around the Ecosystem">
                    <div className="space-y-10">
                        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
                            Hack Night is the center of gravity, but it&apos;s
                            not the whole picture. A healthy scene needs many
                            rooms, and some of the most important work is
                            keeping the older ones from disappearing.
                        </p>
                        <div className="space-y-8">
                            <Pillar number="05" title="Front-End Miami">
                                One of the city&apos;s longest-running technical
                                communities. I&apos;ve been working on
                                preserving its archive so a decade of local
                                knowledge doesn&apos;t vanish with a Slack
                                retention policy.
                            </Pillar>
                            {/* TODO: RustMiami is still only an intention.
                                Un-comment once the first event has actually
                                happened, and renumber the pillars below. */}
                            {/* <Pillar number="06" title="RustMiami">
                                Helping stand up a home for systems programmers
                                here, because the ceiling on what this city
                                builds should not stop at the application layer.
                            </Pillar> */}
                            <Pillar number="06" title="Superteam USA">
                                Plugged into the Solana builder community and
                                its hackathon circuit, which consistently
                                produces some of the most motivated builders I
                                meet.
                            </Pillar>
                            <Pillar number="07" title="hello_miami merch">
                                Yes, there&apos;s a shop. Scenes need totems,
                                and a good shirt does more for belonging than a
                                newsletter ever will.
                            </Pillar>
                        </div>
                    </div>
                </Section>

                <Section title="Community Moments">
                    <CommunityGallery images={COMMUNITY_PHOTOS} />
                </Section>
            </div>
        </Container>
    );
}
