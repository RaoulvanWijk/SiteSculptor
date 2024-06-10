import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    // check if user is logged in

    try {
        const allSites = await db.select().from(sites).execute();
        // show all sites
        return new NextResponse(JSON.stringify(allSites), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
