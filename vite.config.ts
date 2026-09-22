import { cloudflare } from '@cloudflare/vite-plugin';
import rehypePrism from '@mapbox/rehype-prism';
import mdx from '@mdx-js/rollup';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        // `enforce: 'pre'` so MDX is compiled to JSX before the React plugin runs
        {
            enforce: 'pre',
            ...mdx({
                providerImportSource: '@mdx-js/react',
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypePrism]
            })
        },
        cloudflare({ viteEnvironment: { name: 'ssr' } }),
        tailwindcss(),
        reactRouter(),
        tsconfigPaths()
    ]
});
