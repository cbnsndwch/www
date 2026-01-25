import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import Container from '@/components/Container';
import {
    GitHubIcon,
    FacebookIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/components/SocialIcons';
import portraitImage from '@/images/portrait.jpg';

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

// function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
//     return (
//         <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
//             <path
//                 fillRule="evenodd"
//                 d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
//             />
//         </svg>
//     );
// }

const description =
    'Knowledge collector, tallbike rider, software crafter, event host, OSS contributor.';

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
                        {description}
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-zinc-700 dark:text-zinc-400">
                        <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                            I&apos;m Serge and I&apos;m the VP of Engineering at{' '}
                            <Link
                                href="https://getextendly.com"
                                className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                                target="_blank"
                            >
                                Extendly
                            </Link>
                            , where we help marketing agency owners make their
                            HighLevel journey easier, and the CTO and Co-Founder
                            of{' '}
                            <Link
                                href="https://www.1nationup.com"
                                className="font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
                                target="_blank"
                            >
                                1NationUp
                            </Link>
                            , the one-stop-shop branding and marketing partners
                            for thousands of small businesses across South
                            Florida.
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
                            , a weekly mini-hackathon bringing engineers,
                            developers and designers to connect with other
                            technical folks in Miami and build cool projects
                            together.
                        </p>
                        <p className="mt-6 text-base text-zinc-700 dark:text-zinc-400">
                            I&apos;m an avid cyclist, sci-fi fan, and music
                            lover. I&apos;m currently on a mission to help
                            software developers and agency owners deliver
                            software applications to the HighLevel Apps
                            Marketplace. Come on in!
                        </p>
                    </div>
                </div>
                <div className="lg:pl-20">
                    <ul role="list">
                        <SocialLink
                            href="https://twitter.com/cbnsndwch"
                            icon={TwitterIcon}
                        >
                            Follow on Twitter
                        </SocialLink>
                        <SocialLink
                            href="https://www.facebook.com/cbnsndwch"
                            icon={FacebookIcon}
                            className="mt-4"
                        >
                            Follow on Facebook
                        </SocialLink>
                        <SocialLink
                            href="https://github.com/cbnsndwch"
                            icon={GitHubIcon}
                            className="mt-4"
                        >
                            Follow on GitHub
                        </SocialLink>
                        <SocialLink
                            href="https://www.linkedin.com/in/cbnsndwch/"
                            icon={LinkedInIcon}
                            className="mt-4"
                        >
                            Follow on LinkedIn
                        </SocialLink>
                        {/* <SocialLink
                            href="mailto:intro@cbnsndwch.io"
                            icon={MailIcon}
                            className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                        >
                            intro@cbnsndwch.io
                        </SocialLink> */}
                    </ul>
                </div>
            </div>
        </Container>
    );
}
