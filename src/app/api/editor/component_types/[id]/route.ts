import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentTypeSchema,
    componentTypes,
} from "@/lib/db/schema/componentTypes";
import { eq } from "drizzle-orm";
import validateSession from "@/lib/checkSession";

export async function GET(
    req: NextRequest,
    res: NextResponse,
    { params }: any
) {
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

        const idComponentTypes = await db
            .select()
            .from(componentTypes)
            .where(eq(componentTypes.id, id))
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
