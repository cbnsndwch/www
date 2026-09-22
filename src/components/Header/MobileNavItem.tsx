import { Popover } from '@headlessui/react';
import { PropsWithChildren } from 'react';

import { Link } from '@/components/primitives';

type MobileNavItemProps = PropsWithChildren<{
    href: string;
}>;

export default function MobileNavItem({ href, children }: MobileNavItemProps) {
    return (
        <li>
            <Popover.Button as={Link} href={href} className="block py-2">
                {children}
            </Popover.Button>
        </li>
    );
}
