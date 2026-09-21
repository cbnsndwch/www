'use client';

import { usePathname } from 'next/navigation';
import { type CSSProperties, type ElementRef, useEffect, useRef } from 'react';

import Container from '@/components/Container';

import Avatar from './Avatar';
import AvatarContainer from './AvatarContainer';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import ThemeToggle from './ThemeToggle';

function clamp(number: number, a: number, b: number) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.min(Math.max(number, min), max);
}

export default function Header() {
    const isHomePage = usePathname() === '/';

    const headerRef = useRef<ElementRef<'div'>>(null);
    const avatarRef = useRef<ElementRef<'div'>>(null);
    const isInitial = useRef(true);

    useEffect(() => {
        const downDelay = avatarRef.current?.offsetTop ?? 0;
        const upDelay = 64;

        function setProperty(property: string, value: string) {
            document.documentElement.style.setProperty(property, value);
        }

        function removeProperty(property: string) {
            document.documentElement.style.removeProperty(property);
        }

        function updateHeaderStyles() {
            if (!headerRef.current) {
                return;
            }

            const { top, height } = headerRef.current.getBoundingClientRect();
            const scrollY = clamp(
                window.scrollY,
                0,
                document.body.scrollHeight - window.innerHeight
            );

            if (isInitial.current) {
                setProperty('--header-position', 'sticky');
            }

            setProperty('--content-offset', `${downDelay}px`);

            if (isInitial.current || scrollY < downDelay) {
                setProperty('--header-height', `${downDelay + height}px`);
                setProperty('--header-mb', `${-downDelay}px`);
            } else if (top + height < -upDelay) {
                const offset = Math.max(height, scrollY - upDelay);
                setProperty('--header-height', `${offset}px`);
                setProperty('--header-mb', `${height - offset}px`);
            } else if (top === 0) {
                setProperty('--header-height', `${scrollY + height}px`);
                setProperty('--header-mb', `${-scrollY}px`);
            }

            if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
                setProperty('--header-inner-position', 'fixed');
                removeProperty('--header-top');
                removeProperty('--avatar-top');
            } else {
                removeProperty('--header-inner-position');
                setProperty('--header-top', '0px');
                setProperty('--avatar-top', '0px');
            }
        }

        function updateAvatarStyles() {
            if (!isHomePage) {
                return;
            }

            const fromScale = 1;
            const toScale = 36 / 64;
            const fromX = 0;
            const toX = 2 / 16;

            const scrollY = downDelay - window.scrollY;

            let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
            scale = clamp(scale, fromScale, toScale);

            let x = (scrollY * (fromX - toX)) / downDelay + toX;
            x = clamp(x, fromX, toX);

            setProperty(
                '--avatar-image-transform',
                `translate3d(${x}rem, 0, 0) scale(${scale})`
            );

            const borderScale = 1 / (toScale / scale);
            const borderX = (-toX + x) * borderScale;
            const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

            setProperty('--avatar-border-transform', borderTransform);
            setProperty(
                '--avatar-border-opacity',
                scale === toScale ? '1' : '0'
            );
        }

        function updateStyles() {
            updateHeaderStyles();
            updateAvatarStyles();
            isInitial.current = false;
        }

        updateStyles();
        window.addEventListener('scroll', updateStyles, { passive: true });
        window.addEventListener('resize', updateStyles);

        return () => {
            window.removeEventListener('scroll', updateStyles);
            window.removeEventListener('resize', updateStyles);
        };
    }, [isHomePage]);

    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-none flex-col"
                style={{
                    height: 'var(--header-height)',
                    marginBottom: 'var(--header-mb)'
                }}
            >
                {isHomePage && (
                    <>
                        <div
                            ref={avatarRef}
                            className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
                        />
                        <Container
                            className="top-0 order-last -mb-3 pt-3"
                            style={{
                                position:
                                    'var(--header-position)' as CSSProperties['position']
                            }}
                        >
                            <div
                                className="top-(--avatar-top,--spacing(3)) w-full"
                                style={{
                                    position:
                                        'var(--header-inner-position)' as CSSProperties['position']
                                }}
                            >
                                <div className="relative">
                                    <AvatarContainer
                                        className="absolute left-0 top-3 origin-left transition-opacity"
                                        style={{
                                            opacity:
                                                'var(--avatar-border-opacity, 0)',
                                            transform:
                                                'var(--avatar-border-transform)'
                                        }}
                                    />
                                    <Avatar
                                        large
                                        className="block h-16 w-16 origin-left"
                                        style={{
                                            transform:
                                                'var(--avatar-image-transform)'
                                        }}
                                    />
                                </div>
                            </div>
                        </Container>
                    </>
                )}
                <div
                    ref={headerRef}
                    className="top-0 z-10 h-16 pt-6"
                    style={{
                        position:
                            'var(--header-position)' as CSSProperties['position']
                    }}
                >
                    <Container
                        className="top-(--header-top,--spacing(6)) w-full"
                        style={{
                            position:
                                'var(--header-inner-position)' as CSSProperties['position']
                        }}
                    >
                        <div className="relative flex gap-4">
                            <div className="flex flex-1">
                                {!isHomePage && (
                                    <AvatarContainer>
                                        <Avatar />
                                    </AvatarContainer>
                                )}
                            </div>
                            <div className="flex flex-1 justify-end md:justify-center">
                                <MobileNavigation className="pointer-events-auto md:hidden" />
                                <DesktopNavigation className="pointer-events-auto hidden md:block" />
                            </div>
                            <div className="flex justify-end md:flex-1">
                                <div className="pointer-events-auto">
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            {isHomePage && (
                <div
                    className="flex-none"
                    style={{ height: 'var(--content-offset)' }}
                />
            )}
        </>
    );
}
