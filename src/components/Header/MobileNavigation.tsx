import { ComponentPropsWithoutRef, Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react';

import CloseIcon from './CloseIcon';
import MobileNavItem from './MobileNavItem';
import ChevronDownIcon from './ChevronDownIcon';

export default function MobileNavigation(
    props: ComponentPropsWithoutRef<typeof Popover>
) {
    return (
        <Popover {...props}>
            <Popover.Button className="group flex items-center rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/10 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
                Menu
                <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-600 group-hover:stroke-zinc-800 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
                    >
                        <div className="flex flex-row-reverse items-center justify-between">
                            <Popover.Button
                                aria-label="Close menu"
                                className="-m-1 p-1"
                            >
                                <CloseIcon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </Popover.Button>
                            <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
                                Navigation
                            </h2>
                        </div>
                        <nav className="mt-6">
                            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                                <MobileNavItem href="/about">
                                    About
                                </MobileNavItem>
                                <MobileNavItem href="/posts">
                                    Posts
                                </MobileNavItem>
                                <MobileNavItem href="/projects">
                                    Open Source
                                </MobileNavItem>
                                <MobileNavItem href="/miami">
                                    Miami Hub
                                </MobileNavItem>
                                {/* <MobileNavItem href="/speaking">
                                    Speaking
                                </MobileNavItem> */}
                            </ul>
                        </nav>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
}
