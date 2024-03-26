import { int, varchar, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { pageContainer } from "./pageContainer";
import { type getContainers } from "@/lib/api/container/queries";

import { nanoid } from "@/lib/utils";

export const container = mysqlTable("container", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    pageContainerId: varchar("page_container_id", { length: 256 })
        .references(() => pageContainer.id, { onDelete: "cascade" })
        .notNull(),
});

// Schema for container - used to validate API requests
const baseSchema = createSelectSchema(container);

export const insertContainerSchema = createInsertSchema(container);
export const insertContainerParams = baseSchema
    .extend({
        id: z.coerce.number(),
        pageContainerId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updateContainerSchema = baseSchema;
export const updateContainerParams = baseSchema.extend({
    id: z.coerce.number(),
    pageContainerId: z.coerce.string().min(1),
});
export const containerIdSchema = baseSchema.pick({ id: true });

// Types for container - used to type API request params and within Components
export type Container = typeof container.$inferSelect;
export type NewContainer = z.infer<typeof insertContainerSchema>;
export type NewContainerParams = z.infer<typeof insertContainerParams>;
export type UpdateContainerParams = z.infer<typeof updateContainerParams>;
export type ContainerId = z.infer<typeof containerIdSchema>["id"];

// this type infers the return from getContainer() - meaning it will include any joins
export type CompleteContainer = Awaited<
    ReturnType<typeof getContainers>
>["container"][number];
