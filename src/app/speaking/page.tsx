import type {
    ComponentPropsWithoutRef,
    PropsWithChildren,
    ReactElement
} from 'react';

import Card from '@/components/Card';
import ES from '@/components/Flags/ES';
import US from '@/components/Flags/US';
import { Image } from '@/components/primitives';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import imgAiRenaissance from '@/images/speaking/ai-renaissance.webp';
import imgDataChaos from '@/images/speaking/data-chaos-podcast.webp';
import imgElDream from '@/images/speaking/el-dream-podcast.webp';
import imgSpotlightChatHq from '@/images/speaking/highlevel-spotlight-chathq.webp';
import imgHighLevelSso from '@/images/speaking/highlevel-sso.webp';
import imgHighLevelWidgets from '@/images/speaking/highlevel-widgets.webp';
import imgReactMiami from '@/images/speaking/react-miami-2026.webp';
import type { ImageAsset } from '@/lib/content/image';
import type { Metadata } from '@/lib/content/metadata';

function SpeakingSection({
    children,
    ...props
}: ComponentPropsWithoutRef<typeof Section>) {
    return (
        <Section {...props}>
            <div className="space-y-16">{children}</div>
        </Section>
    );
}

const FLAGS = {
    en: US,
    es: ES
};

type SupportedLanguage = keyof typeof FLAGS;

export type TitleWithLanguageFlagProps = PropsWithChildren<{
    lang?: SupportedLanguage;
}>;

function TitleWithFlag({ lang = 'en', children }: TitleWithLanguageFlagProps) {
    const FlagComponent = FLAGS[lang];

    return (
        <span className="rounded-full px-2 inline-flex items-center justify-center gap-2 leading-none">
            <FlagComponent height={12} />
            {children}
        </span>
    );
}

type AppearanceProps = {
    title: string | ReactElement;
    description: string;
    event: string;
    cta: string;
    href: string;
    lang?: SupportedLanguage;
    image: ImageAsset;
    imageAlt: string;
};

function Appearance({
    title,
    description,
    event,
    cta,
    href,
    lang = 'en',
    image,
    imageAlt
}: AppearanceProps) {
    return (
        <Card as="article">
            <div className="relative z-10 mb-6 w-full max-w-md overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
                <Image
                    src={image}
                    alt={imageAlt}
                    sizes="(min-width: 640px) 28rem, 100vw"
                    className="aspect-video h-auto w-full object-cover"
                />
            </div>
            <Card.Title newTab as="h3" href={href}>
                <TitleWithFlag lang={lang}>{title}</TitleWithFlag>
            </Card.Title>
            <Card.Eyebrow decorate>{event}</Card.Eyebrow>
            <Card.Description>{description}</Card.Description>
            <Card.Cta>{cta}</Card.Cta>
        </Card>
    );
}

export const metadata: Metadata = {
    title: 'Speaking',
    description:
        'Conference talks, podcast interviews and tutorials on engineering craft, marketplaces, and building software worth trusting.'
};

