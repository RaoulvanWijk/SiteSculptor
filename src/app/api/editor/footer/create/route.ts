import { NextRequest, NextResponse } from "next/server";
import { footers, insertFooterSchema } from "@/lib/db/schema/footers";
import { db } from "@/lib/db/index";
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
        const { name, styles, props } = await request.json();
        const { error }: any = insertFooterSchema.safeParse({
            name,
            styles,
            props,
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
            .insert(footers)
            .values({ name, styles, props })
            .execute();
        return new NextResponse(JSON.stringify(response), {
            status: 200,
        });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}
