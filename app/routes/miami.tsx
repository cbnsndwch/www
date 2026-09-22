import Page, { metadata } from '@/app/miami/page';
import { toMetaDescriptors } from '@/lib/content/metadata';

export function meta() {
    return toMetaDescriptors(metadata);
}

export default Page;
