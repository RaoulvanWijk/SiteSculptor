import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { db } from "@/lib/db/index";
import { sessions } from "./lib/db/schema/auth";
const { headers, cookies } = require("next/headers");

export default withAuth(
    function middleware(request: NextRequest) {
        if (process.env.CODE_ENV === "test") {
            console.log("API routes are disabled for this environment");
            const host = process.env.NEXTAUTH_URL;
            // return NextResponse.error(new Error('API routes are disabled for this environment'));
            if (
                request.url.startsWith(host + "/api") ||
                request.url.startsWith(host + "/app") ||
                request.url.startsWith(host + "/editor")
            ) {
                return NextResponse.json(
                    { error: "routes are disabled for this environment" },
                    { status: 403 }
                );
            }
        }

        // Store current request url in a custom header, which you can read later
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-url", request.url);

        return NextResponse.next({
            request: {
                // Apply new request headers
                headers: requestHeaders,
            },
        });
    },
    {
        callbacks: {
            authorized: async (x) => {
                return true;
            },
        },
        pages: {
            error: "/404",
        },
    }
);

export const config = { matcher: ["/api/editor/:path*"] };
