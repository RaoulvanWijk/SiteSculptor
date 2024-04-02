import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  PageId, 
  NewPageParams,
  UpdatePageParams, 
  updatePageSchema,
  insertPageSchema, 
  pages,
  pageIdSchema 
} from "@/lib/db/schema/pages";

export const createPage = async (page: NewPageParams) => {
  const newPage = insertPageSchema.parse(page);
  try {
    await db.insert(pages).values(newPage)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePage = async (id: PageId, page: UpdatePageParams) => {
  const { id: pageId } = pageIdSchema.parse({ id });
  const newPage = updatePageSchema.parse(page);
  try {
    await db
     .update(pages)
     .set({...newPage, updatedAt: new Date() })
     .where(eq(pages.id, pageId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePage = async (id: PageId) => {
  const { id: pageId } = pageIdSchema.parse({ id });
  try {
    await db.delete(pages).where(eq(pages.id, pageId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

