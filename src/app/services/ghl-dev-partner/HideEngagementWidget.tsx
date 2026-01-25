'use client';

import { useEffect } from 'react';

/**
 * Hides the Engagement Widget on this page using the ChatHQ JavaScript API.
 * Polls for the API to become available since the widget loads lazily.
 * @see https://docs.chathq.io/api-and-developer-docs/javascript-api
 */
export default function HideEngagementWidget() {
    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null;
        let isHidden = false;

        const tryHideWidget = () => {
            const api = window.EngagementWidget?.api;
            if (api?.hideWidget) {
                api.hideWidget();
                isHidden = true;
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }
        };

        // Try immediately in case it's already loaded
        tryHideWidget();

        // If not available yet, poll every 100ms
        if (!isHidden) {
            intervalId = setInterval(tryHideWidget, 100);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            // Show widget again when leaving the page
            const api = window.EngagementWidget?.api;
            if (api?.showWidget && isHidden) {
                api.showWidget();
            }
        };
    }, []);

    return null;
}
