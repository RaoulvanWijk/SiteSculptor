import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  SiteId, 
  NewSiteParams,
  UpdateSiteParams, 
  updateSiteSchema,
  insertSiteSchema, 
  sites,
  siteIdSchema 
} from "@/lib/db/schema/sites";
import { getUserAuth } from "@/lib/auth/utils";

export const createSite = async (site: NewSiteParams) => {
  const { session } = await getUserAuth();
  const newSite = insertSiteSchema.parse({ ...site, userId: session?.user.id! });
  try {
    await db.insert(sites).values(newSite)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSite = async (id: SiteId, site: UpdateSiteParams) => {
  const { session } = await getUserAuth();
  const { id: siteId } = siteIdSchema.parse({ id });
  const newSite = updateSiteSchema.parse({ ...site, userId: session?.user.id! });
  try {
    await db
     .update(sites)
     .set({...newSite, updatedAt: new Date() })
     .where(and(eq(sites.id, siteId!), eq(sites.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSite = async (id: SiteId) => {
  const { session } = await getUserAuth();
  const { id: siteId } = siteIdSchema.parse({ id });
  try {
    await db.delete(sites).where(and(eq(sites.id, siteId!), eq(sites.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

