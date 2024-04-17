import { db } from "@/lib/db/index";
import { sites, insertSiteSchema } from "@/lib/db/schema/sites";
import { pages, insertPageSchema } from "@/lib/db/schema/pages";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();
        const id = nanoid();
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
            id,
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
            .values({ id: id, ownerId, name })
            .execute();
        // get the id of the inserted site

        return new NextResponse(JSON.stringify({ message: "ok", id: id }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
