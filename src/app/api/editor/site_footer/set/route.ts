import { NextRequest, NextResponse } from "next/server";
import {
    siteFooters,
    insertSiteFooterSchema,
} from "@/lib/db/schema/siteFooters";
import { navbars } from "@/lib/db/schema/navbars";
import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";

export async function PUT(request: NextRequest) {
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
        const navbarStyling = await db
            .select()
            .from(navbars)
            .where(eq(navbars.id, footerId))
            .execute();

        return new NextResponse(JSON.stringify(navbarStyling), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
