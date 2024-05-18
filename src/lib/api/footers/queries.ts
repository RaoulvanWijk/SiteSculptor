import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type FooterId, footerIdSchema, footers } from "@/lib/db/schema/footers";

export const getFooters = async () => {
  const rows = await db.select().from(footers);
  const f = rows
  return { footers: f };
};

export const getFooterById = async (id: FooterId) => {
  const { id: footerId } = footerIdSchema.parse({ id });
  const [row] = await db.select().from(footers).where(eq(footers.id, footerId));
  if (row === undefined) return {};
  const f = row;
  return { footer: f };
};


