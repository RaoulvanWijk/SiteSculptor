import { int, varchar, mysqlTable, uniqueIndex } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getPageContainers } from "@/lib/api/pageContainer/queries";

import { nanoid } from "@/lib/utils";

export const pageContainer = mysqlTable(
    "page_container",
    {
        id: varchar("id", { length: 191 })
            .primaryKey()
            .$defaultFn(() => nanoid()),
        pageId: int("page_id").notNull(),
        containerId: int("container_id").notNull(),
    },
    (pageContainer) => {
        return {
            idIndex: uniqueIndex("id_idx").on(pageContainer.id),
        };
    }
);

// Schema for pageContainer - used to validate API requests
const baseSchema = createSelectSchema(pageContainer);

export const insertPageContainerSchema = createInsertSchema(pageContainer);
export const insertPageContainerParams = baseSchema
    .extend({
        id: z.coerce.number(),
        pageId: z.coerce.number(),
        containerId: z.coerce.number(),
    })
    .omit({
        id: true,
    });

export const updatePageContainerSchema = baseSchema;
export const updatePageContainerParams = baseSchema.extend({
    id: z.coerce.number(),
    pageId: z.coerce.number(),
    containerId: z.coerce.number(),
});
export const pageContainerIdSchema = baseSchema.pick({ id: true });

// Types for pageContainer - used to type API request params and within Components
export type PageContainer = typeof pageContainer.$inferSelect;
export type NewPageContainer = z.infer<typeof insertPageContainerSchema>;
export type NewPageContainerParams = z.infer<typeof insertPageContainerParams>;
export type UpdatePageContainerParams = z.infer<
    typeof updatePageContainerParams
>;
export type PageContainerId = z.infer<typeof pageContainerIdSchema>["id"];

// this type infers the return from getPageContainer() - meaning it will include any joins
export type CompletePageContainer = Awaited<
    ReturnType<typeof getPageContainers>
>["pageContainer"][number];
