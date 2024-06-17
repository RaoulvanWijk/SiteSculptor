import { siteNavbars } from "@/lib/db/schema/siteNavbars";
import { db } from "@/lib/db/index";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
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
        const siteNavbarsRes = await db
            .select()
            .from(siteNavbars)
            .where(eq(siteNavbars.siteId, id))
            .execute();
        // show all page components
        return new NextResponse(JSON.stringify(siteNavbarsRes), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
