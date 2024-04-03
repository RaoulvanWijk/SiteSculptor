import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  PageContainerId, 
  NewPageContainerParams,
  UpdatePageContainerParams, 
  updatePageContainerSchema,
  insertPageContainerSchema, 
  pageContainer,
  pageContainerIdSchema 
} from "@/lib/db/schema/pageContainer";

export const createPageContainer = async (pageContainer: NewPageContainerParams) => {
  const newPageContainer = insertPageContainerSchema.parse(pageContainer);
  try {
    await db.insert(pageContainer).values(newPageContainer)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePageContainer = async (id: PageContainerId, pageContainer: UpdatePageContainerParams) => {
  const { id: pageContainerId } = pageContainerIdSchema.parse({ id });
  const newPageContainer = updatePageContainerSchema.parse(pageContainer);
  try {
    await db
     .update(pageContainer)
     .set(newPageContainer)
     .where(eq(pageContainer.id, pageContainerId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePageContainer = async (id: PageContainerId) => {
  const { id: pageContainerId } = pageContainerIdSchema.parse({ id });
  try {
    await db.delete(pageContainer).where(eq(pageContainer.id, pageContainerId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

