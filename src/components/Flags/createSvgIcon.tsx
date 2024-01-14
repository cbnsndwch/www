import { ForwardedRef, forwardRef, memo, ReactNode, SVGProps } from 'react';

export default function createSvgIcon(
    contents: ReactNode,
    displayName: string,
    viewBox = '0 0 24 24',
) {
    function Component(props: SVGProps<SVGSVGElement>, ref: ForwardedRef<any>) {
        return (
            <svg
                ref={ref}
                width="28"
                height="28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-testid={`${displayName}Icon`}
                viewBox={viewBox}
                {...props}
            >
                {contents}
            </svg>
        );
    }

    return memo(forwardRef(Component));
}
