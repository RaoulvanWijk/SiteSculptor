import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  FooterId, 
  NewFooterParams,
  UpdateFooterParams, 
  updateFooterSchema,
  insertFooterSchema, 
  footers,
  footerIdSchema 
} from "@/lib/db/schema/footers";

export const createFooter = async (footer: NewFooterParams) => {
  const newFooter = insertFooterSchema.parse(footer);
  try {
    await db.insert(footers).values(newFooter)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFooter = async (id: FooterId, footer: UpdateFooterParams) => {
  const { id: footerId } = footerIdSchema.parse({ id });
  const newFooter = updateFooterSchema.parse(footer);
  try {
    await db
     .update(footers)
     .set({...newFooter, updatedAt: new Date() })
     .where(eq(footers.id, footerId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFooter = async (id: FooterId) => {
  const { id: footerId } = footerIdSchema.parse({ id });
  try {
    await db.delete(footers).where(eq(footers.id, footerId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

