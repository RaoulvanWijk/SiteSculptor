import { NextRequest, NextResponse } from "next/server";
import {
    siteFooters,
    insertSiteFooterSchema,
} from "@/lib/db/schema/siteFooters";
import { footers } from "@/lib/db/schema/footers";
import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { useSession } from "next-auth/react";

export async function PUT(request: NextRequest) {
    // check if user is logged in
    const { data: session } = useSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const { siteId, footerId } = await request.json();
        // check if the site already

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
            .update(siteFooters)
            .set({ footerId })
            .where(eq(siteFooters.siteId, siteId))
            .execute();

        // get the navbar styling
        const footerStyling = await db
            .select()
            .from(footers)
            .where(eq(footers.id, footerId))
            .execute();

        return new NextResponse(JSON.stringify(footerStyling), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
