import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { insertComponentSchema, components } from "@/lib/db/schema/components";

export async function POST(req: Request, res: Response) {
    try {
        const { name, type, props, styles, hasChildren } = await req.json();

        const { error }: any = insertComponentSchema.safeParse({
            name,
            type,
            props,
            styles,
            hasChildren,
        });
        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        const newComponent = await db.insert(components).values({
            type,
            name,
            props,
            styles,
            hasChildren,
        });
        return new NextResponse(JSON.stringify(newComponent), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
