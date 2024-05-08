import { sql } from "drizzle-orm";
import { varchar, timestamp, mysqlTable, json } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getNavbars } from "@/lib/api/navbars/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const navbars = mysqlTable("navbars", {
    id: varchar("id", { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 120 }).notNull(),
    props: json("props").notNull(),
    styles: json("styles").notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp("updated_at")
        .notNull()
        .default(sql`now()`),
});

// Schema for navbars - used to validate API requests
const baseSchema = createSelectSchema(navbars).omit(timestamps);

export const insertNavbarSchema = createInsertSchema(navbars).omit(timestamps);
export const insertNavbarParams = baseSchema.extend({}).omit({
    id: true,
});

export const updateNavbarSchema = baseSchema;
export const updateNavbarParams = baseSchema.extend({});
export const navbarIdSchema = baseSchema.pick({ id: true });

// Types for navbars - used to type API request params and within Components
export type Navbar = typeof navbars.$inferSelect;
export type NewNavbar = z.infer<typeof insertNavbarSchema>;
export type NewNavbarParams = z.infer<typeof insertNavbarParams>;
export type UpdateNavbarParams = z.infer<typeof updateNavbarParams>;
export type NavbarId = z.infer<typeof navbarIdSchema>["id"];

// this type infers the return from getNavbars() - meaning it will include any joins
export type CompleteNavbar = Awaited<
    ReturnType<typeof getNavbars>
>["navbars"][number];
