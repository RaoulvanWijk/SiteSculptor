import { sql } from "drizzle-orm";
import { int, varchar, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { components } from "./components";
import { type getComponentAllowedChildrenTypes } from "@/lib/api/componentAllowedChildrenTypes/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const componentAllowedChildrenTypes = mysqlTable(
    "component_allowed_children_types",
    {
        id: varchar("id", { length: 191 })
            .primaryKey()
            .$defaultFn(() => nanoid()),
        componentTypesId: int("component_types_id"),
        componentId: varchar("component_id", { length: 256 })
            .references(() => components.id, { onDelete: "cascade" })
            .notNull(),

        createdAt: timestamp("created_at")
            .notNull()
            .default(sql`now()`),
        updatedAt: timestamp("updated_at")
            .notNull()
            .default(sql`now()`),
    }
);

// Schema for componentAllowedChildrenTypes - used to validate API requests
const baseSchema = createSelectSchema(componentAllowedChildrenTypes).omit(
    timestamps
);

export const insertComponentAllowedChildrenTypeSchema = createInsertSchema(
    componentAllowedChildrenTypes
).omit(timestamps);
export const insertComponentAllowedChildrenTypeParams = baseSchema
    .extend({
        componentTypesId: z.coerce.number(),
        componentId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updateComponentAllowedChildrenTypeSchema = baseSchema;
export const updateComponentAllowedChildrenTypeParams = baseSchema.extend({
    componentTypesId: z.coerce.number(),
    componentId: z.coerce.string().min(1),
});
export const componentAllowedChildrenTypeIdSchema = baseSchema.pick({
    id: true,
});

// Types for componentAllowedChildrenTypes - used to type API request params and within Components
export type ComponentAllowedChildrenType =
    typeof componentAllowedChildrenTypes.$inferSelect;
export type NewComponentAllowedChildrenType = z.infer<
    typeof insertComponentAllowedChildrenTypeSchema
>;
export type NewComponentAllowedChildrenTypeParams = z.infer<
    typeof insertComponentAllowedChildrenTypeParams
>;
export type UpdateComponentAllowedChildrenTypeParams = z.infer<
    typeof updateComponentAllowedChildrenTypeParams
>;
export type ComponentAllowedChildrenTypeId = z.infer<
    typeof componentAllowedChildrenTypeIdSchema
>["id"];

// this type infers the return from getComponentAllowedChildrenTypes() - meaning it will include any joins
export type CompleteComponentAllowedChildrenType = Awaited<
    ReturnType<typeof getComponentAllowedChildrenTypes>
>["componentAllowedChildrenTypes"][number];
