import { db } from "@/lib/db/index";
import { pageContainer } from "@/lib/db/schema/pageContainer";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
    const allPageContainers = await db.select().from(pageContainer).execute();
    // show all page containers
    return new Response(JSON.stringify(allPageContainers), { status: 200 });
}

export async function POST(
    request: Request,
    pageId: number,
    containerId: number
) {
    await db.insert(pageContainer).values({
        id: "0", // Add the id property with a default value as a string
        pageId,
        containerId,
    });
    return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}

export async function PUT(
    request: Request,
    id: string,
    pageId: number,
    containerId: number
) {
    await db
        .update(pageContainer)
        .set({ id, pageId, containerId })
        .where(eq(pageContainer.id, id));
    return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
