import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { sites } from "@/lib/db/schema/sites";
import validateSession from "@/lib/checkSession";

export async function GET(request: NextRequest, { params }: any) {
    try {
        const sesh = await validateSession();
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const id: any = params.id;
        // get all the site info
        const idSites = await db
            .select()
            .from(sites)
            .where(eq(sites.id, id))
            .execute();
        // show all page components
        return new NextResponse(JSON.stringify(idSites), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
