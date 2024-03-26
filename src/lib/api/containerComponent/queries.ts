import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ContainerComponentId, containerComponentIdSchema, containerComponent } from "@/lib/db/schema/containerComponent";
import { container } from "@/lib/db/schema/container";
import { textBlock, type CompleteTextBlock } from "@/lib/db/schema/textBlock";

export const getContainerComponents = async () => {
  const rows = await db.select({ containerComponent: containerComponent, container: container }).from(containerComponent).leftJoin(container, eq(containerComponent.containerId, container.id));
  const c = rows .map((r) => ({ ...r.containerComponent, container: r.container})); 
  return { containerComponent: c };
};

export const getContainerComponentById = async (id: ContainerComponentId) => {
  const { id: containerComponentId } = containerComponentIdSchema.parse({ id });
  const [row] = await db.select({ containerComponent: containerComponent, container: container }).from(containerComponent).where(eq(containerComponent.id, containerComponentId)).leftJoin(container, eq(containerComponent.containerId, container.id));
  if (row === undefined) return {};
  const c =  { ...row.containerComponent, container: row.container } ;
  return { containerComponent: c };
};

export const getContainerComponentByIdWithTextBlock = async (id: ContainerComponentId) => {
  const { id: containerComponentId } = containerComponentIdSchema.parse({ id });
  const rows = await db.select({ containerComponent: containerComponent, textBlock: textBlock }).from(containerComponent).where(eq(containerComponent.id, containerComponentId)).leftJoin(textBlock, eq(containerComponent.id, textBlock.containerComponentId));
  if (rows.length === 0) return {};
  const c = rows[0].containerComponent;
  const ct = rows.filter((r) => r.textBlock !== null).map((t) => t.textBlock) as CompleteTextBlock[];

  return { containerComponent: c, textBlock: ct };
};

