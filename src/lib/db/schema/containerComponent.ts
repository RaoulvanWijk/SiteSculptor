import { int, varchar, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { container } from "./container";
import { type getContainerComponents } from "@/lib/api/containerComponent/queries";

import { nanoid } from "@/lib/utils";

export const containerComponent = mysqlTable("container_component", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    componentName: varchar("component_name", { length: 256 }).notNull(),
    containerId: varchar("container_id", { length: 256 })
        .references(() => container.id, { onDelete: "cascade" })
        .notNull(),
});

// Schema for containerComponent - used to validate API requests
const baseSchema = createSelectSchema(containerComponent);

export const insertContainerComponentSchema =
    createInsertSchema(containerComponent);
export const insertContainerComponentParams = baseSchema
    .extend({
        id: z.coerce.number(),
        containerId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updateContainerComponentSchema = baseSchema;
export const updateContainerComponentParams = baseSchema.extend({
    id: z.coerce.number(),
    containerId: z.coerce.string().min(1),
});
export const containerComponentIdSchema = baseSchema.pick({ id: true });

// Types for containerComponent - used to type API request params and within Components
export type ContainerComponent = typeof containerComponent.$inferSelect;
export type NewContainerComponent = z.infer<
    typeof insertContainerComponentSchema
>;
export type NewContainerComponentParams = z.infer<
    typeof insertContainerComponentParams
>;
export type UpdateContainerComponentParams = z.infer<
    typeof updateContainerComponentParams
>;
export type ContainerComponentId = z.infer<
    typeof containerComponentIdSchema
>["id"];

// this type infers the return from getContainerComponent() - meaning it will include any joins
export type CompleteContainerComponent = Awaited<
    ReturnType<typeof getContainerComponents>
>["containerComponent"][number];
