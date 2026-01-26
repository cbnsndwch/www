import fs from 'fs';
import path from 'path';
import https from 'https';
import { config } from 'dotenv';

config({ path: '.env.local' });

let apiKey = process.env.PRIVATE_X_API_KEY;

if (!apiKey) {
    console.error(
        'Error: PRIVATE_X_API_KEY not found in environment or .env.local'
    );
    process.exit(1);
}

const TWEET_ID = '2009011798973010271';

async function fetchTweet(id) {
    const url = new URL(`https://api.x.com/2/tweets/${id}`);

    const params = {
        'tweet.fields':
            'conversation_id,author_id,created_at,text,referenced_tweets,attachments,note_tweet',
        expansions: 'author_id,attachments.media_keys,referenced_tweets.id',
        'media.fields': 'url,preview_image_url,alt_text,type',
        'user.fields': 'name,username,profile_image_url'
    };

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    return makeRequest(url);
}

async function fetchUserTimeline(userId, conversationId) {
    const url = new URL(`https://api.x.com/2/users/${userId}/tweets`);

    // We fetch the user's recent tweets and will filter them manually by conversation_id
    // This circumvents the 7-day limit of the search/recent endpoint
    const params = {
        max_results: 100,
        exclude: 'retweets', // We want replies and original tweets, just not retweets
        'tweet.fields':
            'conversation_id,author_id,created_at,text,referenced_tweets,attachments,note_tweet',
        expansions: 'attachments.media_keys',
        'media.fields': 'url,preview_image_url,alt_text,type'
    };

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    return makeRequest(url);
}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(
            url,
            {
                headers: {
                    Authorization: apiKey,
                    'Content-Type': 'application/json'
                }
            },
            res => {
                let data = '';
                res.on('data', chunk => (data += chunk));
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        if (res.statusCode !== 200) {
                            resolve({ error: json });
                            return;
                        }
                        resolve(json);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        );

        req.on('error', reject);
    });
}

async function main() {
    console.log(`Fetching root tweet ${TWEET_ID}...`);
    try {
        const rootTweet = await fetchTweet(TWEET_ID);

        if (rootTweet.error) {
            console.error(
                'Error fetching root tweet:',
                JSON.stringify(rootTweet.error, null, 2)
            );
            return;
        }

        const conversationId = rootTweet.data.conversation_id;
        const authorId = rootTweet.data.author_id;

        console.log(`Conversation ID: ${conversationId}`);
        console.log(`Author ID: ${authorId}`);
        console.log(`Date: ${rootTweet.data.created_at}`);

        // Check if tweet is older than 7 days (approx check)
        const tweetDate = new Date(rootTweet.data.created_at);
        const now = new Date();
        const diffDays = (now - tweetDate) / (1000 * 60 * 60 * 24);

        let threadTweets = [rootTweet.data];
        let allMedia = rootTweet.includes?.media || [];
        let allUsers = rootTweet.includes?.users || [];

        if (diffDays > 6) {
            console.log(
                `Tweet is ${Math.round(diffDays)} days old. Using User Timeline strategy...`
            );

            const timeline = await fetchUserTimeline(authorId, conversationId);

            if (timeline.data) {
                // Filter for tweets in this conversation
                // Note: Timeline returns tweets in reverse chronological order (newest first)
                const replies = timeline.data.filter(
                    t =>
                        t.conversation_id === conversationId &&
                        t.id !== TWEET_ID // Exclude root if it appears
                );

                // Sort chronological
                replies.sort((a, b) => a.id.localeCompare(b.id)); // String comparison for IDs works for chronological

                threadTweets.push(...replies);

                if (timeline.includes?.media) {
                    allMedia.push(...timeline.includes.media);
                }
            } else if (timeline.error) {
                console.error(
                    'Error fetching timeline:',
                    JSON.stringify(timeline.error)
                );
            }
        } else {
            console.log(
                'Tweet is recent. Search strategy would provide better resolution, but using root only for now.'
            );
        }

        // Deduplicate media
        const uniqueMedia = Array.from(
            new Map(allMedia.map(m => [m.media_key, m])).values()
        );

        const result = {
            thread: threadTweets,
            media: uniqueMedia,
            users: allUsers // Root tweet users is usually sufficient for author info
        };

        // Output just JSON for clean consumption
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Failed:', error.message);
    }
}

main();
