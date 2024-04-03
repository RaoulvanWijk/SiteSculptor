import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentTypeSchema,
    componentTypes,
} from "@/lib/db/schema/componentTypes";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { name, description } = await req.json();
        const { error }: any = insertComponentTypeSchema.safeParse({
            name,
            description,
        });
        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        const newComponentType = db.insert(componentTypes).values({
            name,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
