import Page, { metadata } from '@/app/services/ghl-dev-partner/page';
import { toMetaDescriptors } from '@/lib/content/metadata';

export function meta() {
    return toMetaDescriptors(metadata);
}

export default Page;
