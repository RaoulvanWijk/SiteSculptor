import type { Config } from "drizzle-kit";
import { env } from "@/lib/env.mjs";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/lib/db/schema",
    out: "./src/lib/db/migrations",
    dialect: "mysql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
});
