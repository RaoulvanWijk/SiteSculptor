import { db } from "@/lib/db/index";
import { pages } from "@/lib/db/schema/pages";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest, { params }: any) {
    try {
        const id: any = params.id;

        // const idPages = await db
        //     .select()
        //     .from(pages)
        //     .where(eq(pages.id, id))
        //     .execute();

        let page = await db.query.pages.findMany({
            with: {
                pageComponents: {
                    with: {
                        children: {
                            with: {
                                component: {
                                    with: {
                                        type: true,
                                    },
                                },
                            },
                        },
                        component: {
                            with: {
                                type: true,
                            },
                        },
                    },
                    where: (pageComponents, { isNull }) => isNull(pageComponents.parentId),
                },
            },
            where: (pages, { eq }) => {
                return eq(pages.id, id);
            },
        });
        // TODO - Remove this code if chidren is already an empty array
        // page[0].pageComponents.map((pageComponent: any) => {
        //     pageComponent.component.type = pageComponent.component.type.name;
        //     if (pageComponent.children.length > 0) {
        //       pageComponent.children.map((child: any) => {
        //         child.component.type = child.component.type.name;
        //       });
        //     } else {
        //       pageComponent.children = [];
        //     }
        //   });
        if (page.length === 0) {
            return new NextResponse(JSON.stringify({ message: "No pages found" }), {
                status: 404,
            });
        }
        return new NextResponse(JSON.stringify(page[0]), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
