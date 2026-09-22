import Page, { metadata } from '@/app/services/startup-partner/page';
import { toMetaDescriptors } from '@/lib/content/metadata';

export function meta() {
    return toMetaDescriptors(metadata);
}

export default Page;
