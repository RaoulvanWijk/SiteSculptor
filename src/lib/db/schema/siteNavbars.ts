import { sql } from "drizzle-orm";
import { varchar, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { sites } from "./sites";
import { type getSiteNavbars } from "@/lib/api/siteNavbars/queries";
import { navbars } from "@/lib/db/schema/navbars";

import { nanoid, timestamps } from "@/lib/utils";

export const siteNavbars = mysqlTable("site_navbars", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    navbarId: varchar("navbar_id", { length: 256 })
        .references(() => navbars.id, { onDelete: "cascade" })
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

// Schema for siteNavbars - used to validate API requests
const baseSchema = createSelectSchema(siteNavbars).omit(timestamps);

export const insertSiteNavbarSchema =
    createInsertSchema(siteNavbars).omit(timestamps);
export const insertSiteNavbarParams = baseSchema
    .extend({
        siteId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updateSiteNavbarSchema = baseSchema;
export const updateSiteNavbarParams = baseSchema.extend({
    siteId: z.coerce.string().min(1),
});
export const siteNavbarIdSchema = baseSchema.pick({ id: true });

// Types for siteNavbars - used to type API request params and within Components
export type SiteNavbar = typeof siteNavbars.$inferSelect;
export type NewSiteNavbar = z.infer<typeof insertSiteNavbarSchema>;
export type NewSiteNavbarParams = z.infer<typeof insertSiteNavbarParams>;
export type UpdateSiteNavbarParams = z.infer<typeof updateSiteNavbarParams>;
export type SiteNavbarId = z.infer<typeof siteNavbarIdSchema>["id"];

// this type infers the return from getSiteNavbars() - meaning it will include any joins
export type CompleteSiteNavbar = Awaited<
    ReturnType<typeof getSiteNavbars>
>["siteNavbars"][number];
