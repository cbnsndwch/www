'use client';

import { useEffect, useMemo } from 'react';

export type EngagementWidgetProps = {
    /**
     * The widget ID.
     */
    widgetId: string;

    /**
     * Pass custom data here.
     */
    extras?: Record<string, unknown>;
};

export default function EngagementWidget({
    widgetId,
    extras
}: EngagementWidgetProps) {
    useEffect(() => {
        window.engagementContextExtra = Object.assign(
            window.engagementContextExtra || {},
            extras
        );
    }, [extras]);

    // TEMPORARILY DISABLED ENGAGEMENT WIDGET due to CSS issues
    // 
    // const widgetData = useMemo(
    //     () => ({
    //         'crossorigin': 1,
    //         'type': 'module',
    //         'id': 'engagementWidget',
    //         'src': 'https://cdn.chatwidgets.net/widget/livechat/bundle.js',
    //         'data-env': '//graph.mycrmsupport.net',
    //         'data-container': '#engagement-widget-container',
    //         'data-instance': widgetId,
    //     }),
    //     [widgetId],
    // );
    //
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     Object.entries(widgetData).forEach(([k, v]) =>
    //         script.setAttribute(k, `${v}`),
    //     );
    //     document.body.appendChild(script);
    // }, [widgetData]);

    return <div id="engagement-widget-container" />;
}
