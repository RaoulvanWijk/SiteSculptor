import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ContainerId, 
  NewContainerParams,
  UpdateContainerParams, 
  updateContainerSchema,
  insertContainerSchema, 
  container,
  containerIdSchema 
} from "@/lib/db/schema/container";

export const createContainer = async (container: NewContainerParams) => {
  const newContainer = insertContainerSchema.parse(container);
  try {
    await db.insert(container).values(newContainer)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateContainer = async (id: ContainerId, container: UpdateContainerParams) => {
  const { id: containerId } = containerIdSchema.parse({ id });
  const newContainer = updateContainerSchema.parse(container);
  try {
    await db
     .update(container)
     .set(newContainer)
     .where(eq(container.id, containerId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteContainer = async (id: ContainerId) => {
  const { id: containerId } = containerIdSchema.parse({ id });
  try {
    await db.delete(container).where(eq(container.id, containerId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

