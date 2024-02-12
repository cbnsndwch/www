import clsx from 'clsx';
import Script from 'next/script';

export type GhlCalendarProps = {
    id: string;
    link: string;
    className?: string;
};

export default function GhlCalendar({
    id,
    link,
    className = '',
}: GhlCalendarProps) {
    return (
        <div className="w-full grow h-full">
            <iframe
                id={id}
                src={link}
                className={className}
                style={{
                    width: '100%',
                    minHeight: 800,
                    border: 'none',
                    overflow: 'hidden',
                    background: 'transparent',
                }}
                scrolling="no"
            ></iframe>

            <Script src="https://link.1nationup.com/js/form_embed.js"></Script>
        </div>
    );
}
