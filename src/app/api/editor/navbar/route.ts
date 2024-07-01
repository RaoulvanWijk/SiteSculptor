import { NextRequest, NextResponse } from "next/server";
import { navbars } from "@/lib/db/schema/navbars";
import { db } from "@/lib/db";
import validateSession from "@/lib/checkSession";

export async function GET(request: NextRequest) {
    try {
        const sesh = await validateSession();
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const response = await db.select().from(navbars).execute();
        return new NextResponse(JSON.stringify(response), {
            status: 200,
        });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}
