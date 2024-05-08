import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type NavbarId, navbarIdSchema, navbars } from "@/lib/db/schema/navbars";

export const getNavbars = async () => {
  const rows = await db.select().from(navbars);
  const n = rows
  return { navbars: n };
};

export const getNavbarById = async (id: NavbarId) => {
  const { id: navbarId } = navbarIdSchema.parse({ id });
  const [row] = await db.select().from(navbars).where(eq(navbars.id, navbarId));
  if (row === undefined) return {};
  const n = row;
  return { navbar: n };
};


