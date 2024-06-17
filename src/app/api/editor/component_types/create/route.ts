import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import {
    insertComponentTypeSchema,
    componentTypes,
} from "@/lib/db/schema/componentTypes";
import validateSession from "@/lib/checkSession";

export async function POST(req: NextRequest, res: NextResponse) {
    // check if user is logged in
    try {
        const sesh = await validateSession();
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }

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

        const newComponentType = await db
            .insert(componentTypes)
            .values({
                name,
            })
            .execute();
        return new NextResponse(JSON.stringify(newComponentType), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
