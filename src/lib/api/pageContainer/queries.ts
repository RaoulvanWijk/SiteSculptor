import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type PageContainerId, pageContainerIdSchema, pageContainer } from "@/lib/db/schema/pageContainer";
import { container, type CompleteContainer } from "@/lib/db/schema/container";

export const getPageContainers = async () => {
  const rows = await db.select().from(pageContainer);
  const p = rows
  return { pageContainer: p };
};

export const getPageContainerById = async (id: PageContainerId) => {
  const { id: pageContainerId } = pageContainerIdSchema.parse({ id });
  const [row] = await db.select().from(pageContainer).where(eq(pageContainer.id, pageContainerId));
  if (row === undefined) return {};
  const p = row;
  return { pageContainer: p };
};

export const getPageContainerByIdWithContainer = async (id: PageContainerId) => {
  const { id: pageContainerId } = pageContainerIdSchema.parse({ id });
  const rows = await db.select({ pageContainer: pageContainer, container: container }).from(pageContainer).where(eq(pageContainer.id, pageContainerId)).leftJoin(container, eq(pageContainer.id, container.pageContainerId));
  if (rows.length === 0) return {};
  const p = rows[0].pageContainer;
  const pc = rows.filter((r) => r.container !== null).map((c) => c.container) as CompleteContainer[];

  return { pageContainer: p, container: pc };
};

