/**
 * Engagement Widget JavaScript API
 * @see https://docs.chathq.io/api-and-developer-docs/javascript-api
 */
interface EngagementWidgetAPI {
    /** Completely hide the Engagement Widget (panel, FAB, and welcome messages) */
    hideWidget(): void;
    /** Show the Engagement Widget again after it's been hidden */
    showWidget(): void;
    /** Open the main Engagement Widget panel */
    openWidget(): void;
    /** Close the main Engagement Widget panel */
    closeWidget(): void;
    /** Toggle visibility of the main Engagement Widget panel */
    toggleWidget(): void;
    /** Hide all Welcome Messages */
    hideWelcomeMessages(): void;
    /** Show Welcome Messages visible again */
    showWelcomeMessages(): void;
}

interface EngagementWidgetDOM {
    api?: EngagementWidgetAPI;
}

interface Window {
    /**
     * Google Tag Manager data layer object.
     *
     * @see https://developers.google.com/tag-manager/quickstart
     * @see https://developers.google.com/tag-manager/devguide
     * @see https://developers.google.com/tag-manager/quickstart
     */
    dataLayer: any[];

    /**
     * Additional contex data for the Engagement Widget.
     */
    engagementContextExtra?: Record<string, any>;

    /**
     * Engagement widget data and API host.
     */
    EngagementWidget?: EngagementWidgetDOM;
}
