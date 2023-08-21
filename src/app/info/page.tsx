"use client";

import { Posts, Timeline, UserCard } from "@/components/info";

import { Breadcrumbs } from "@/components/global/breadcrumbs";
import { Error } from "@/components/global/error";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Info() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signin?callbackUrl=/info");
        },
    });

    if (!session) return <Error />;

    return (
        <section className="flex flex-col gap-4 md:gap-8">
            <Breadcrumbs index="Client" subIndex="Info" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-4">
                <UserCard session={session!} />

                <Timeline />
            </div>

            <Posts />
        </section>
    );
}
