import { PageComponentId } from './../../db/schema/pageComponents';
import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  NewPageComponentParams,
  UpdatePageComponentParams, 
  updatePageComponentSchema,
  insertPageComponentSchema, 
  pageComponents,
  pageComponentIdSchema 
} from "@/lib/db/schema/pageComponents";

export const createPageComponent = async (pageComponent: NewPageComponentParams) => {
  const newPageComponent = insertPageComponentSchema.parse(pageComponent);
  try {
    await db.insert(pageComponents).values(newPageComponent)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePageComponent = async (id: PageComponentId, pageComponent: UpdatePageComponentParams) => {
  const { id: pageComponentId} = pageComponentIdSchema.parse({ id }) as any;
  
  const newPageComponent = updatePageComponentSchema.parse(pageComponent);
  try {
    await db
     .update(pageComponents)
     .set({...newPageComponent, updatedAt: new Date() })
     .where(eq(pageComponents.id, pageComponentId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePageComponent = async (id: PageComponentId) => {
  const { id: pageComponentId } = pageComponentIdSchema.parse({ id }) as any;
  try {
    await db.delete(pageComponents).where(eq(pageComponents.id, pageComponentId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