export default function Speaking() {
    return (
        <SimpleLayout
            title="Talks, interviews, and thinking out loud."
            intro={[
                "Teaching was my first job, and it never quite wore off. The fastest way I know to find out whether I actually understand something is to try to explain it to a room, so I take most chances I get, whether that's a conference stage, someone else's podcast, or a tutorial nobody asked for.",
                "The topics move around, but the thread doesn't: how to build software you can still reason about in a year, how marketplaces and platforms really behave once real people touch them, and why engineering judgment matters more than whatever is currently trending.",
                "If you're organizing an event and want a speaker who'll say something specific, reach out. I'm also happy to do this in Spanish."
            ]}
        >
            <div className="space-y-20">
                <SpeakingSection title="Conferences">
                    <Appearance
                        href="https://reactmiami.com"
                        title="The Anti-Shiny Object Syndrome"
                        description="On the cost of chasing every new framework, library and paradigm, and how to tell the difference between a tool that will still matter in three years and one that is currently loud."
                        event="React Miami 2026"
                        cta="About the conference"
                        image={imgReactMiami}
                        imageAlt="React Miami 2026"
                    />
                </SpeakingSection>
                <SpeakingSection title="AI RENAissance with Rena">
                    <Appearance
                        href="https://www.youtube.com/watch?v=DcDgSJVZeB0"
                        title="He Built an AI Lab in His Living Room, and His Agents Never Sleep"
                        description="On running a home AI lab, keeping coding agents useful over long horizons, and what changes when the machines keep working after you go to bed."
                        event="AI RENAissance with Rena, August 2026"
                        cta="Watch episode"
                        image={imgAiRenaissance}
                        imageAlt="AI RENAissance with Rena"
                    />
                </SpeakingSection>
                <SpeakingSection title="El Dream Podcast">
                    <Appearance
                        href="https://www.youtube.com/watch?v=LffVhm-xlHs"
                        title="Conversación con Sergio, un León del emprendimiento"
                        description="Sobre emprender desde Miami, construir equipos técnicos y el camino de La Habana a fundar empresas de software."
                        event="El Dream Podcast EP27, junio 2025"
                        cta="Ver episodio"
                        lang="es"
                        image={imgElDream}
                        imageAlt="El Dream Podcast episodio 27"
                    />
                </SpeakingSection>
                <SpeakingSection title="My YouTube Channel">
                    <Appearance
                        href="https://www.youtube.com/watch?v=3rveQDuVlR0&list=PLxp-vlg1uh-aajKG9OYjKfsa-2SCC0Qf4"
                        title="Building a High-Level Marketplace App that automatically logs users in"
                        description="How to implement Single Sign-On for your HighLevel Marketplace app."
                        event="HighLevel Marketplace for Developers"
                        cta="Watch video"
                        image={imgHighLevelSso}
                        imageAlt="HighLevel Marketplace SSO Explained"
                    />
                    <Appearance
                        href="https://www.youtube.com/playlist?list=PLxp-vlg1uh-aajKG9OYjKfsa-2SCC0Qf4"
                        title="Playlist: HighLevel Marketplace for Developers"
                        description="Go from zero to hero building apps for the HighLevel Marketplace."
                        event="Last updated: December 2023"
                        cta="View playlist"
                        image={imgHighLevelSso}
                        imageAlt="HighLevel Marketplace for Developers playlist"
                    />
                </SpeakingSection>

                <SpeakingSection title="Propel Data">
                    <Appearance
                        href="https://www.linkedin.com/events/chathq-llms-analyticsandthepowe7117905754963013632"
                        title="ChatHQ: LLMs, Analytics and the power of white label Conversion Rate Optimization Software"
                        description="On Using Artifical Intelligence (AI), Large Language Models (LLMs), and Analytics to power white label Conversion Rate Optimization for businesses."
                        event="Propel Data Stream on LinkedIn Live, March 2023"
                        cta="Watch replay"
                        image={imgSpotlightChatHq}
                        imageAlt="ChatHQ LinkedIn Live session"
                    />
                </SpeakingSection>
                <SpeakingSection title="Data Chaos Podcast">
                    <Appearance
                        href="https://open.spotify.com/episode/0Dfs7aZbA37KiGyyxg9o12"
                        title="Sergio Leon: Fourier from Cuba to Cutting-Edge AI"
                        description="On my 17-year journey from creating desktop applications to breaking new ground in the world of AI."
                        event="Data Chaos Podcast, March 2023"
                        cta="Listen to episode"
                        image={imgDataChaos}
                        imageAlt="Data Chaos Podcast"
                    />
                </SpeakingSection>
                <SpeakingSection title="HighLevel Spotlight">
                    <Appearance
                        href="https://www.youtube.com/watch?v=kXeX-9GaNVQ"
                        title="Increase Engagement with Customizable Widgets"
                        description="On building branded, context-rich experiences for brands by driving website traffic engagement."
                        event="HighLevel Spotlight Sessions, March 2023"
                        cta="Watch episode"
                        image={imgHighLevelWidgets}
                        imageAlt="Increase Engagement with Customizable Widgets"
                    />
                    <Appearance
                        href="https://www.youtube.com/watch?v=gdBsVRic0wQ"
                        title="Integrating Chat Technologies for Enhanced User Experiences"
                        description="On the importance of creating seamless experiences between HighLevel extensions and the main app."
                        event="HighLevel Spotlight Sessions, February 2021"
                        cta="Watch episode"
                        image={imgSpotlightChatHq}
                        imageAlt="HighLevel Spotlight Sessions with Sergio Leon of ChatHQ"
                    />
                </SpeakingSection>
            </div>
        </SimpleLayout>
    );
}
