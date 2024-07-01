import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { componentTypes } from "@/lib/db/schema/componentTypes";
import { components } from "@/lib/db/schema/components";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // get all component types and their components
        const allComponents = await db.select().from(componentTypes).leftJoin(components, eq(componentTypes.id, components.type)).execute();

        // format the data so its easier to use for the frontend
        const formattedComponents = allComponents.map((component:any) => {
            return {
                id: component.component_types.id,
                name: component.component_types.name,
                components: component.components ? [{
                    id: component.components.id,
                    name: component.components.name,
                    props: component.components.props,
                    styles: component.components.styles,
                    hasChildren: component.components.hasChildren,
                    type: component.component_types.name,
                }] : null
            }
        });

        return new NextResponse(JSON.stringify(formattedComponents), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Invalid JSON" }), {
            status: 400,
        });
    }
}
