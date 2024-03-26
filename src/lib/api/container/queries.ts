import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ContainerId, containerIdSchema, container } from "@/lib/db/schema/container";
import { pageContainer } from "@/lib/db/schema/pageContainer";
import { containerComponent, type CompleteContainerComponent } from "@/lib/db/schema/containerComponent";

export const getContainers = async () => {
  const rows = await db.select({ container: container, pageContainer: pageContainer }).from(container).leftJoin(pageContainer, eq(container.pageContainerId, pageContainer.id));
  const c = rows .map((r) => ({ ...r.container, pageContainer: r.pageContainer})); 
  return { container: c };
};

export const getContainerById = async (id: ContainerId) => {
  const { id: containerId } = containerIdSchema.parse({ id });
  const [row] = await db.select({ container: container, pageContainer: pageContainer }).from(container).where(eq(container.id, containerId)).leftJoin(pageContainer, eq(container.pageContainerId, pageContainer.id));
  if (row === undefined) return {};
  const c =  { ...row.container, pageContainer: row.pageContainer } ;
  return { container: c };
};

export const getContainerByIdWithContainerComponent = async (id: ContainerId) => {
  const { id: containerId } = containerIdSchema.parse({ id });
  const rows = await db.select({ container: container, containerComponent: containerComponent }).from(container).where(eq(container.id, containerId)).leftJoin(containerComponent, eq(container.id, containerComponent.containerId));
  if (rows.length === 0) return {};
  const c = rows[0].container;
  const cc = rows.filter((r) => r.containerComponent !== null).map((c) => c.containerComponent) as CompleteContainerComponent[];

  return { container: c, containerComponent: cc };
};

