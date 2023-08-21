import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                // email: {
                //     label: "email",
                //     type: "text",
                //     placeholder: "johndoe@example.com",
                // },
                // password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) return null;

                console.log("credentials", credentials);
                const { email } = credentials as Pick<User, "email">;

                const user: User = {
                    id: "astro-dev",
                    name: "Astro Dev",
                    email,
                    image: "https://www.datocms-assets.com/85254/1667811959-astro.jpeg",
                };

                console.log("auth", user);

                if (!user) throw new Error("Invalid credentials");

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
