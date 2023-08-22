import { Posts, Related } from "@/components/blog";

import { Breadcrumbs } from "@/components/global/breadcrumbs";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Blog() {
    const session = await getServerSession(authOptions);

    console.log("SESSION__", session);

    if (!session) redirect("/signin?callbackUrl=/blog");

    return (
        <section className="flex flex-col gap-4 md:gap-8">
            <Breadcrumbs index="Server" subIndex="Blog" />

            <Posts />

            <Related />
        </section>
    );
}
