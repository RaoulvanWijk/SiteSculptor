import { db } from "@/lib/db/index";
import { sites } from "@/lib/db/schema/sites";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    const site = await db
        .select()
        .from(sites)
        .where(eq(sites.ownerId, params.userId))
        .execute();
    // show site
    return new NextResponse(JSON.stringify(site), { status: 200 });
}
