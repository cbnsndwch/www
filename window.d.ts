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
    EngagementWidget: EngagementWidgetDOM;
}
