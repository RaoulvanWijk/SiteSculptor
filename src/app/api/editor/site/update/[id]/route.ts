import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { getUserAuth } from "@/lib/auth/utils";
import validateSession from "@/lib/checkSession";

export async function PUT(request: NextRequest, { params }: any) {
    // check if user is logged in
    try {
        const sesh = await validateSession();
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const id: any = params.id;
        const { name } = await request.json();
        const owner = await getUserAuth();
        const ownerId = owner.session?.user.id as string;
        // update the site

        const { error }: any = insertSiteSchema.safeParse({ name, ownerId });

        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        const res = await db
            .update(sites)
            .set({ name, ownerId, id })
            .where(eq(sites.id, id))
            .execute();
        return new NextResponse(JSON.stringify({ message: "Site updated" }), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
