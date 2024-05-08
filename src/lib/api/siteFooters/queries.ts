import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type SiteFooterId, siteFooterIdSchema, siteFooters } from "@/lib/db/schema/siteFooters";
import { sites } from "@/lib/db/schema/sites";

export const getSiteFooters = async () => {
  const rows = await db.select({ siteFooter: siteFooters, site: sites }).from(siteFooters).leftJoin(sites, eq(siteFooters.siteId, sites.id));
  const s = rows .map((r) => ({ ...r.siteFooter, site: r.site})); 
  return { siteFooters: s };
};

export const getSiteFooterById = async (id: SiteFooterId) => {
  const { id: siteFooterId } = siteFooterIdSchema.parse({ id });
  const [row] = await db.select({ siteFooter: siteFooters, site: sites }).from(siteFooters).where(eq(siteFooters.id, siteFooterId)).leftJoin(sites, eq(siteFooters.siteId, sites.id));
  if (row === undefined) return {};
  const s =  { ...row.siteFooter, site: row.site } ;
  return { siteFooter: s };
};


