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
    const idPages = await db.query.pages.findMany({
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
        return eq(pages.siteId, id);
      },
    });

    if (idPages.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No pages found" }), {
        status: 404,
      });
    }
    idPages[0].pageComponents.map((pageComponent: any) => {
      pageComponent.component.type = pageComponent.component.type.name;
      if (pageComponent.children.length > 0) {
        pageComponent.children.map((child: any) => {
          child.component.type = child.component.type.name;
        });
      } else {
        pageComponent.children = [];
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
