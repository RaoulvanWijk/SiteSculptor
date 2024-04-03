import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type TextBlockId, textBlockIdSchema, textBlock } from "@/lib/db/schema/textBlock";
import { containerComponent } from "@/lib/db/schema/containerComponent";

export const getTextBlocks = async () => {
  const rows = await db.select({ textBlock: textBlock, containerComponent: containerComponent }).from(textBlock).leftJoin(containerComponent, eq(textBlock.containerComponentId, containerComponent.id));
  const t = rows .map((r) => ({ ...r.textBlock, containerComponent: r.containerComponent})); 
  return { textBlock: t };
};

export const getTextBlockById = async (id: TextBlockId) => {
  const { id: textBlockId } = textBlockIdSchema.parse({ id });
  const [row] = await db.select({ textBlock: textBlock, containerComponent: containerComponent }).from(textBlock).where(eq(textBlock.id, textBlockId)).leftJoin(containerComponent, eq(textBlock.containerComponentId, containerComponent.id));
  if (row === undefined) return {};
  const t =  { ...row.textBlock, containerComponent: row.containerComponent } ;
  return { textBlock: t };
};


