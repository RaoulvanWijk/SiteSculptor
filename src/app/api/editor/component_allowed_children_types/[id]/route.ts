import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentAllowedChildrenTypeSchema,
    componentAllowedChildrenTypes,
} from "@/lib/db/schema/componentAllowedChildrenTypes";
import { eq } from "drizzle-orm";
import { useSession } from "next-auth/react";

export async function GET(
    req: NextRequest,
    res: NextResponse,
    { params }: any
) {
    try {
        const id: any = params.id;
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
