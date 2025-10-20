import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";

import { pages } from "@/lib/db/schema/pages";
import { pageComponents } from "@/lib/db/schema/pageComponents";
import { and, eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { Changes, UsedComponent } from "editor";

function getChangedProperties(
  initial: any,
  changed: any
): Partial<UsedComponent> | undefined {
  const result: any = {};
  let hasChanges = false;

  for (const key in initial) {
    if (
      initial[key] instanceof Object &&
      changed[key] instanceof Object &&
      !Array.isArray(initial[key])
    ) {
      if (key === "children") {
        continue;
      }
      const nestedChanges = getChangedProperties(initial[key], changed[key]);
      if (nestedChanges) {
        result[key] = nestedChanges;
        hasChanges = true;
      }
    } else if (initial[key] !== changed[key]) {
      if (key === "children") {
        continue;
      }
      result[key] = changed[key];
      hasChanges = true;
    }
  }

  for (const key in changed) {
    if (!(key in initial)) {
      if (key === "children") {
        continue;
      }
      result[key] = changed[key];
      hasChanges = true;
    }
  }

  return hasChanges ? result : undefined;
}

function findChanges(
  initialArray: UsedComponent[],
  changedArray: UsedComponent[]
): Changes[] {
  let changes: Changes[] = [];

  // Create a map of the initial components where the children are also in the same map level
  const initialMap = new Map<string, UsedComponent>();
  initialArray.forEach((component) => {
    initialMap.set(component.id, component);
    component.children.forEach((child) => {
      child.parent = component.id;
      initialMap.set(child.id, child);
    });
  });

  // do the same for the changed components
  const changedMap = new Map<string, UsedComponent>();
  changedArray.forEach((component) => {
    changedMap.set(component.id, component);
    component.children.forEach((child) => {
      child.parent = component.id;
      changedMap.set(child.id, child);
    });
  });

  // iterate over the initial components and compare them with the changed components
  initialMap.forEach((initialComponent, id) => {
    const changedComponent = changedMap.get(id);
    if (!changedComponent) {
      changes.push({ id, type: "remove" });
      return;
    }

    const changedProperties = getChangedProperties(
      initialComponent,
      changedComponent
    );
    if (changedProperties) {
      changes.push({ id, type: "update", changes: changedProperties });
      return;
    }
  });

  // iterate over the changed components and find the new components
  changedMap.forEach((changedComponent, id) => {
    if (!initialMap.has(id)) {
      changes.push({ id, type: "add", component: changedComponent });
    }
  });


  // create a type for the outcome of changes

  
  return changes;
}
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
      oldComponentsCurrent,
      newComponentsCurrent,
    }: {
      differences: Changes[];
      page: string;
      oldComponentsCurrent: UsedComponent[];
      newComponentsCurrent: UsedComponent[];
    } = body;
    console.log(differences, page, findChanges(oldComponentsCurrent, newComponentsCurrent));
    
    if (!differences || differences.length == 0 || !page) {
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
      differences.forEach(async (change) => {
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
      })
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
