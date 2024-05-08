import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  SiteFooterId, 
  NewSiteFooterParams,
  UpdateSiteFooterParams, 
  updateSiteFooterSchema,
  insertSiteFooterSchema, 
  siteFooters,
  siteFooterIdSchema 
} from "@/lib/db/schema/siteFooters";

export const createSiteFooter = async (siteFooter: NewSiteFooterParams) => {
  const newSiteFooter = insertSiteFooterSchema.parse(siteFooter);
  try {
    await db.insert(siteFooters).values(newSiteFooter)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSiteFooter = async (id: SiteFooterId, siteFooter: UpdateSiteFooterParams) => {
  const { id: siteFooterId } = siteFooterIdSchema.parse({ id });
  const newSiteFooter = updateSiteFooterSchema.parse(siteFooter);
  try {
    await db
     .update(siteFooters)
     .set({...newSiteFooter, updatedAt: new Date() })
     .where(eq(siteFooters.id, siteFooterId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSiteFooter = async (id: SiteFooterId) => {
  const { id: siteFooterId } = siteFooterIdSchema.parse({ id });
  try {
    await db.delete(siteFooters).where(eq(siteFooters.id, siteFooterId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

