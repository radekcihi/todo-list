import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import db from "../db/prisma"



export const { handlers, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    secret: "topsecret",
    trustHost: true,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    // This is the secret used to encrypt the JWT.
    // It is recommended to set this value to a environment variable.
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        session: async ({ session, token, user }) => {
            if (session?.user) {
                session.user.id = String(token.uid);
            }
            return session;
        },
        jwt: async ({ user, token, session }) => {

            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: "/",

    },
    ...authConfig,
})