import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";

import { pages } from "@/lib/db/schema/pages";
import { pageComponents } from "@/lib/db/schema/pageComponents";
import { and, eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { Changes, UsedComponent } from "editor";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body) {
      return new NextResponse(JSON.stringify({ message: "error" }), {
        status: 400,
      });
    }

    const {
      differences,
      page,
    }: {
      differences: Changes[];
      page: string;
    } = body;

    if (!differences || !page) {
      return new NextResponse(JSON.stringify({ message: "no-changes" }), {
        status: 400,
      });
    }

    const pageData = await db.query.pages.findFirst({
      with: {
        sites: true,
      },
      where: (pages, { eq }) => {
        return eq(pages.id, page);
      },
    });

    if (
      !pageData ||
      (pageData.sites as any).ownerId !== (await getUserAuth()).session?.user.id
    ) {
      return new NextResponse(JSON.stringify({ message: "error" }), {
        status: 400,
      });
    }

    // Update the page
    // map over each component and their differnces and exectue the changes
    differences.map(async (change) => {
      const { component, type, id } = change;

      if (type === "add") {
        // extract all values except component and type
        const { id, ...changes }: { id: string } & (UsedComponent | undefined) =
          change.component as any;

        if (changes.parent) {
          await db.insert(pageComponents).values({
            pageId: page,
            componentId: component?.component.id,
            parentId: changes.parent,
            ...changes,
          });
        } else {
          await db.insert(pageComponents).values({
            pageId: page,
            componentId: component?.component.id,
            ...changes,
          });
        }
      }

      if (type === "update") {
        let {
          id,
          ...changes
        }: {
          id: string;
          parentId?: string;
        } & (Partial<UsedComponent> | undefined) = change.changes as any;

        if (changes.parent) {
          changes.parentId = changes.parent;
          delete changes.parent;
        }
        //   rename changes.parent to parentId
        const res = await db
          .update(pageComponents)
          .set({
            ...changes,
          })
          .where(
            and(
              eq(pageComponents.pageId, page),
              eq(pageComponents.id, change.id)
            )
          );
      }

      if (type === "remove") {
        await db
          .delete(pageComponents)
          .where(
            and(eq(pageComponents.pageId, page), eq(pageComponents.id, id))
          );
      }
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "error" }), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify({ message: "succes" }), {
    status: 200,
  });
}
