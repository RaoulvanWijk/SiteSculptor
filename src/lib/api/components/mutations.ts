import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ComponentId, 
  NewComponentParams,
  UpdateComponentParams, 
  updateComponentSchema,
  insertComponentSchema, 
  components,
  componentIdSchema 
} from "@/lib/db/schema/components";

export const createComponent = async (component: NewComponentParams) => {
  const newComponent = insertComponentSchema.parse(component);
  try {
    await db.insert(components).values(newComponent)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateComponent = async (id: ComponentId, component: UpdateComponentParams) => {
  const { id: componentId } = componentIdSchema.parse({ id });
  const newComponent = updateComponentSchema.parse(component);
  try {
    await db
     .update(components)
     .set({...newComponent, updatedAt: new Date() })
     .where(eq(components.id, componentId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteComponent = async (id: ComponentId) => {
  const { id: componentId } = componentIdSchema.parse({ id });
  try {
    await db.delete(components).where(eq(components.id, componentId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

