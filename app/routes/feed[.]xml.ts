import { Feed } from 'feed';

import { getAllPosts } from '@/lib/posts/content';

const SITE_URL = 'https://www.cbnsndwch.io';
const AUTHOR = { name: 'Sergio Leon', email: 'hello@cbnsndwch.io' };

export async function loader() {
    const feed = new Feed({
        title: AUTHOR.name,
        description:
            'Writing on software, startups, company building, and multiculturalism.',
        author: AUTHOR,
        id: `${SITE_URL}/`,
        link: `${SITE_URL}/`,
        image: `${SITE_URL}/favicon.ico`,
        favicon: `${SITE_URL}/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}`,
        feedLinks: { rss2: `${SITE_URL}/feed.xml` }
    });

    for (const post of getAllPosts()) {
        const url = `${SITE_URL}/posts/${post.slug}`;

        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.description,
            author: [{ name: post.author }],
            date: new Date(post.date)
        });
    }

    return new Response(feed.rss2(), {
        headers: {
            'content-type': 'application/xml',
            'cache-control': 'public, max-age=3600'
        }
    });
}
