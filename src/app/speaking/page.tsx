import type { ComponentPropsWithoutRef, PropsWithChildren, ReactElement } from 'react';
import type { Metadata } from 'next';

import Card from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import US from '@/components/Flags/US';
import ES from '@/components/Flags/ES';

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
    es: ES,
};

type SupportedLanguage = keyof typeof FLAGS;

export type TitleWithLanguageFlagProps = PropsWithChildren<{
    lang?: SupportedLanguage;
}>;

function TitleWithFlag({ lang = 'en', children }: TitleWithLanguageFlagProps) {
    const FlagComponent = FLAGS[lang];

    return (
        <span className="rounded-fullpx-2 inline-flex items-center justify-center gap-2 leading-none">
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
};

function Appearance({
    title,
    description,
    event,
    cta,
    href,
    lang = 'en',
}: AppearanceProps) {
    return (
        <Card as="article">
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
    description: 'I’ve been interviewed on a few really cool podcasts.',
    // 'I’ve spoken at events all around the world and been interviewed for many podcasts.',
};

export default function Speaking() {
    return (
        <SimpleLayout
            title="Discover Insights on App Development: My YouTube Channel and Podcast Features."
            intro={[
                "Welcome to my digital hub, where I specialize in educating developers and marketing agencies on the intricacies of building apps for the HighLevel Marketplace. Through my YouTube channel, I delve into the specifics of app development, offering tutorials, tips, and industry insights. My content is designed to empower both aspiring and experienced developers with the knowledge and tools needed to thrive in this dynamic marketplace. It's a resource-rich platform where learning and practical application go hand-in-hand.",
                "In addition to my YouTube channel, I have had the opportunity to share my experiences and perspectives on various podcasts. These podcast interviews provide a more conversational exploration of topics related to app development, digital marketing, and technology trends. They serve as a complementary resource, where listeners can gain additional insights and learn from my journey in the tech industry. I love podcast interviews because they give me the opportunity to reach audiences far beyond what's possible with in person events.",
                "Whether you are a developer looking to enhance your skills, a marketing agency aiming to expand your services, or just someone interested in the world of app development, there is content here for you. And if you're organizing a conference or event and need a speaker who can bring valuable insights to your audience, feel free to reach out. Let's collaborate to share knowledge and drive innovation in the digital space.",
            ]}
        >
            <div className="space-y-20">
                <SpeakingSection title="My YouTube Channel">
                    <Appearance
                        href="https://www.youtube.com/watch?v=3rveQDuVlR0&list=PLxp-vlg1uh-aajKG9OYjKfsa-2SCC0Qf4"
                        title="Building a High-Level Marketplace App that automatically logs users in"
                        description="How to implement Single Sign-On for your HighLevel Marketplace app."
                        event="HighLevel Marketplace for Developers"
                        cta="Watch video"
                    />
                    <Appearance
                        href="https://www.youtube.com/playlist?list=PLxp-vlg1uh-aajKG9OYjKfsa-2SCC0Qf4"
                        title="Playlist: HighLevel Marketplace for Developers"
                        description="Go from zero to hero building apps for the HighLevel Marketplace."
                        event="Last updated: December 2023"
                        cta="View playlist"
                    />
                </SpeakingSection>
                <SpeakingSection title="Lei Nai Shou">
                    <Appearance
                        href="https://www.youtube.com/watch?v=OsXmDRZyz-o&"
                        title="1Nation Up Brand Boosters - Lei Nai Shou 190"
                        description="Entrevistamos al equipo de 1NationUp, una agencia de marketing en Miami. #Cuba #1NationUp #Miami"
                        event="Lei Nai Shou EP190, May 2023"
                        cta="Ver episodio"
                        lang="es"
                    />
                    <Appearance
                        href="https://www.youtube.com/watch?v=gdBsVRic0wQ"
                        title="Sergio León - Lei Nai Shou 193"
                        description="Conversamos con el ingeniero de telecomunicaciones Sergio León sobre Chat GPT y la nueva tecnología de inteligencia artificial! #ChatGpt #InteligenciaArtificial #Ai"
                        event="Lei Nai Shou EP193, May 2023"
                        cta="Ver episodio"
                        lang="es"
                    />
                </SpeakingSection>
                <SpeakingSection title="Propel Data">
                    <Appearance
                        href="https://www.linkedin.com/events/chathq-llms-analyticsandthepowe7117905754963013632"
                        title="ChatHQ: LLMs, Analytics and the power of white label Conversion Rate Optimization Software"
                        description="On Using Artifical Intelligence (AI), Large Language Models (LLMS), and Analytics to power white label Conversion Rate Optmization for businesses."
                        event="Propel Data Stream on LinkedIn Live, March 2023"
                        cta="Watch replay"
                    />
                </SpeakingSection>
                <SpeakingSection title="Data Chaos Podcast">
                    <Appearance
                        href="https://open.spotify.com/episode/0Dfs7aZbA37KiGyyxg9o12"
                        title="Sergio Leon: Fourier from Cuba to Cutting-Edge AI"
                        description="On my 17-year journey from creating desktop applications to breaking new ground in the world of AI."
                        event="Data Chaos Podcast, March 2023"
                        cta="Listen to episode"
                    />
                </SpeakingSection>
                <SpeakingSection title="HighLevel Spotlight">
                    <Appearance
                        href="https://www.youtube.com/watch?v=kXeX-9GaNVQ"
                        title="Increase Engagement with Customizable Widgets"
                        description="On building branded, contex-rich experiences for brands by driving website traffic engagement."
                        event="HighLevel Spotlight Sessions, March 2023"
                        cta="Watch episode"
                    />
                    <Appearance
                        href="https://www.youtube.com/watch?v=gdBsVRic0wQ"
                        title="Integrating Chat Technologies for Enhanced User Experiences"
                        description="On the importance of creating seamless experiences between HighLevel extensions and the main app."
                        event="HighLevel Spotlight Sessions, February 2021"
                        cta="Watch episode"
                    />
                </SpeakingSection>
            </div>
        </SimpleLayout>
    );
}
