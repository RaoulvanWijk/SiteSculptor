import { db } from "@/lib/db/index";
import { pages } from "@/lib/db/schema/pages";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import validateSession from "@/lib/checkSession";

import { pageComponents } from "@/lib/db/schema/pageComponents";
import { components } from "@/lib/db/schema/components";

export async function GET(request: NextRequest, { params }: any) {
    try {
        const id: any = params.siteId;

        const idPages = await db
            .select()
            .from(pages)
            .where(eq(pages.siteId, id));

        if (idPages.length === 0) {
            return new NextResponse(
                JSON.stringify({ message: "No pages found" }),
                {
                    status: 404,
                }
            );
        }

        return new NextResponse(JSON.stringify(idPages), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
