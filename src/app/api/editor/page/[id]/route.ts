import { db } from "@/lib/db/index";
import { pages } from "@/lib/db/schema/pages";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest, { params }: any) {
    try {
        const id: any = params.id;

        const idPages = await db
            .select()
            .from(pages)
            .where(eq(pages.id, id))
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
