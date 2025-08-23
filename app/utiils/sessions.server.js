import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_session",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: ["secret"],
        secure: true,
    },
});

export const { getSession, commitSession, destroySession } = sessionStorage;