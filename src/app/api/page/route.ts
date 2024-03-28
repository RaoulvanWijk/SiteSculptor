import { db } from "@/lib/db/index";
import { pages } from "@/lib/db/schema/pages";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const allPages = await db.select().from(pages).execute();
    // show all pages
    return new Response(JSON.stringify(allPages), { status: 200 });
}
