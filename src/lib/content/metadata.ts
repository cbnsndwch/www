/**
 * The subset of Next's `Metadata` shape the site actually used.
 *
 * Pages keep exporting this object; route modules translate it into React
 * Router `meta()` descriptors via `toMetaDescriptors`.
 */
export type Metadata = {
    title?: string;
    description?: string;
    openGraph?: {
        title?: string;
        description?: string;
        type?: string;
        images?: Array<{
            url: string;
            width?: number;
            height?: number;
            alt?: string;
        }>;
    };
    twitter?: {
        card?: string;
        title?: string;
        description?: string;
        images?: string[];
    };
};

export type MetaDescriptor = Record<string, unknown>;

const SITE_NAME = 'Sergio Leon';

/**
 * Translate a page's metadata into React Router meta descriptors.
 */
export function toMetaDescriptors(metadata: Metadata): MetaDescriptor[] {
    const out: MetaDescriptor[] = [];
    const title = metadata.title
        ? `${metadata.title} - ${SITE_NAME}`
        : SITE_NAME;

    out.push({ title });

    if (metadata.description) {
        out.push({ name: 'description', content: metadata.description });
    }

    const og = metadata.openGraph;
    out.push({ property: 'og:title', content: og?.title ?? title });

    if (og?.description ?? metadata.description) {
        out.push({
            property: 'og:description',
            content: og?.description ?? metadata.description
        });
    }

    out.push({ property: 'og:type', content: og?.type ?? 'website' });

    const ogImage = og?.images?.[0];
    if (ogImage) {
        out.push({ property: 'og:image', content: ogImage.url });

        if (ogImage.width) {
            out.push({
                property: 'og:image:width',
                content: String(ogImage.width)
            });
        }

        if (ogImage.height) {
            out.push({
                property: 'og:image:height',
                content: String(ogImage.height)
            });
        }

        if (ogImage.alt) {
            out.push({ property: 'og:image:alt', content: ogImage.alt });
        }
    }

    const twitter = metadata.twitter;
    out.push({
        name: 'twitter:card',
        content: twitter?.card ?? 'summary_large_image'
    });

    if (twitter?.title ?? title) {
        out.push({ name: 'twitter:title', content: twitter?.title ?? title });
    }

    const twitterImage = twitter?.images?.[0] ?? ogImage?.url;
    if (twitterImage) {
        out.push({ name: 'twitter:image', content: twitterImage });
    }

    return out;
}
