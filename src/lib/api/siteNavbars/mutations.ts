import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  SiteNavbarId, 
  NewSiteNavbarParams,
  UpdateSiteNavbarParams, 
  updateSiteNavbarSchema,
  insertSiteNavbarSchema, 
  siteNavbars,
  siteNavbarIdSchema 
} from "@/lib/db/schema/siteNavbars";

export const createSiteNavbar = async (siteNavbar: NewSiteNavbarParams) => {
  const newSiteNavbar = insertSiteNavbarSchema.parse(siteNavbar);
  try {
    await db.insert(siteNavbars).values(newSiteNavbar)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSiteNavbar = async (id: SiteNavbarId, siteNavbar: UpdateSiteNavbarParams) => {
  const { id: siteNavbarId } = siteNavbarIdSchema.parse({ id });
  const newSiteNavbar = updateSiteNavbarSchema.parse(siteNavbar);
  try {
    await db
     .update(siteNavbars)
     .set({...newSiteNavbar, updatedAt: new Date() })
     .where(eq(siteNavbars.id, siteNavbarId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSiteNavbar = async (id: SiteNavbarId) => {
  const { id: siteNavbarId } = siteNavbarIdSchema.parse({ id });
  try {
    await db.delete(siteNavbars).where(eq(siteNavbars.id, siteNavbarId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

