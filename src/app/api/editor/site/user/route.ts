import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const userId: any = request.nextUrl.searchParams.get("userId");

        const site = await db
            .select()
            .from(sites)
            .where(eq(sites.ownerId, userId))
            .execute();
        // show site
        return new NextResponse(JSON.stringify(site), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
