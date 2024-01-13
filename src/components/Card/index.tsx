import clsx from 'clsx';

import CardCta from './CardCta';
import CardDescription from './CardDescription';
import CardEyebrow from './CardEyebrow';
import CardTitle from './CardTitle';
import CardLink from './CardLink';

export default function Card<T extends React.ElementType = 'div'>({
    as,
    className,
    children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
    as?: T;
    className?: string;
}) {
    let Component = as ?? 'div';

    return (
        <Component
            className={clsx(
                className,
                'group relative flex flex-col items-start',
            )}
        >
            {children}
        </Component>
    );
}

Card.Cta = CardCta;
Card.Description = CardDescription;
Card.Eyebrow = CardEyebrow;
Card.Link = CardLink;
Card.Title = CardTitle;
