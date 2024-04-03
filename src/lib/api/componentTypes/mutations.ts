import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ComponentTypeId, 
  NewComponentTypeParams,
  UpdateComponentTypeParams, 
  updateComponentTypeSchema,
  insertComponentTypeSchema, 
  componentTypes,
  componentTypeIdSchema 
} from "@/lib/db/schema/componentTypes";

export const createComponentType = async (componentType: NewComponentTypeParams) => {
  const newComponentType = insertComponentTypeSchema.parse(componentType);
  try {
    await db.insert(componentTypes).values(newComponentType)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateComponentType = async (id: ComponentTypeId, componentType: UpdateComponentTypeParams) => {
  const { id: componentTypeId } = componentTypeIdSchema.parse({ id });
  const newComponentType = updateComponentTypeSchema.parse(componentType);
  try {
    await db
     .update(componentTypes)
     .set({...newComponentType, updatedAt: new Date() })
     .where(eq(componentTypes.id, componentTypeId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteComponentType = async (id: ComponentTypeId) => {
  const { id: componentTypeId } = componentTypeIdSchema.parse({ id });
  try {
    await db.delete(componentTypes).where(eq(componentTypes.id, componentTypeId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

