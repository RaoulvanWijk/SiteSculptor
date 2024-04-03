import { sql } from "drizzle-orm";
import { varchar, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { components } from "./components";
import { type getComponentTypes } from "@/lib/api/componentTypes/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const componentTypes = mysqlTable("component_types", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp("updated_at")
        .notNull()
        .default(sql`now()`),
});

// Schema for componentTypes - used to validate API requests
const baseSchema = createSelectSchema(componentTypes).omit(timestamps);

export const insertComponentTypeSchema =
    createInsertSchema(componentTypes).omit(timestamps);
export const insertComponentTypeParams = baseSchema
    .extend({
        componentId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updateComponentTypeSchema = baseSchema;
export const updateComponentTypeParams = baseSchema.extend({
    componentId: z.coerce.string().min(1),
});
export const componentTypeIdSchema = baseSchema.pick({ id: true });

// Types for componentTypes - used to type API request params and within Components
export type ComponentType = typeof componentTypes.$inferSelect;
export type NewComponentType = z.infer<typeof insertComponentTypeSchema>;
export type NewComponentTypeParams = z.infer<typeof insertComponentTypeParams>;
export type UpdateComponentTypeParams = z.infer<
    typeof updateComponentTypeParams
>;
export type ComponentTypeId = z.infer<typeof componentTypeIdSchema>["id"];

// this type infers the return from getComponentTypes() - meaning it will include any joins
export type CompleteComponentType = Awaited<
    ReturnType<typeof getComponentTypes>
>["componentTypes"][number];
