import { NextResponse } from "next/server";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./const/routes";
import { auth } from "./lib/auth";


// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    if (!isLoggedIn) {
        //if not logged in and trying to access /dashboard redirect to login

        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))

    }
    if (isLoggedIn) {
        //if logged in and trying to acces /login redirect to dashboard
        if (nextUrl.pathname === "/") {
            return Response.redirect(new URL("/dashboard", nextUrl))
        }
    }
    Response.redirect(nextUrl)
});


export const config = {
    matcher: [
        "/dashboard/:path*",

    ],
};