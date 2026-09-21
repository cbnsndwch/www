import { forwardRef } from 'react';

import ContainerInner from './Inner';
import ContainerOuter from './Outer';

const Container = forwardRef<
    React.ElementRef<typeof ContainerOuter>,
    React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function Container({ children, ...props }, ref) {
    return (
        <ContainerOuter ref={ref} {...props}>
            <ContainerInner>{children}</ContainerInner>
        </ContainerOuter>
    );
});

export default Container;
