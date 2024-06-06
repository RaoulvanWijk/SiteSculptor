import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { pages, insertPageSchema } from "@/lib/db/schema/pages";
import { siteNavbars } from "@/lib/db/schema/siteNavbars";
import { siteFooters } from "@/lib/db/schema/siteFooters";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";

export async function POST(request: NextRequest) {
    // check if user is logged in
    const { data: session } = useSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const { name } = await request.json();
        const siteId = nanoid();
        const owner = await getUserAuth();
        if (!owner) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            );
        }

        const ownerId = owner.session?.user.id as string;

        const { error }: any = insertSiteSchema.safeParse({
            name,
            ownerId,
            siteId,
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
            .insert(sites)
            .values({ id: siteId, ownerId, name })
            .execute();
        // set the first page
        const pageId = nanoid();
        const { error: pageError }: any = insertPageSchema.safeParse({
            title: "Home",
            slug: "home",
            siteId,
        });
        if (pageError) {
            return new NextResponse(
                JSON.stringify({ message: pageError.message }),
                {
                    status: 400,
                }
            );
        }
        await db
            .insert(pages)
            .values({ id: pageId, title: "Home", slug: "home", siteId })
            .execute();
        // set the default navbar
        const navbarId = "1zldb18jz27ls6x72hok2";
        await db.insert(siteNavbars).values({ siteId, navbarId }).execute();

        // set the default footer
        const footerId = "967tsxvxacrghavquszt0";
        await db.insert(siteFooters).values({ siteId, footerId }).execute();

        return new NextResponse(JSON.stringify({ message: "ok", id: siteId }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
