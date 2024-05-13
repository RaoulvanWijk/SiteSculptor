import { NextRequest, NextResponse } from "next/server";
import {
    siteNavbars,
    insertSiteNavbarSchema,
} from "@/lib/db/schema/siteNavbars";
import { db } from "@/lib/db/index";

export async function PUT(request: NextRequest) {
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
            .insert(siteNavbars)
            .values({ siteId, navbarId })
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
