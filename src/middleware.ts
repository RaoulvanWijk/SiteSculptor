import { NextRequest, NextResponse } from "next/server";

import { getValidSubdomain } from "@/utils/subdomain";

const PUBLIC_FILE = /\.(.*)$/;
export function middleware(request: NextRequest) {
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
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const host = request.headers.get("host");
  console.log("===============");
  console.log("host", host);
  console.log("====================================");
  const subdomain = getValidSubdomain(host);
  const searchParams = url.searchParams.toString();
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  if (subdomain) {
    console.log("====================================");
    console.log("subdomain", subdomain);
    console.log("====================================");
    const site = new URL(`/${subdomain}${pathWithSearchParams}`, request.url);
    return NextResponse.rewrite(site);
  }
  console.log("====================================");
  console.log("no subdomain", subdomain);
  console.log("====================================");

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

export const config = { };
