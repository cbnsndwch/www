import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Prose } from '@/components/Prose';

function ToolsSection({
    children,
    ...props
}: ComponentPropsWithoutRef<typeof Section>) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    );
}

type ToolProps = PropsWithChildren<{
    title: string;
    href?: string;
    cta?: string;
}>;

function Tool({ title, href, cta, children }: ToolProps) {
    return (
        <Card as="li">
            <Card.Title as="h3" href={href}>
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
            {cta && <Card.Cta>{cta}</Card.Cta>}
        </Card>
    );
}

export const metadata = {
    title: 'My Tech Stack',
    description:
        'Software I use, programming languages and frameworks I love, and other stuff I recommend.',
};

export default function Uses() {
    return (
        <SimpleLayout
            title="Software I use, programming languages and frameworks I love, and other stuff I recommend."
            intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
        >
            <div className="space-y-20">
                <ToolsSection title="Languages & Frameworks">
                    <Tool title="Typescript all the way!">
                        <Prose>
                            Coming from a .NET background, I&apos;m pretty fond
                            of C# and the type safety it provides. I&apos;ve
                            used Java, C++, Flutter, PHP, and plain Javascript
                            in all sorts of projects since college but once I
                            adopted TypeScript it&apos;s been my go-to language
                            for everything.
                        </Prose>
                        <Prose className="mt-4">
                            Well, almost everything, since the AI/ML world runs
                            on Python. I&apos;m actually looking forward to
                            Mojo, the new Python-like language from the creator
                            of Swift . Given I&apos;m doing more and more AI and
                            ML stuff these days, I have a plan to learn it soon.
                        </Prose>
                    </Tool>
                    <Tool title="NodeJS">
                        The OG JavaScript runtime for the server. Deno and Bun
                        seem promising, so I&apos;ll probably give them a try at
                        some point but for now NodeJS is still my go-to.
                    </Tool>
                    <Tool title="React + ViteJS">
                        This section is a work in progress. Come back later for
                        updates.
                    </Tool>
                    <Tool title="NextJS">
                        This site is built with NextJS. That&apos;s pretty much
                        it.
                    </Tool>
                </ToolsSection>
                <ToolsSection title="Infra">
                    <Tool title="AWS">
                        This section is a work in progress. Come back later for
                        updates.
                    </Tool>
                    <Tool title="Google Cloud">
                        This section is a work in progress. Come back later for
                        updates.
                    </Tool>
                    <Tool title="CloudFlare">
                        This section is a work in progress. Come back later for
                        updates.
                    </Tool>
                    <Tool title="Docker Swarm">
                        This section is a work in progress. Come back later for
                        updates.
                    </Tool>
                    <Tool title="Portainer">
                        This section is a work in progress. Come back later for
                        updates.
                    </Tool>
                    <Tool title="Traefik">
                        This section is a work in progress. Come back later for
                        updates.
                    </Tool>
                    <Tool title="NATS">
                        This section is a work in progress. Come back later for
                        updates.
                    </Tool>
                </ToolsSection>
                <ToolsSection title="Databases">
                    <Tool
                        title="MongoDB"
                        href="https://www.mongodb.com/atlas/database"
                        cta="Get a Free Managed MongoDB Database"
                    >
                        <Prose>
                            The absolute GOAT if you ask me! I&apos;m so done
                            with ORMs and JOINs that the
                            Object/Document-oriented paradigm makes all the
                            sense in the world to me. I&apos;ve used MongoDB in
                            all sorts of projects from basic CRUD apps to
                            complex data analytics. It&apos;s fast, flexible,
                            scalable, and open source.
                        </Prose>
                        <Prose className="mt-4">
                            If you&apos;re not too inclined to manage your own
                            DB servers, MongoDB Atlas is a great option.
                            It&apos;s super easy to set up and manage, has a
                            generous free tier that will be enough for most
                            simple Marketplace Apps, the paid tiers are cheaper
                            than most other cloud DB providers with comparable
                            compute power and memory.
                        </Prose>
                        <Prose>
                            Bonus points, Atlas App Services will automatically
                            turn your MongoDB database into a REST API for you
                            without you having to write a single line of code.
                            It&apos;s a great fit for apps that are hosted on a
                            CDN like CloudFlare Pages or Vercel, since it
                            doesn&apos;t have connection astablishment overhead
                            is stateless unlike regular database connections.
                        </Prose>
                    </Tool>
                    <Tool title="PostgreSQL">
                        <Prose>
                            OK, not everything can be NoSQL, there&apos;s
                            actually A LOT of awesome open source stuff out
                            there that uses PostgreSQL as its database. Some of
                            the things I use it for:
                        </Prose>
                        <Prose className="mt-4">
                            <b>LogTo</b> - OAuth2.0 server for user management
                        </Prose>
                        <Prose className="mt-4">
                            <b>N8N</b> - Self-hosted workflow automation
                        </Prose>
                        <Prose className="mt-4">
                            <b>Grafana</b> - Nice dashboards, log aggregation,
                            and alerting
                        </Prose>
                    </Tool>
                </ToolsSection>
                <ToolsSection title="Development Tools">
                    <Tool
                        title="VSCode FTW!"
                        href="https://code.visualstudio.com/"
                        cta="Download VSCode for your OS"
                    >
                        <Prose>
                            Back in my .NET days I used Visual Studio proper and
                            swore by it. I also had brief encounters with a few
                            variants of Eclipse and tried out the IntelliJ IDEs
                            when I built Android apps, and XCode for the odd iOS
                            app.
                        </Prose>
                        <Prose className="mt-4">
                            When I finally switched to NodeJS I found myself
                            using VSCode all day long and eventually got rid of
                            everything else. I even use it to write the posts on
                            this site and to take notes. It really is pretty
                            versatile.
                        </Prose>
                    </Tool>
                    <Tool
                        title="Windows Terminal"
                        href="https://apps.microsoft.com/detail/9N0DX20HK701?hl=en-US&gl=US"
                        cta="Download Windows Terminal"
                    >
                        <Prose>
                            It&apos;s open source, it&apos;s fast, it&apos;s
                            customizable, and it has tabs. What more could you
                            want? Oh yeah, and it can tile your terminals in a
                            grid, just like the OS does with your windows.
                        </Prose>
                        <Prose className="mt-4">
                            I jump from the standard Windows command prompt to
                            PowerShell to WSL all the time so having a single
                            app that can handle all of them is a huge win.
                        </Prose>
                    </Tool>
                    <Tool
                        title="Navicat Premium"
                        href="https://www.navicat.com/en/products/navicat-premium-feature-matrix"
                        cta="View the Feature Matrix"
                    >
                        <Prose>
                            This one is kinda pricey but it&apos;s definitely
                            worth it. It talks to pretty much any database you
                            can think of: Posgtres, MySQL, MSSQL Server, Oracle,
                            SQLite, MongoDB, Redis. It has specialized
                            connection profiles for all the top managed cloud DB
                            providers, too.
                        </Prose>
                        <Prose className="mt-4">
                            The UI is nice and clean and. The Modeling,
                            Import/Export and Data Transfer, Schema
                            Introspection, and CHarts features are all super
                            useful. It&apos;s available for Windows, Mac, and
                            Linux, which is rare for such a complete DB client.
                        </Prose>
                        <Prose className="mt-4">
                            They do have a Lifetime license option so if
                            you&apos;re not put off by the price tag, it&apos;s
                            a great deal.
                        </Prose>
                    </Tool>
                </ToolsSection>

                {/* <ToolsSection title="Productivity">
                    <Tool title="Alfred">
                        It’s not the newest kid on the block but it’s still the
                        fastest. The Sublime Text of the application launcher
                        world.
                    </Tool>
                    <Tool title="Reflect">
                        Using a daily notes system instead of trying to keep
                        things organized by topics has been super powerful for
                        me. And with Reflect, it’s still easy for me to keep all
                        of that stuff discoverable by topic even though all of
                        my writing happens in the daily note.
                    </Tool>
                    <Tool title="SavvyCal">
                        Great tool for scheduling meetings while protecting my
                        calendar and making sure I still have lots of time for
                        deep work during the week.
                    </Tool>
                    <Tool title="Focus">
                        Simple tool for blocking distracting websites when I
                        need to just do the work and get some momentum going.
                    </Tool>
                </ToolsSection> */}

                <ToolsSection title="Workstation">
                    <Tool
                        title="ASUS ROG Zephyrus Laptop, 40GB RAM"
                        href="https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-m15-series/spec/"
                        cta="View Specs"
                    >
                        <Prose>
                            Tim Cook would have you believe that you absolutely
                            need a Mac to do serious work. I’m here to tell you
                            that’s not true. This is the best laptop I’ve ever
                            owned, running on close to 4 years now and still
                            going strong.
                        </Prose>
                        <Prose className="mt-4">
                            4K video @ 60fps? No problem! Graphics editing and
                            video rendering? A breeze! 40 browser tabs open?
                            Easy!. DB servers and Docker containers? I&apos;ve
                            lost count of how many I&apos;m running by now!
                        </Prose>
                        <Prose className="mt-4">
                            I love this thing. I upgraded the RAM to 40GB and
                            the NVMe to 2TB and it’s been a beast ever since.
                            Take that Apple!
                        </Prose>
                    </Tool>
                    <Tool title="2 x DELL SE2719H FullHD IPS Displays">
                        <Prose>
                            They don&apos;t make these anymore but I&apos;ve
                            found that you don&apos;t really need fancy 4K
                            displays to build software.
                        </Prose>
                        <Prose className="mt-4">
                            I&apos;ve got two of these side by side and they get
                            the job done just fine. I&apos;ll probably upgrade
                            to a 4K display at some point but I&apos;m in no
                            rush.
                        </Prose>
                    </Tool>
                </ToolsSection>
            </div>
        </SimpleLayout>
    );
}
