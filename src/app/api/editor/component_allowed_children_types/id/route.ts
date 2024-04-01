import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentAllowedChildrenTypeSchema,
    componentAllowedChildrenTypes,
} from "@/lib/db/schema/componentAllowedChildrenTypes";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const id: any = req.nextUrl.searchParams.get("id");
        const idComponentAllowedChildrenTypes = await db
            .select()
            .from(componentAllowedChildrenTypes)
            .where(eq(componentAllowedChildrenTypes.id, id))
            .execute();
        return new NextResponse(
            JSON.stringify(idComponentAllowedChildrenTypes),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
