import { NextRequest, NextResponse } from "next/server";
import {
    siteNavbars,
    insertSiteNavbarSchema,
} from "@/lib/db/schema/siteNavbars";
import { navbars } from "@/lib/db/schema/navbars";
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
        const { siteId, navbarId } = await request.json();
        // check if the site already

        const { error }: any = insertSiteNavbarSchema.safeParse({
            siteId,
            navbarId,
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
            .update(siteNavbars)
            .set({ navbarId })
            .where(eq(siteNavbars.siteId, siteId))
            .execute();

        // get the navbar styling
        const navbarStyling = await db
            .select()
            .from(navbars)
            .where(eq(navbars.id, navbarId))
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
