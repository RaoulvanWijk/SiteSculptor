import { db } from "@/lib/db/index";
import { pages, insertPageSchema } from "@/lib/db/schema/pages";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { useSession } from "next-auth/react";

export async function POST(request: NextRequest) {
    // check if user is logged in

    try {
        const { title, slug, siteId } = await request.json();
        const id = nanoid();
        const { error }: any = insertPageSchema.safeParse({
            title,
            slug,
            siteId,
        });
        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        await db
            .insert(pages)
            .values({ id: id, title, slug, siteId })
            .execute();

        return new NextResponse(JSON.stringify({ id: id, message: "ok" }), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
