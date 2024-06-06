import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { useSession } from "next-auth/react";
export async function GET(request: NextRequest, { params }: any) {
    // check if user is logged in
    const { data: session } = useSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const user = await getUserAuth();
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            );
        }

        const userId = user.session?.user.id as string;

        const site = await db
            .select()
            .from(sites)
            .where(eq(sites.ownerId, userId))
            .execute();
        // show site
        return new NextResponse(JSON.stringify(site), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
