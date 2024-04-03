import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type PageComponentId, pageComponentIdSchema, pageComponents } from "@/lib/db/schema/pageComponents";
import { pages } from "@/lib/db/schema/pages";
import { components, type CompleteComponent } from "@/lib/db/schema/components";

export const getPageComponents = async () => {
  const rows = await db.select({ pageComponent: pageComponents, page: pages }).from(pageComponents).leftJoin(pages, eq(pageComponents.pageId, pages.id));
  const p = rows .map((r) => ({ ...r.pageComponent, page: r.page})); 
  return { pageComponents: p };
};

export const getPageComponentById = async (id: PageComponentId) => {
  const { id: pageComponentId } = pageComponentIdSchema.parse({ id });
  const [row] = await db.select({ pageComponent: pageComponents, page: pages }).from(pageComponents).where(eq(pageComponents.id, pageComponentId)).leftJoin(pages, eq(pageComponents.pageId, pages.id));
  if (row === undefined) return {};
  const p =  { ...row.pageComponent, page: row.page } ;
  return { pageComponent: p };
};

export const getPageComponentByIdWithComponents = async (id: PageComponentId) => {
  const { id: pageComponentId } = pageComponentIdSchema.parse({ id });
  const rows = await db.select({ pageComponent: pageComponents, component: components }).from(pageComponents).where(eq(pageComponents.id, pageComponentId)).leftJoin(components, eq(pageComponents.id, components.pageComponentId));
  if (rows.length === 0) return {};
  const p = rows[0].pageComponent;
  const pc = rows.filter((r) => r.component !== null).map((c) => c.component) as CompleteComponent[];

  return { pageComponent: p, components: pc };
};

