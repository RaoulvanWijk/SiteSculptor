import { NextRequest, NextResponse } from "next/server";
import { footers } from "@/lib/db/schema/footers";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const response = await db.select().from(footers).execute();
        return new NextResponse(JSON.stringify(response), {
            status: 200,
        });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}
