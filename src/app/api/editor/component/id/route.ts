import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { insertComponentSchema, components } from "@/lib/db/schema/components";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const id: any = req.nextUrl.searchParams.get("id");

        const idComponents = await db
            .select()
            .from(components)
            .where(eq(components.id, id))
            .execute();
        return new NextResponse(JSON.stringify(idComponents), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
