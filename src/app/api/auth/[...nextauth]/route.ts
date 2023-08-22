import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                if (!credentials) return null;

                const { email } = credentials as Pick<User, "email">;

                const user: User & { token: string } = {
                    id: "astro-dev",
                    name: "Astro Dev",
                    email,
                    thumbnail: "https://www.datocms-assets.com/85254/1667811959-astro.jpeg",
                    token: "FAKE__eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTI2NzA0ODEsImV4cCI6MTcyNDIwNjQ4MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJBc3Ryb0RldiIsImVtYWlsIjoidWtpQGxpdmUuY28udWsiLCJpZCI6ImFzdHJvLWRldiIsInJvbGUiOiJhZG1pbiIsInRodW1ibmFpbCI6Imh0dHBzOi8vd3d3LmRhdG9jbXMtYXNzZXRzLmNvbS84NTI1NC8xNjY3ODExOTU5LWFzdHJvLmpwZWcifQ.2O8ng3e63pK7NStuhHeTAWwYVk3XOMDqdQM6OHDw2Ao__TOKEN",
                };

                if (!user) throw new Error("Invalid credentials");

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                return Promise.resolve({
                    ...token,
                    ...user,
                });
            }

            return Promise.resolve(token);
        },
        async session({ session, token }: { session: any; token: any }) {
            return Promise.resolve({
                ...session,
                ...token,
            });
        },
    },
    pages: {
        signIn: "/signin",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
