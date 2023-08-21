/* eslint-disable @next/next/no-img-element */

import type { Session } from "next-auth";

export const UserCard = ({ session }: { session: Session }) => {
    return (
        <div className="flex items-center justify-center w-full px-4 py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center">
                <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={
                        session?.user?.image
                            ? session?.user?.image
                            : "https://www.datocms-assets.com/85254/1667812962-githubcommunity.jpeg"
                    }
                    alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {session?.user?.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {session?.user?.email}
                </span>
            </div>
        </div>
    );
};
