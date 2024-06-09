import { NextRequest, NextResponse } from "next/server";
import { navbars, insertNavbarSchema } from "@/lib/db/schema/navbars";
import { db } from "@/lib/db/index";
import { useSession } from "next-auth/react";

export async function POST(request: NextRequest) {
    // check if user is logged in

    try {
        const { name, styles, props } = await request.json();
        const { error }: any = insertNavbarSchema.safeParse({
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
            .insert(navbars)
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
