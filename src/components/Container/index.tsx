import { forwardRef } from 'react';

import ContainerOuter from './Outer';
import ContainerInner from './Inner';

export const Container = forwardRef<
    React.ElementRef<typeof ContainerOuter>,
    React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function Container({ children, ...props }, ref) {
    return (
        <ContainerOuter ref={ref} {...props}>
            <ContainerInner>{children}</ContainerInner>
        </ContainerOuter>
    );
});
