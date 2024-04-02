import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { pages, insertPageSchema } from "@/lib/db/schema/pages";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { ownerId, name } = await request.json();
        const { error }: any = insertSiteSchema.safeParse({ ownerId, name });
        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        await db.insert(sites).values({ ownerId, name }).execute();

        return new NextResponse(JSON.stringify({ message: "ok" }), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }

    // validate the request body
}
