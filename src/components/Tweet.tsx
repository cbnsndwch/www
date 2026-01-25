'use client';

import { Tweet as ReactTweet } from 'react-tweet';

export default function Tweet({ id }: { id: string }) {
    return (
        <div className="not-prose my-10 flex justify-center">
            <ReactTweet id={id} />
        </div>
    );
}
