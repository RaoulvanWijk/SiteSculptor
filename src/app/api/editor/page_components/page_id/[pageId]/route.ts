import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { pageComponents } from "@/lib/db/schema/pageComponents";
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
        const id: any = params.pageId;
        const idPageComponents = await db
            .select()
            .from(pageComponents)
            .where(eq(pageComponents.page_id, id))
            .execute();
        // show all page components
        return new NextResponse(JSON.stringify(idPageComponents), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
