import clsx from 'clsx';
import type { Metadata } from 'next';
import Image from 'next/image';

import Card from '@/components/Card';
import Container from '@/components/Container';
import { Section } from '@/components/Section';
import {
    InstagramIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/components/SocialIcons';
import logoHelloMiami from '@/images/logos/hello-miami.svg';
import logoMoonlighter from '@/images/logos/moonlighter.webp';
import logoTheLab from '@/images/logos/the-lab-miami-sq.webp';
import logoInit from '@/images/logos/init.webp';
import { CommunityGallery, FeaturedPhotos } from './CommunityGallery';

import image1 from '@/images/community/3f4f0c21-77ff-4b4e-92d2-4e6912fb38ed.png';
import image2 from '@/images/community/511517509_17905352115190767_7986468590911190968_n.jpg';
import image3 from '@/images/community/518877047_17907205785190767_9036288187190743634_n.jpg';
import image4 from '@/images/community/985dc72f-4b21-4c61-a6ec-2a53f726e09b.webp';
import image5 from '@/images/community/G3314HPXwAAB85H.webp';
import image6 from '@/images/community/G3314HXWUAA3DiJ.webp';
import image7 from '@/images/community/G5mVWz-XAAA4RHt.webp';
import image8 from '@/images/community/G5mVWz7WAAAa9a4.webp';
import image9 from '@/images/community/G5mVWzsXUAAE1uU.webp';
import image10 from '@/images/community/G7NcYrpW8AAhvBT.webp';
import image11 from '@/images/community/G7NcYrpWQAAaNqp.webp';
import image12 from '@/images/community/G7NcYrpX0AAeXhF.webp';
import image13 from '@/images/community/G7xNdXaWYAACOOt.webp';
import image14 from '@/images/community/G7xNdXYWIAAAd0W.webp';
import image15 from '@/images/community/G7xXHZ8XQAA9jLi.webp';
import image16 from '@/images/community/Gilzx1QXcAAjECN.webp';
import image17 from '@/images/community/GoRC6ckWsAEIUzM.webp';
import image18 from '@/images/community/Gx4FS_UX0AAj7ZH.webp';

export const metadata: Metadata = {
    title: 'Miami Hub',
    description:
        'A personal mission to make Miami a first-class tech hub through community, engineering, and impact.',
    openGraph: {
        title: 'Miami Hub',
        description:
            'A personal mission to make Miami a first-class tech hub through community, engineering, and impact.',
        type: 'website',
        images: [
            {
                url: '/miami/opengraph-image.png',
                width: 1200,
                height: 630,
                alt: 'Miami Hub - A mission for the city'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Miami Hub',
        description:
            'A personal mission to make Miami a first-class tech hub through community, engineering, and impact.',
        images: ['/miami/opengraph-image.png']
    }
};

const UTM_PARAMS =
    '?utm_source=cbnsndwch.io&utm_medium=partner-highlights&utm_campaign=miami_hub';

const COMMUNITY_PHOTOS = [
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
    role,
    href,
    children,
    image
}: {
    name: string;
    role: string;
    href?: string;
    children: React.ReactNode;
    image?: any;
}) {
    return (
        <Card as="li">
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 overflow-hidden">
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
            <Card.Eyebrow>{role}</Card.Eyebrow>
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
                    Miami: A Mission for the City.
                </h1>
                <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                    I believe Miami has everything it needs to be a first-class
                    global tech hub. My mission is to bridge the gap between
                    &quot;sun and fun&quot; and &quot;serious engineering&quot;
                    by fostering a community of builders who hold themselves to
                    the highest standards.
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
                <Section title="Active Initiatives">
                    <div className="space-y-10">
                        <Card as="article">
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
                        </Card>
                    </div>
                </Section>

                <Section title="The Vision">
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                            Making Miami a tech hub isn&apos;t just about tax
                            incentives or attracting big companies. It&apos;s
                            about culture. It&apos;s about creating a safe space
                            for high-level engineering and a pipeline for local
                            talent to engage with global standards.
                        </p>
                        <p className="text-base text-zinc-700 dark:text-zinc-400 mt-4 leading-relaxed">
                            As this mission evolves, I&apos;ll be expanding into
                            government engagement, supporting local non-profits,
                            and facilitating angel investments for the most
                            promising builders in our community.
                        </p>
                    </div>
                </Section>

                <Section title="Featured Partners">
                    <ul
                        role="list"
                        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2"
                    >
                        <CommunityHighlight
                            name="The LAB / The DOCK"
                            role="Venue Partner"
                            image={logoTheLab}
                            href={`https://thelabmiami.com/${UTM_PARAMS}`}
                        >
                            Miami&apos;s original entrepreneur space. The LAB
                            and The DOCK provide the high-energy, campus-style
                            environment where we host our Tuesday sessions.
                        </CommunityHighlight>
                        <CommunityHighlight
                            name="Moonlighter FabLab"
                            role="Venue Partner"
                            image={logoMoonlighter}
                            href={`https://moonlighterfablab.org/${UTM_PARAMS}`}
                        >
                            A S.T.E.A.M. Learning Center and digital fabrication
                            lab that serves as the perfect backdrop for our
                            Thursday night builds in Miami Beach.
                        </CommunityHighlight>
                        <CommunityHighlight
                            name="INIT"
                            role="Ecosystem Partner"
                            image={logoInit}
                            href={`https://www.weareinit.org/${UTM_PARAMS}`}
                        >
                            A community empowering underserved groups to launch
                            successful tech careers through technical programs,
                            career development, and access to job opportunities.
                        </CommunityHighlight>
                    </ul>
                </Section>

                <Section title="Community Moments">
                    <CommunityGallery images={COMMUNITY_PHOTOS} />
                </Section>
            </div>
        </Container>
    );
}
