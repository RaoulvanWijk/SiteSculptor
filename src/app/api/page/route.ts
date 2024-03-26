import { db } from "@/lib/db/index";
import { pages } from "@/lib/db/schema/page";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
    const allPages = await db.select().from(pages).execute();
    // show all pages
    return new Response(JSON.stringify(allPages), { status: 200 });
}

export async function PUT(
    request: Request,
    id: number,
    slug: string,
    title: string,
    user_id: string,
    page_navbar_id: number,
    page_footer_id: number
) {
    await db
        .update(pages)
        .set({ id, slug, title, user_id, page_navbar_id, page_footer_id })
        .where(eq(pages.id, id));
    return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
