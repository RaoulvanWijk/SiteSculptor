import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ContainerComponentId, 
  NewContainerComponentParams,
  UpdateContainerComponentParams, 
  updateContainerComponentSchema,
  insertContainerComponentSchema, 
  containerComponent,
  containerComponentIdSchema 
} from "@/lib/db/schema/containerComponent";

export const createContainerComponent = async (containerComponent: NewContainerComponentParams) => {
  const newContainerComponent = insertContainerComponentSchema.parse(containerComponent);
  try {
    await db.insert(containerComponent).values(newContainerComponent)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateContainerComponent = async (id: ContainerComponentId, containerComponent: UpdateContainerComponentParams) => {
  const { id: containerComponentId } = containerComponentIdSchema.parse({ id });
  const newContainerComponent = updateContainerComponentSchema.parse(containerComponent);
  try {
    await db
     .update(containerComponent)
     .set(newContainerComponent)
     .where(eq(containerComponent.id, containerComponentId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteContainerComponent = async (id: ContainerComponentId) => {
  const { id: containerComponentId } = containerComponentIdSchema.parse({ id });
  try {
    await db.delete(containerComponent).where(eq(containerComponent.id, containerComponentId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

