import { sql } from "drizzle-orm";
import { int, varchar, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "@/lib/db/schema/auth";
import { type getSites } from "@/lib/api/sites/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const sites = mysqlTable("sites", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    ownerId: varchar("user_id", { length: 191 })
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    name: varchar("name", { length: 50 }).notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp("updated_at")
        .notNull()
        .default(sql`now()`),
});

// Schema for sites - used to validate API requests
const baseSchema = createSelectSchema(sites).omit(timestamps);

export const insertSiteSchema = createInsertSchema(sites).omit(timestamps);
export const insertSiteParams = baseSchema
    .extend({
        ownerId: z.coerce.number(),
    })
    .omit({
        id: true,
        ownerId: true,
    });

export const updateSiteSchema = baseSchema;
export const updateSiteParams = baseSchema
    .extend({
        ownerId: z.coerce.number(),
    })
    .omit({
        ownerId: true,
    });
export const siteIdSchema = baseSchema.pick({ id: true });

// Types for sites - used to type API request params and within Components
export type Site = typeof sites.$inferSelect;
export type NewSite = z.infer<typeof insertSiteSchema>;
export type NewSiteParams = z.infer<typeof insertSiteParams>;
export type UpdateSiteParams = z.infer<typeof updateSiteParams>;
export type SiteId = z.infer<typeof siteIdSchema>["id"];

// this type infers the return from getSites() - meaning it will include any joins
export type CompleteSite = Awaited<
    ReturnType<typeof getSites>
>["sites"][number];
