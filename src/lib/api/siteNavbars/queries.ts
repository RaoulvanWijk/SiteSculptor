import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type SiteNavbarId, siteNavbarIdSchema, siteNavbars } from "@/lib/db/schema/siteNavbars";
import { sites } from "@/lib/db/schema/sites";

export const getSiteNavbars = async () => {
  const rows = await db.select({ siteNavbar: siteNavbars, site: sites }).from(siteNavbars).leftJoin(sites, eq(siteNavbars.siteId, sites.id));
  const s = rows .map((r) => ({ ...r.siteNavbar, site: r.site})); 
  return { siteNavbars: s };
};

export const getSiteNavbarById = async (id: SiteNavbarId) => {
  const { id: siteNavbarId } = siteNavbarIdSchema.parse({ id });
  const [row] = await db.select({ siteNavbar: siteNavbars, site: sites }).from(siteNavbars).where(eq(siteNavbars.id, siteNavbarId)).leftJoin(sites, eq(siteNavbars.siteId, sites.id));
  if (row === undefined) return {};
  const s =  { ...row.siteNavbar, site: row.site } ;
  return { siteNavbar: s };
};


