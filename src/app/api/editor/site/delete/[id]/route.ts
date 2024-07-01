import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { sites } from "@/lib/db/schema/sites";
import validateSession from "@/lib/checkSession";

export async function DELETE(request: NextRequest, { params }: any) {
    // check if user is logged in
    try {
        const sesh = await validateSession();
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const id: any = params.id;
        // delete the site
        const res = await db.delete(sites).where(eq(sites.id, id)).execute();
        return new NextResponse(JSON.stringify({ message: "Site deleted" }), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
