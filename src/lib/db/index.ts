import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "@/lib/env.mjs";

import * as pageComponents from "./schema/pageComponents";
import * as pages from "./schema/pages";
 
export const poolConnection = mysql.createPool(env.DATABASE_URL);
 
export const db = drizzle(poolConnection,
    {
        schema: {
            ...pageComponents,
            ...pages,
            // Add your tables here
        },
        mode: "default",
    }
);
