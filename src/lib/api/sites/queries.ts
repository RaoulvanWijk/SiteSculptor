import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type SiteId, siteIdSchema, sites } from "@/lib/db/schema/sites";
import { pages, type CompletePage } from "@/lib/db/schema/pages";

export const getSites = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(sites).where(eq(sites.userId, session?.user.id!));
  const s = rows
  return { sites: s };
};

export const getSiteById = async (id: SiteId) => {
  const { session } = await getUserAuth();
  const { id: siteId } = siteIdSchema.parse({ id });
  const [row] = await db.select().from(sites).where(and(eq(sites.id, siteId), eq(sites.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { site: s };
};

export const getSiteByIdWithPages = async (id: SiteId) => {
  const { session } = await getUserAuth();
  const { id: siteId } = siteIdSchema.parse({ id });
  const rows = await db.select({ site: sites, page: pages }).from(sites).where(and(eq(sites.id, siteId), eq(sites.userId, session?.user.id!))).leftJoin(pages, eq(sites.id, pages.siteId));
  if (rows.length === 0) return {};
  const s = rows[0].site;
  const sp = rows.filter((r) => r.page !== null).map((p) => p.page) as CompletePage[];

  return { site: s, pages: sp };
};

