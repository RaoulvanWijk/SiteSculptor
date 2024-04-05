import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    pageComponents,
    insertPageComponentSchema,
} from "@/lib/db/schema/pageComponents";

export async function POST(request: NextRequest) {
    try {
        const { pageId, component_id, parent_id, index, props, styles } =
            await request.json();

        const { error }: any = insertPageComponentSchema.safeParse({
            pageId,
            component_id,
            parent_id,
            index,
            props,
            styles,
        });

        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        const newPageComponent = await db
            .insert(pageComponents)
            .values({
                pageId,
                component_id,
                parent_id,
                index,
                props,
                styles,
            })
            .execute();
        // create a new page component
        return new NextResponse(JSON.stringify(newPageComponent), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
