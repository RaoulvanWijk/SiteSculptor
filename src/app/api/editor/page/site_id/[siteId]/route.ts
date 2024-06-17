import { db } from "@/lib/db/index";
import { pages } from "@/lib/db/schema/pages";
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
        const id: any = params.siteId;
        //get the pages for the siteId
        const idPages = await db
            .select()
            .from(pages)
            .where(eq(pages.siteId, id))
            .execute();
        return new NextResponse(JSON.stringify(idPages), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
