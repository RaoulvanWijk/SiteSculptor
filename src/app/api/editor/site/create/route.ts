import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { pages, insertPageSchema } from "@/lib/db/schema/pages";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();
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

        console.log(ownerId);

        const { error }: any = insertSiteSchema.safeParse({ name, ownerId });
        if (error) {
            return new NextResponse(
                JSON.stringify({ message: error.message }),
                {
                    status: 400,
                }
            );
        }

        await db.insert(sites).values({ ownerId, name }).execute();

        return new NextResponse(JSON.stringify({ message: "ok" }), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }

    // validate the request body
}
