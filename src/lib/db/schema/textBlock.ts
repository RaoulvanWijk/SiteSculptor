import { int, text, varchar, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { containerComponent } from "./containerComponent";
import { type getTextBlocks } from "@/lib/api/textBlock/queries";

import { nanoid } from "@/lib/utils";

export const textBlock = mysqlTable("text_block", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    content: text("content").notNull(),
    containerComponentId: varchar("container_component_id", { length: 256 })
        .references(() => containerComponent.id, { onDelete: "cascade" })
        .notNull(),
});

// Schema for textBlock - used to validate API requests
const baseSchema = createSelectSchema(textBlock);

export const insertTextBlockSchema = createInsertSchema(textBlock);
export const insertTextBlockParams = baseSchema
    .extend({
        id: z.coerce.number(),
        containerComponentId: z.coerce.number(),
    })
    .omit({
        id: true,
    });

export const updateTextBlockSchema = baseSchema;
export const updateTextBlockParams = baseSchema.extend({
    id: z.coerce.number(),
    containerComponentId: z.coerce.number(),
});
export const textBlockIdSchema = baseSchema.pick({ id: true });

// Types for textBlock - used to type API request params and within Components
export type TextBlock = typeof textBlock.$inferSelect;
export type NewTextBlock = z.infer<typeof insertTextBlockSchema>;
export type NewTextBlockParams = z.infer<typeof insertTextBlockParams>;
export type UpdateTextBlockParams = z.infer<typeof updateTextBlockParams>;
export type TextBlockId = z.infer<typeof textBlockIdSchema>["id"];

// this type infers the return from getTextBlock() - meaning it will include any joins
export type CompleteTextBlock = Awaited<
    ReturnType<typeof getTextBlocks>
>["textBlock"][number];
