import { StaticImageData } from 'next/image';

export interface GuestInfo {
    firstAppearedOn: string;
    url: string;
}

export interface PostCover {
    image?: StaticImageData;
    title?: string;
    creditUrl?: string;
}

export interface Post {
    title: string;
    description: string;
    author: string;
    authorAvatar?: StaticImageData;
    date: string;

    // Optional properties
    draft?: boolean;
    cover?: PostCover;
    tags?: string[];
    guest?: GuestInfo;

    // TEMP: DELETE THIS
    raw?: string;
}

export interface GuestPost extends Post {
    guest: GuestInfo;
}

export interface PostWithSlug extends Post {
    slug: string;
}

export function isOwnPost(post: Post) {
    return post.author === 'Sergio Leon' || post.author === 'cbnsndwch';
}

export function isGuestPost(post: Post): post is GuestPost {
    return !isOwnPost(post) && !!post.guest;
}
