import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { insertComponentSchema, components } from "@/lib/db/schema/components";

export async function POST(req: Request, res: Response) {
    try {
        const { name, type, props, styles, has_children } = await req.json();
        const { error }: any = insertComponentSchema.safeParse({
            name,
            type,
            props,
            styles,
            has_children,
        });
        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        const newComponent = db.insert(components).values({
            name,
            type,
            props,
            styles,
            hasChildren: has_children,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
