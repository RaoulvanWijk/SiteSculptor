import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ComponentAllowedChildrenTypeId, 
  NewComponentAllowedChildrenTypeParams,
  UpdateComponentAllowedChildrenTypeParams, 
  updateComponentAllowedChildrenTypeSchema,
  insertComponentAllowedChildrenTypeSchema, 
  componentAllowedChildrenTypes,
  componentAllowedChildrenTypeIdSchema 
} from "@/lib/db/schema/componentAllowedChildrenTypes";

export const createComponentAllowedChildrenType = async (componentAllowedChildrenType: NewComponentAllowedChildrenTypeParams) => {
  const newComponentAllowedChildrenType = insertComponentAllowedChildrenTypeSchema.parse(componentAllowedChildrenType);
  try {
    await db.insert(componentAllowedChildrenTypes).values(newComponentAllowedChildrenType)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateComponentAllowedChildrenType = async (id: ComponentAllowedChildrenTypeId, componentAllowedChildrenType: UpdateComponentAllowedChildrenTypeParams) => {
  const { id: componentAllowedChildrenTypeId } = componentAllowedChildrenTypeIdSchema.parse({ id });
  const newComponentAllowedChildrenType = updateComponentAllowedChildrenTypeSchema.parse(componentAllowedChildrenType);
  try {
    await db
     .update(componentAllowedChildrenTypes)
     .set({...newComponentAllowedChildrenType, updatedAt: new Date() })
     .where(eq(componentAllowedChildrenTypes.id, componentAllowedChildrenTypeId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteComponentAllowedChildrenType = async (id: ComponentAllowedChildrenTypeId) => {
  const { id: componentAllowedChildrenTypeId } = componentAllowedChildrenTypeIdSchema.parse({ id });
  try {
    await db.delete(componentAllowedChildrenTypes).where(eq(componentAllowedChildrenTypes.id, componentAllowedChildrenTypeId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

