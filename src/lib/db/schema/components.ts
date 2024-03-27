import { sql } from "drizzle-orm";
import {
    varchar,
    int,
    timestamp,
    mysqlTable,
    json,
    tinyint,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { pageComponents } from "./pageComponents";
import { type getComponents } from "@/lib/api/components/queries";
import { componentTypes } from "./componentTypes";

import { nanoid, timestamps } from "@/lib/utils";

export const components = mysqlTable("components", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 })
        .references(() => componentTypes.id, { onDelete: "cascade" })
        .notNull(),
    props: json("props").notNull(),
    styles: json("styles").notNull(),
    hasChildren: tinyint("has_children").notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp("updated_at")
        .notNull()
        .default(sql`now()`),
});

// Schema for components - used to validate API requests
const baseSchema = createSelectSchema(components).omit(timestamps);

export const insertComponentSchema =
    createInsertSchema(components).omit(timestamps);
export const insertComponentParams = baseSchema
    .extend({
        hasChildren: z.coerce.number(),
        pageComponentId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updateComponentSchema = baseSchema;
export const updateComponentParams = baseSchema.extend({
    hasChildren: z.coerce.number(),
    pageComponentId: z.coerce.string().min(1),
});
export const componentIdSchema = baseSchema.pick({ id: true });

// Types for components - used to type API request params and within Components
export type Component = typeof components.$inferSelect;
export type NewComponent = z.infer<typeof insertComponentSchema>;
export type NewComponentParams = z.infer<typeof insertComponentParams>;
export type UpdateComponentParams = z.infer<typeof updateComponentParams>;
export type ComponentId = z.infer<typeof componentIdSchema>["id"];

// this type infers the return from getComponents() - meaning it will include any joins
export type CompleteComponent = Awaited<
    ReturnType<typeof getComponents>
>["components"][number];
