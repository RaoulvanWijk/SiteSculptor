import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ComponentTypeId, componentTypeIdSchema, componentTypes } from "@/lib/db/schema/componentTypes";
import { components } from "@/lib/db/schema/components";

export const getComponentTypes = async () => {
  const rows = await db.select({ componentType: componentTypes, component: components }).from(componentTypes).leftJoin(components, eq(componentTypes.componentId, components.id));
  const c = rows .map((r) => ({ ...r.componentType, component: r.component})); 
  return { componentTypes: c };
};

export const getComponentTypeById = async (id: ComponentTypeId) => {
  const { id: componentTypeId } = componentTypeIdSchema.parse({ id });
  const [row] = await db.select({ componentType: componentTypes, component: components }).from(componentTypes).where(eq(componentTypes.id, componentTypeId)).leftJoin(components, eq(componentTypes.componentId, components.id));
  if (row === undefined) return {};
  const c =  { ...row.componentType, component: row.component } ;
  return { componentType: c };
};


