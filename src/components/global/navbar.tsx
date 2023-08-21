"use client";
/* eslint-disable @next/next/no-img-element */

import { signIn, signOut, useSession } from "next-auth/react";

import { Children } from "react";
import Link from "next/link";

const routes = [
    { route: "/", label: "Home" },
    { route: "/info", label: "Info" },
    { route: "/blog", label: "Blog" },
];

export const Navbar = () => {
    const { data: session } = useSession({
        required: false,
    });

    return (
        <header className="flex justify-between items-center border-b border-black/10 shadow-sm px-20 py-8">
            <Link
                href="/"
                className="text-4xl uppercase font-black tracking-tight leading-none text-gray-900"
            >
                Brand
            </Link>

            <nav className="flex items-center">
                <ul className="flex items-center justify-center">
                    {Children.toArray(
                        routes.map(({ route, label }) => (
                            <li className="text-sm font-semibold">
                                <Link
                                    href={route}
                                    className="capitalize p-8 cursor-pointer"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </nav>

            {session ? (
                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <img
                            className="w-10 h-10 rounded-full"
                            src={
                                session?.user?.image
                                    ? session?.user?.image
                                    : "https://www.datocms-assets.com/85254/1667812962-githubcommunity.jpeg"
                            }
                            alt={session.user?.email!}
                            loading="lazy"
                        />
                        <div className="font-medium dark:text-white">
                            <div>{session.user?.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {session.user?.email}
                            </div>
                        </div>
                    </div>

                    <button
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1 text-center "
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <button
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-red-blue focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1 text-center "
                    onClick={() => signIn()}
                >
                    Sign In
                </button>
            )}
        </header>
    );
};
