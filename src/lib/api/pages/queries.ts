import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type PageId, pageIdSchema, pages } from "@/lib/db/schema/pages";
import { sites } from "@/lib/db/schema/sites";
import { pageComponents, type CompletePageComponent } from "@/lib/db/schema/pageComponents";

export const getPages = async () => {
  const rows = await db.select({ page: pages, site: sites }).from(pages).leftJoin(sites, eq(pages.siteId, sites.id));
  const p = rows .map((r) => ({ ...r.page, site: r.site})); 
  return { pages: p };
};

export const getPageById = async (id: PageId) => {
  const { id: pageId } = pageIdSchema.parse({ id });
  const [row] = await db.select({ page: pages, site: sites }).from(pages).where(eq(pages.id, pageId)).leftJoin(sites, eq(pages.siteId, sites.id));
  if (row === undefined) return {};
  const p =  { ...row.page, site: row.site } ;
  return { page: p };
};

export const getPageByIdWithPageComponents = async (id: PageId) => {
  const { id: pageId } = pageIdSchema.parse({ id });
  const rows = await db.select({ page: pages, pageComponent: pageComponents }).from(pages).where(eq(pages.id, pageId)).leftJoin(pageComponents, eq(pages.id, pageComponents.pageId));
  if (rows.length === 0) return {};
  const p = rows[0].page;
  const pp = rows.filter((r) => r.pageComponent !== null).map((p) => p.pageComponent) as CompletePageComponent[];

  return { page: p, pageComponents: pp };
};

