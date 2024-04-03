import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  TextBlockId, 
  NewTextBlockParams,
  UpdateTextBlockParams, 
  updateTextBlockSchema,
  insertTextBlockSchema, 
  textBlock,
  textBlockIdSchema 
} from "@/lib/db/schema/textBlock";

export const createTextBlock = async (textBlock: NewTextBlockParams) => {
  const newTextBlock = insertTextBlockSchema.parse(textBlock);
  try {
    await db.insert(textBlock).values(newTextBlock)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTextBlock = async (id: TextBlockId, textBlock: UpdateTextBlockParams) => {
  const { id: textBlockId } = textBlockIdSchema.parse({ id });
  const newTextBlock = updateTextBlockSchema.parse(textBlock);
  try {
    await db
     .update(textBlock)
     .set(newTextBlock)
     .where(eq(textBlock.id, textBlockId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTextBlock = async (id: TextBlockId) => {
  const { id: textBlockId } = textBlockIdSchema.parse({ id });
  try {
    await db.delete(textBlock).where(eq(textBlock.id, textBlockId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

