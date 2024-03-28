import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { pageComponents } from "@/lib/db/schema/pageComponents";
import { eq } from "drizzle-orm";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const allPageComponents = await db
            .select()
            .from(pageComponents)
            .where(eq(pageComponents.page_id, params.id))
            .execute();
        // show all page components
        return new NextResponse(JSON.stringify(allPageComponents), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
