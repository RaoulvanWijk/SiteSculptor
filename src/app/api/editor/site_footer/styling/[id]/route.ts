import { siteFooters } from "@/lib/db/schema/siteFooters";
import { footers } from "@/lib/db/schema/footers";
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
            .from(siteFooters)
            .where(eq(siteFooters.siteId, id))
            .execute();
        // get the corresponding navbar
        const navbarId = siteNavbarsRes[0].footerId;
        // get the navbar
        const navbarRes = await db
            .select()
            .from(footers)
            .where(eq(footers.id, navbarId))
            .execute();

        return new NextResponse(JSON.stringify(navbarRes), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
