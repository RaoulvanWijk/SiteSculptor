import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentTypeSchema,
    componentTypes,
} from "@/lib/db/schema/componentTypes";

export async function getComponentTypes(req: NextRequest, res: NextResponse) {
    try {
        const allComponentTypes = await db
            .select()
            .from(componentTypes)
            .execute();
        return new NextResponse(JSON.stringify(allComponentTypes), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
