import { sql } from "drizzle-orm";
import {
    int,
    varchar,
    timestamp,
    mysqlTable,
    json,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { pages } from "./pages";
import { type getPageComponents } from "@/lib/api/pageComponents/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const pageComponents: ReturnType<typeof mysqlTable> = mysqlTable(
    "page_components",
    {
        id: varchar("id", { length: 191 })
            .primaryKey()
            .$defaultFn(() => nanoid()),
        index: int("index").notNull(),
        props: json("props").notNull(),
        styles: json("styles").notNull(),
        pageId: varchar("page_id", { length: 256 })
            .references(() => pages.id, { onDelete: "cascade" })
            .notNull(),
        parentId: varchar("parent_id", { length: 256 }).references(
            () => pageComponents.id,
            { onDelete: "cascade" }
        ),

        createdAt: timestamp("created_at")
            .notNull()
            .default(sql`now()`),
        updatedAt: timestamp("updated_at")
            .notNull()
            .default(sql`now()`),
    }
);

// Schema for pageComponents - used to validate API requests
const baseSchema = createSelectSchema(pageComponents).omit(timestamps);

export const insertPageComponentSchema =
    createInsertSchema(pageComponents).omit(timestamps);
export const insertPageComponentParams = baseSchema
    .extend({
        index: z.coerce.number(),
        pageId: z.coerce.string().min(1),
    })
    .omit({
        id: true,
    });

export const updatePageComponentSchema = baseSchema;
export const updatePageComponentParams = baseSchema.extend({
    index: z.coerce.number(),
    pageId: z.coerce.string().min(1),
});
export const pageComponentIdSchema = baseSchema.pick({ id: true });

// Types for pageComponents - used to type API request params and within Components
export type PageComponent = typeof pageComponents.$inferSelect;
export type NewPageComponent = z.infer<typeof insertPageComponentSchema>;
export type NewPageComponentParams = z.infer<typeof insertPageComponentParams>;
export type UpdatePageComponentParams = z.infer<
    typeof updatePageComponentParams
>;
export type PageComponentId = z.infer<typeof pageComponentIdSchema>;
export type PageComponentProps = z.infer<typeof pageComponents.props>;
export type PageComponentStyles = z.infer<typeof pageComponents.styles>;
export type ParentId = z.infer<typeof pageComponents.parentId>;

// this type infers the return from getPageComponents() - meaning it will include any joins
export type CompletePageComponent = Awaited<
    ReturnType<typeof getPageComponents>
>["pageComponents"][number];
