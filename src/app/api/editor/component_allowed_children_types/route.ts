import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentAllowedChildrenTypeSchema,
    componentAllowedChildrenTypes,
} from "@/lib/db/schema/componentAllowedChildrenTypes";
import { useSession } from "next-auth/react";

export async function GET(req: NextRequest, res: NextResponse) {
    // check if user is logged in
    const { data: session } = useSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const allComponentAllowedChildrenTypes = await db
            .select()
            .from(componentAllowedChildrenTypes)
            .execute();
        return new NextResponse(
            JSON.stringify(allComponentAllowedChildrenTypes),
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
