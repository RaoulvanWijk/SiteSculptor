import { NextRequest, NextResponse } from "next/server";
import {
    siteFooters,
    insertSiteFooterSchema,
} from "@/lib/db/schema/siteFooters";
import { db } from "@/lib/db/index";

export async function POST(request: NextRequest) {
    try {
        const { siteId, footerId } = await request.json();
        const { error }: any = insertSiteFooterSchema.safeParse({
            siteId,
            footerId,
        });
        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }
        const response = await db
            .insert(siteFooters)
            .values({ siteId, footerId })
            .execute();
        return new NextResponse(JSON.stringify({ message: "ok" }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
