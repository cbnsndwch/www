import rehypePrism from '@mapbox/rehype-prism';
import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.BUILDKIT_STEP_NAME ? 'standalone' : undefined,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
    },
});

export default withMDX(nextConfig);
