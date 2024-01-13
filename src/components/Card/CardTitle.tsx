import CardLink from './CardLink';

export type CardTitleProps<T extends React.ElementType = 'h2'> = {
    as?: T;
    href?: string;
    newTab?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'href'>;

export default function CardTitle<T extends React.ElementType = 'h2'>({
    as,
    href,
    newTab,
    children,
}: CardTitleProps<T>) {
    let Component = as ?? 'h2';

    return (
        <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            {href ? (
                <CardLink href={href} {...(newTab ? { target: '_blank' } : {})}>
                    {children}
                </CardLink>
            ) : (
                children
            )}
        </Component>
    );
}
