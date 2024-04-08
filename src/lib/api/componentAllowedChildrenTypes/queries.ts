import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ComponentAllowedChildrenTypeId, componentAllowedChildrenTypeIdSchema, componentAllowedChildrenTypes } from "@/lib/db/schema/componentAllowedChildrenTypes";
import { components } from "@/lib/db/schema/components";

export const getComponentAllowedChildrenTypes = async () => {
  const rows = await db.select({ componentAllowedChildrenType: componentAllowedChildrenTypes, component: components }).from(componentAllowedChildrenTypes).leftJoin(components, eq(componentAllowedChildrenTypes.componentId, components.id));
  const c = rows .map((r) => ({ ...r.componentAllowedChildrenType, component: r.component})); 
  return { componentAllowedChildrenTypes: c };
};

export const getComponentAllowedChildrenTypeById = async (id: ComponentAllowedChildrenTypeId) => {
  const { id: componentAllowedChildrenTypeId } = componentAllowedChildrenTypeIdSchema.parse({ id });
  const [row] = await db.select({ componentAllowedChildrenType: componentAllowedChildrenTypes, component: components }).from(componentAllowedChildrenTypes).where(eq(componentAllowedChildrenTypes.id, componentAllowedChildrenTypeId)).leftJoin(components, eq(componentAllowedChildrenTypes.componentId, components.id));
  if (row === undefined) return {};
  const c =  { ...row.componentAllowedChildrenType, component: row.component } ;
  return { componentAllowedChildrenType: c };
};


