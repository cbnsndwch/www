'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';

interface LightboxProps {
    images: any[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    const showNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const showPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, showNext, showPrev]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
            onClick={onClose}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 cursor-auto"
                aria-label="Close lightbox"
            >
                <X className="h-6 w-6" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                }}
                className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-6 cursor-auto"
                aria-label="Previous image"
            >
                <ChevronLeft className="h-8 w-8" />
            </button>

            <div
                className="relative h-[80vh] w-[90vw] animate-in zoom-in-95 duration-300 cursor-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={images[currentIndex]}
                    alt={`Community moment ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                }}
                className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-6 cursor-auto"
                aria-label="Next image"
            >
                <ChevronRight className="h-8 w-8" />
            </button>

            <div className="absolute bottom-6 text-sm text-zinc-400 pointer-events-none">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}

export function CommunityGallery({ images }: { images: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const openLightbox = (index: number) => {
        setActiveIndex(index);
        setIsOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
                    >
                        <Image
                            src={image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </button>
                ))}
            </div>

            <Lightbox
                images={images}
                initialIndex={activeIndex}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}

export function FeaturedPhotos({ images }: { images: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    let rotations = [
        'rotate-2',
        '-rotate-2',
        'rotate-2',
        'rotate-2',
        '-rotate-2'
    ];

    const openLightbox = (index: number) => {
        setActiveIndex(index);
        setIsOpen(true);
    };

    return (
        <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {images.slice(0, 6).map((image, index) => (
                    <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className={clsx(
                            'group relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl cursor-pointer',
                            rotations[index % rotations.length]
                        )}
                    >
                        <Image
                            src={image}
                            alt=""
                            fill
                            sizes="(min-width: 640px) 18rem, 11rem"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            unoptimized
                        />
                    </button>
                ))}
            </div>

            <Lightbox
                images={images}
                initialIndex={activeIndex}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
}
