import { sql } from "drizzle-orm";
import { varchar, timestamp, mysqlTable, json } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getFooters } from "@/lib/api/footers/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const footers = mysqlTable("footers", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    props: json("props").notNull(),
    styles: json("styles").notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp("updated_at")
        .notNull()
        .default(sql`now()`),
});

// Schema for footers - used to validate API requests
const baseSchema = createSelectSchema(footers).omit(timestamps);

export const insertFooterSchema = createInsertSchema(footers).omit(timestamps);
export const insertFooterParams = baseSchema.extend({}).omit({
    id: true,
});

export const updateFooterSchema = baseSchema;
export const updateFooterParams = baseSchema.extend({});
export const footerIdSchema = baseSchema.pick({ id: true });

// Types for footers - used to type API request params and within Components
export type Footer = typeof footers.$inferSelect;
export type NewFooter = z.infer<typeof insertFooterSchema>;
export type NewFooterParams = z.infer<typeof insertFooterParams>;
export type UpdateFooterParams = z.infer<typeof updateFooterParams>;
export type FooterId = z.infer<typeof footerIdSchema>["id"];

// this type infers the return from getFooters() - meaning it will include any joins
export type CompleteFooter = Awaited<
    ReturnType<typeof getFooters>
>["footers"][number];
