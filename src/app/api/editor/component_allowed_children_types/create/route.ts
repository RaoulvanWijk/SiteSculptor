import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentAllowedChildrenTypeSchema,
    componentAllowedChildrenTypes,
} from "@/lib/db/schema/componentAllowedChildrenTypes";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { componentTypesId, componentId } = await req.json();
        const { error }: any =
            insertComponentAllowedChildrenTypeSchema.safeParse({
                componentTypesId,
                componentId,
            });
        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        const newComponentAllowedChildrenType = db
            .insert(componentAllowedChildrenTypes)
            .values({
                componentTypesId,
                componentId,
            });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
