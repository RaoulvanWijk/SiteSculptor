import { sql } from "drizzle-orm";
import { varchar, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { sites } from "./sites";
import { type getSiteFooters } from "@/lib/api/siteFooters/queries";

import { nanoid, timestamps } from "@/lib/utils";
import { footers } from "./footers";

export const siteFooters = mysqlTable("site_footers", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    footerId: varchar("footer_id", { length: 256 })
        .references(() => footers.id, { onDelete: "cascade" })
        .notNull(),
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

// Schema for siteFooters - used to validate API requests
const baseSchema = createSelectSchema(siteFooters).omit(timestamps);

export const insertSiteFooterSchema =
    createInsertSchema(siteFooters).omit(timestamps);
export const insertSiteFooterParams = baseSchema
    .extend({
        siteId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updateSiteFooterSchema = baseSchema;
export const updateSiteFooterParams = baseSchema.extend({
    siteId: z.coerce.string().min(1),
});
export const siteFooterIdSchema = baseSchema.pick({ id: true });

// Types for siteFooters - used to type API request params and within Components
export type SiteFooter = typeof siteFooters.$inferSelect;
export type NewSiteFooter = z.infer<typeof insertSiteFooterSchema>;
export type NewSiteFooterParams = z.infer<typeof insertSiteFooterParams>;
export type UpdateSiteFooterParams = z.infer<typeof updateSiteFooterParams>;
export type SiteFooterId = z.infer<typeof siteFooterIdSchema>["id"];

// this type infers the return from getSiteFooters() - meaning it will include any joins
export type CompleteSiteFooter = Awaited<
    ReturnType<typeof getSiteFooters>
>["siteFooters"][number];
