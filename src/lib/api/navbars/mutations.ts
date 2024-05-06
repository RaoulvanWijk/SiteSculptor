import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  NavbarId, 
  NewNavbarParams,
  UpdateNavbarParams, 
  updateNavbarSchema,
  insertNavbarSchema, 
  navbars,
  navbarIdSchema 
} from "@/lib/db/schema/navbars";

export const createNavbar = async (navbar: NewNavbarParams) => {
  const newNavbar = insertNavbarSchema.parse(navbar);
  try {
    await db.insert(navbars).values(newNavbar)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateNavbar = async (id: NavbarId, navbar: UpdateNavbarParams) => {
  const { id: navbarId } = navbarIdSchema.parse({ id });
  const newNavbar = updateNavbarSchema.parse(navbar);
  try {
    await db
     .update(navbars)
     .set({...newNavbar, updatedAt: new Date() })
     .where(eq(navbars.id, navbarId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteNavbar = async (id: NavbarId) => {
  const { id: navbarId } = navbarIdSchema.parse({ id });
  try {
    await db.delete(navbars).where(eq(navbars.id, navbarId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

