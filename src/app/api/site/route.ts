import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const allSites = await db.select().from(sites).execute();
    // show all sites
    return new NextResponse(JSON.stringify(allSites), { status: 200 });
}
