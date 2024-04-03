import { sql } from "drizzle-orm";
import { varchar, int, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { sites } from "./sites";
import { type getPages } from "@/lib/api/pages/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const pages = mysqlTable("pages", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    title: varchar("title", { length: 30 }).notNull(),
    slug: varchar("slug", { length: 30 }).notNull(),
    navbarId: int("navbar_id").notNull(),
    footerId: int("footer_id").notNull(),
    siteId: varchar("site_id", { length: 256 })
        .references(() => sites.id, { onDelete: "cascade" })
        .notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp("updated_at")
        .notNull()
        .default(sql`now()`),
});

// Schema for pages - used to validate API requests
const baseSchema = createSelectSchema(pages).omit(timestamps);

export const insertPageSchema = createInsertSchema(pages).omit(timestamps);
export const insertPageParams = baseSchema
    .extend({
        navbarId: z.coerce.number(),
        footerId: z.coerce.number(),
        siteId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updatePageSchema = baseSchema;
export const updatePageParams = baseSchema.extend({
    navbarId: z.coerce.number(),
    footerId: z.coerce.number(),
    siteId: z.coerce.string().min(1),
});
export const pageIdSchema = baseSchema.pick({ id: true });

// Types for pages - used to type API request params and within Components
export type Page = typeof pages.$inferSelect;
export type NewPage = z.infer<typeof insertPageSchema>;
export type NewPageParams = z.infer<typeof insertPageParams>;
export type UpdatePageParams = z.infer<typeof updatePageParams>;
export type PageId = z.infer<typeof pageIdSchema>["id"];

// this type infers the return from getPages() - meaning it will include any joins
export type CompletePage = Awaited<
    ReturnType<typeof getPages>
>["pages"][number];
