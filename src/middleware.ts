import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getValidSubdomain } from "@/utils/subdomain";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: Request, response: Response) {
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

    const url = new URL(request.url);

    // Skip public files
    if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next"))
        return;

    const host = request.headers.get("host");
    const subdomain = getValidSubdomain(host);
    if (subdomain) {
        const home = new URL(`http://${subdomain}.localhost:3000/home`);
        // Store subdomain in a custom header, which you can read later
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-subdomain", subdomain);

        if (
            url.pathname.includes("/app") ||
            url.pathname.includes("/editor") ||
            url.pathname.includes("/sign-in") ||
            url.pathname.includes("/login")
        ) {
            // redirect to the home page
            return NextResponse.redirect(home, { status: 301 });
        }

        return NextResponse.next({
            request: {
                // Apply new request headers
                headers: requestHeaders,
            },
        });
    }
    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    // make sure the default app files cannot be accessed

    return NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        },
    });
}
