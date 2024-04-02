import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ComponentId, componentIdSchema, components } from "@/lib/db/schema/components";
import { pageComponents } from "@/lib/db/schema/pageComponents";
import { componentAllowedChildrenTypes, type CompleteComponentAllowedChildrenType } from "@/lib/db/schema/componentAllowedChildrenTypes";
import { componentTypes, type CompleteComponentType } from "@/lib/db/schema/componentTypes";

export const getComponents = async () => {
  const rows = await db.select({ component: components, pageComponent: pageComponents }).from(components).leftJoin(pageComponents, eq(components.pageComponentId, pageComponents.id));
  const c = rows .map((r) => ({ ...r.component, pageComponent: r.pageComponent})); 
  return { components: c };
};

export const getComponentById = async (id: ComponentId) => {
  const { id: componentId } = componentIdSchema.parse({ id });
  const [row] = await db.select({ component: components, pageComponent: pageComponents }).from(components).where(eq(components.id, componentId)).leftJoin(pageComponents, eq(components.pageComponentId, pageComponents.id));
  if (row === undefined) return {};
  const c =  { ...row.component, pageComponent: row.pageComponent } ;
  return { component: c };
};

export const getComponentByIdWithComponentAllowedChildrenTypesAndComponentTypes = async (id: ComponentId) => {
  const { id: componentId } = componentIdSchema.parse({ id });
  const rows = await db.select({ component: components, componentAllowedChildrenType: componentAllowedChildrenTypes, componentType: componentTypes }).from(components).where(eq(components.id, componentId)).leftJoin(componentAllowedChildrenTypes, eq(components.id, componentAllowedChildrenTypes.componentId)).leftJoin(componentTypes, eq(components.id, componentTypes.componentId));
  if (rows.length === 0) return {};
  const c = rows[0].component;
  const cc = rows.filter((r) => r.componentAllowedChildrenType !== null).map((c) => c.componentAllowedChildrenType) as CompleteComponentAllowedChildrenType[];
  const cc = rows.filter((r) => r.componentType !== null).map((c) => c.componentType) as CompleteComponentType[];

  return { component: c, componentAllowedChildrenTypes: cc, componentTypes: cc };
};

