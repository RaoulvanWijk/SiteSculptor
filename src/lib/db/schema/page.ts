import {
    int,
    timestamp,
    mysqlTable,
    primaryKey,
    varchar,
    // references,
} from "drizzle-orm/mysql-core";
import { users } from "./auth";

export const pages = mysqlTable("page", {
    id: int("id").primaryKey(),
    user_id: varchar("user_id", { length: 255 }).references(() => users.id, {
        onDelete: "cascade",
    }),
    title: varchar("title", { length: 30 }).notNull(),
    slug: varchar("slug", { length: 30 }).notNull(),
    page_navbar_id: int("page_navbar_id"),
    page_footer_id: int("page_footer_id"),
});
