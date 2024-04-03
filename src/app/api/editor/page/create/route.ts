import { db } from "@/lib/db/index";
import { pages, insertPageSchema } from "@/lib/db/schema/pages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { title, slug, navbarId, footerId, siteId } =
            await request.json();
        const { error }: any = insertPageSchema.safeParse({
            title,
            slug,
            navbarId,
            footerId,
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
            .values({ title, slug, navbarId, footerId, siteId })
            .execute();
        return new NextResponse(JSON.stringify({ message: "ok" }), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
