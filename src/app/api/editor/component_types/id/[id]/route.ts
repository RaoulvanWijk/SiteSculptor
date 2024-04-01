import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentTypeSchema,
    componentTypes,
} from "@/lib/db/schema/componentTypes";
import { eq } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    res: NextResponse,
    params: { id: string }
) {
    try {
        const idComponentTypes = await db
            .select()
            .from(componentTypes)
            .where(eq(componentTypes.id, params.id))
            .execute();
        return new NextResponse(JSON.stringify(idComponentTypes), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
