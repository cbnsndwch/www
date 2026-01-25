import type { ComponentPropsWithoutRef, ComponentType } from 'react';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Button } from '@/components/Button';
import Container from '@/components/Container';
import {
    GitHubIcon,
    FacebookIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/components/SocialIcons';
import PostSummaryList from '@/components/Home/PostSummaryList';

import { getRecentGuestPosts, getRecentPosts } from '@/lib/posts/utils';

import logoExtendly from '@/images/logos/extendly.svg';
import logoHelloMiami from '@/images/logos/hello-miami.svg';
import logoChatHQ from '@/images/logos/chathq.svg';
import logo1NationUp from '@/images/logos/1nationup.svg';
import logoNowl from '@/images/logos/nowl.png';
import logoCujae from '@/images/logos/cujae.svg';
import logoKhph from '@/images/logos/khph.png';

import image1 from '@/images/photos/image-1.jpg';
import image2 from '@/images/photos/image-2.jpg';
import image3 from '@/images/photos/image-3.jpg';
import image4 from '@/images/photos/image-4.jpg';
import image5 from '@/images/photos/image-5.jpg';

function MailIcon(props: ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
            />
            <path
                d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                className="stroke-zinc-400 dark:stroke-zinc-500"
            />
        </svg>
    );
}

function BriefcaseIcon(props: ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
            />
            <path
                d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
                className="stroke-zinc-400 dark:stroke-zinc-500"
            />
        </svg>
    );
}

function ArrowDownIcon(props: ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
            <path
                d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

type SocialLinkProps = {
    icon: ComponentType<{ className?: string }>;
} & ComponentPropsWithoutRef<typeof Link>;

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
    return (
        <Link className="group -m-1 p-1" target="_blank" {...props}>
            <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
        </Link>
    );
}

function Newsletter() {
    return (
        <form
            action="/thank-you"
            className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
        >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <MailIcon className="h-6 w-6 flex-none" />
                <span className="ml-3">Stay up to date</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">
                Get notified when I publish something new. Unsubscribe at any
                time.
            </p>
            <div className="mt-6 flex">
                <input
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    required
                    className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 dark:border-zinc-700 dark:bg-zinc-700/15 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 sm:text-sm"
                />
                <Button type="submit" className="ml-4 flex-none">
                    Join
                </Button>
            </div>
        </form>
    );
}

interface Role {
    company: string;
    title: string;
    logo: ImageProps['src'];
    start: string | { label: string; dateTime: string };
    end: string | { label: string; dateTime: string };
}

