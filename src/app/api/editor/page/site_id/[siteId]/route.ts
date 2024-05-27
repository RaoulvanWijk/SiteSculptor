import { db } from "@/lib/db/index";
import { pages } from "@/lib/db/schema/pages";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { pageComponents } from "@/lib/db/schema/pageComponents";
import { components } from "@/lib/db/schema/components";

export async function GET(request: NextRequest, { params }: any) {
    try {
        const id: any = params.siteId;
        //get the pages for the siteId
        const idPages = await db
            .query.pages.findMany({
                with: {
                    pageComponents: true,
                }
            });
        return new NextResponse(JSON.stringify(idPages), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
