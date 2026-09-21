import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ComponentType } from 'react';

import Container from '@/components/Container';
import PostSummaryList from '@/components/Home/PostSummaryList';
import {
    GitHubIcon,
    FacebookIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/components/SocialIcons';
import logo1NationUp from '@/images/logos/1nationup.svg';
import logoChatHQ from '@/images/logos/chathq.svg';
import logoExtendly from '@/images/logos/extendly.svg';
import logoHelloMiami from '@/images/logos/hello-miami.svg';
import logoKhph from '@/images/logos/khph.png';
import logoNowl from '@/images/logos/nowl.png';
import logoPahoy from '@/images/logos/pahoy.svg';
import logoTheLab from '@/images/logos/the-lab-miami-sq.webp';
import image1 from '@/images/photos/image-1.jpg';
import image2 from '@/images/photos/image-2.jpg';
import image3 from '@/images/photos/image-3.jpg';
import image4 from '@/images/photos/image-4.jpg';
import image5 from '@/images/photos/image-5.jpg';
import { getRecentGuestPosts, getRecentPosts } from '@/lib/posts/utils';

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

interface Role {
    company: string;
    title: string;
    logo: ImageProps['src'];
    start: string | { label: string; dateTime: string };
    end: string | { label: string; dateTime: string };
}

function Role({ role }: { role: Role }) {
    const startLabel =
        typeof role.start === 'string' ? role.start : role.start.label;
    const startDate =
        typeof role.start === 'string' ? role.start : role.start.dateTime;

    const endLabel = typeof role.end === 'string' ? role.end : role.end.label;
    const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime;

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
    const resume: Array<Role> = [
        {
            company: 'PaHoy',
            title: 'Founder',
            logo: logoPahoy,
            start: '2026',
            end: {
                label: 'Present',
                dateTime: new Date().getFullYear().toString()
            }
        },
        {
            company: 'The LAB Miami',
            title: 'Builder in Residence',
            logo: logoTheLab,
            start: '2026',
            end: {
                label: 'Present',
                dateTime: new Date().getFullYear().toString()
            }
        },
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
            end: '2026'
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
        </div>
    );
}

function Photos() {
    const rotations = [
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
                        Hi there! I&apos;m Serge, a software engineer in Miami.
                        I work for myself these days, taking on a small number
                        of engagements at a time: platform architecture, the
                        integrations nobody else wants to touch, and getting
                        teams from &quot;it works on my machine&quot; to
                        something that ships on a schedule. I&apos;m the CTO at{' '}
                        <Link
                            href="https://getextendly.com"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                            target="_blank"
                        >
                            Extendly
                        </Link>{' '}
                        and I&apos;m Builder in Residence at{' '}
                        <Link
                            href="https://thelabmiami.com"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                            target="_blank"
                        >
                            The LAB Miami
                        </Link>
                        .
                    </p>
                    <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                        I&apos;m also building{' '}
                        <Link
                            href="https://pahoy.app"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                            target="_blank"
                        >
                            PaHoy
                        </Link>
                        , a startup making it possible to find and pay for
                        services in Cuba from anywhere in the world. Outside
                        that there&apos;s{' '}
                        <Link
                            href="/projects/erden"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                        >
                            Erden
                        </Link>{' '}
                        and a pile of{' '}
                        <Link
                            href="/projects"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                        >
                            open source
                        </Link>
                        . I also co-host{' '}
                        <Link
                            href="https://events.helloworld.miami"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                            target="_blank"
                        >
                            hello_miami Hack Night
                        </Link>
                        , now twice a week across Wynwood and South Beach.
                    </p>
                    <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                        I ride a tallbike, read too much sci-fi, and I&apos;m on
                        a{' '}
                        <Link
                            href="/miami"
                            className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                        >
                            mission to make Miami
                        </Link>{' '}
                        a place where serious engineering happens. Come on in!
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
                        <Resume />
                    </div>
                </div>
            </Container>
        </>
    );
}