function Role({ role }: { role: Role }) {
    let startLabel =
        typeof role.start === 'string' ? role.start : role.start.label;
    let startDate =
        typeof role.start === 'string' ? role.start : role.start.dateTime;

    let endLabel = typeof role.end === 'string' ? role.end : role.end.label;
    let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime;

    return (
        <li className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {role.company}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-zinc-600 dark:text-zinc-400">
                    {role.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                    className="ml-auto text-xs text-zinc-500 dark:text-zinc-500"
                    aria-label={`${startLabel} until ${endLabel}`}
                >
                    <time dateTime={startDate}>{startLabel}</time>{' '}
                    <span aria-hidden="true">—</span>{' '}
                    <time dateTime={endDate}>{endLabel}</time>
                </dd>
            </dl>
        </li>
    );
}

function Resume() {
    let resume: Array<Role> = [
        {
            company: 'Hack Night @ hello_miami',
            title: 'Co-Host',
            logo: logoHelloMiami,
            start: '2025',
            end: {
                label: 'Present',
                dateTime: new Date().getFullYear().toString()
            }
        },
        {
            company: 'Extendly LLC',
            title: 'CTO',
            logo: logoExtendly,
            start: '2024',
            end: {
                label: 'Present',
                dateTime: new Date().getFullYear().toString()
            }
        },
        {
            company: '1NationUp',
            title: 'CTO | Co-Founder',
            logo: logo1NationUp,
            start: '2019',
            end: {
                label: 'Present',
                dateTime: new Date().getFullYear().toString()
            }
        },
        {
            company: 'ChatHQ (acqd.)',
            title: 'CTO | Co-Founder',
            logo: logoChatHQ,
            start: '2021',
            end: '2024'
        },
        {
            company: 'Night Owl SP',
            title: 'Solutions Architect',
            logo: logoNowl,
            start: '2017',
            end: '2019'
        },
        {
            company: "Ke Hay Pa' Hoy?",
            title: 'CTO | Co-Founder',
            logo: logoKhph,
            start: '2015',
            end: '2016'
        },
        {
            company: 'Technical University of Havana',
            title: 'Instructor | Software Engineer',
            logo: logoCujae,
            start: '2012',
            end: '2016'
        }
    ];

    return (
        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <BriefcaseIcon className="h-6 w-6 flex-none" />
                <span className="ml-3">Work</span>
            </h2>
            <ol className="mt-6 space-y-4">
                {resume.map((role, roleIndex) => (
                    <Role key={roleIndex} role={role} />
                ))}
            </ol>
            {/* <Button href="#" variant="secondary" className="group mt-6 w-full">
                Download CV
                <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
            </Button> */}
        </div>
    );
}

function Photos() {
    let rotations = [
        'rotate-2',
        '-rotate-2',
        'rotate-2',
        'rotate-2',
        '-rotate-2'
    ];

    return (
        <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {[image1, image2, image3, image4, image5].map(
                    (image, imageIndex) => (
                        <div
                            key={image.src}
                            className={clsx(
                                'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                                rotations[imageIndex % rotations.length]
                            )}
                        >
                            <Image
                                src={image}
                                alt=""
                                sizes="(min-width: 640px) 18rem, 11rem"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default async function Home() {
    const recentPosts = await getRecentPosts();
    const recentGuestPosts = await getRecentGuestPosts();

    return (
        <>
            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        Knowledge collector, tallbike rider, software crafter,
                        event host, OSS contributor.
                    </h1>
                    <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                        Hi there! I&apos;m Serge and I&apos;m the VP of
                        Engineering at{' '}
                        <Link
                            href="https://getextendly.com"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                            target="_blank"
                        >
                            Extendly
                        </Link>
                        , where we help marketing agency owners make their
                        HighLevel journey easier, and the CTO and Co-Founder of{' '}
                        <Link
                            href="https://www.1nationup.com"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                            target="_blank"
                        >
                            1NationUp
                        </Link>
                        , the one-stop-shop branding and marketing partners for
                        thousands of small businesses across South Florida.
                    </p>
                    <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                        I&apos;m also the co-host of{' '}
                        <Link
                            href="https://lu.ma/hello_miami"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                            target="_blank"
                        >
                            Hack Nights by hello_miami
                        </Link>
                        , a weekly mini-hackathon bringing engineers, developers
                        and designers to connect with other technical folks in
                        Miami and build cool projects together.
                    </p>
                    <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                        I&apos;m an avid cyclist, sci-fi fan, and music lover.
                        I&apos;m currently on a mission to help software
                        developers and agency owners deliver software
                        applications to the HighLevel Apps Marketplace. Come on
                        in!
                    </p>
                    <div className="mt-6 flex gap-6">
                        <SocialLink
                            href="https://x.com/cbnsndwch"
                            aria-label="Follow Serge on X"
                            icon={TwitterIcon}
                        />
                        <SocialLink
                            href="https://www.facebook.com/cbnsndwch"
                            aria-label="Follow Serge on Facebook"
                            icon={FacebookIcon}
                        />
                        <SocialLink
                            href="https://github.com/cbnsndwch"
                            aria-label="Follow Serge on GitHub"
                            icon={GitHubIcon}
                        />
                        <SocialLink
                            href="https://www.linkedin.com/in/cbnsndwch/"
                            aria-label="Follow Serge on LinkedIn"
                            icon={LinkedInIcon}
                        />
                    </div>
                </div>
            </Container>

            <Photos />

            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
                        <PostSummaryList
                            title="My latest blog posts"
                            posts={recentPosts}
                        />
                        {recentGuestPosts?.length && (
                            <PostSummaryList
                                title="Recent guest posts"
                                posts={recentGuestPosts}
                            />
                        )}
                    </div>
                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        {/* TODO: uncomment this one we've connected the newsletter form to GHL */}
                        {/* <Newsletter /> */}

                        <Resume />
                    </div>
                </div>
            </Container>
        </>
    );
}
