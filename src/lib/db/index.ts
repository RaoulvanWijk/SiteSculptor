import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "@/lib/env.mjs";

import * as pageComponents from "./schema/pageComponents";
import * as pages from "./schema/pages";
import * as sites from "./schema/sites";
import * as components from "./schema/components";
import * as componentTypes from "./schema/componentTypes";
import * as footers from "./schema/footers";
import * as navbars from "./schema/navbars";
import * as siteFooters from "./schema/siteFooters";
import * as siteNavbars from "./schema/siteNavbars";
 
export const poolConnection = mysql.createPool(env.DATABASE_URL);
 
export const db = drizzle(poolConnection,
    {
        schema: {
            ...pageComponents,
            ...pages,
            ...sites,
            ...components,
            ...componentTypes,
            ...footers,
            ...navbars,
            ...siteFooters,
            ...siteNavbars,
            // Add your tables here
        },
        mode: "default",
    }
);
