import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest, { params }: any) {
    try {
        const name: any = params.site_name;

        // check if the site exists
        const site = await db
            .select()
            .from(sites)
            .where(eq(sites.name, name))
            .execute();
        if (site == null || site.length == 0) {
            return new NextResponse(
                JSON.stringify({ message: "Site not found" }),
                {
                    status: 404,
                }
            );
        }
        // show site
        return new NextResponse(JSON.stringify(site), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
