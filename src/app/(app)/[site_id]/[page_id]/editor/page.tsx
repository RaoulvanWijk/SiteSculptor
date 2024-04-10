"use client";

import React, { use, useEffect, useState } from "react";
import EditorHandler from "@/components/pages/editor/EditorHandler";
import EditorContextProvider from "@/components/context/EditorContext";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    pointerWithin,
    rectIntersection,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { usePathname, useRouter } from "next/navigation";

const customCollisionDetection = ({ droppableContainers, ...args }: any) => {
    console.log(args.active.data.current, droppableContainers);
    if (args.active.data.current?.isComponentInEditor) {
        droppableContainers = droppableContainers.filter(
            (container: any) =>
                container.data.current?.isEditorDroppable !== true
        );
    } else {
        droppableContainers = droppableContainers.filter(
            (container: any) =>
                container.data.current?.isEditorDroppable === true ||
                container.data.current?.isSideNavDropArea === true
        );
    }

    // first check if the pointer is over an element
    const pointerCollission = pointerWithin({ ...args, droppableContainers });
    console.log(pointerCollission);
    // TODO:
    if (pointerCollission.length > 0) {
        return pointerCollission;
    }
    // console.log(droppableContainers, args);
    droppableContainers = droppableContainers.filter(
        (container: any) => !container.data.current?.isSideNavDropArea
    );

    // find the closest element
    const closestCollision = closestCenter({ ...args, droppableContainers });

    console.log(closestCollision, "closestCollision");
    return closestCollision;
};

async function getSiteData(site_id: string) {
    const response = await fetch(`/api/editor/site/${site_id}`);
    const data = await response.json();
    return data;
}

export default async function EditorPage() {
    const [site, setSite] = useState([]);

    const site_id = usePathname().split("/")[1];
    console.log(site_id, "site_id");

    useEffect(() => {
        getSiteData(site_id).then((data) => {
            console.log(data, "data");
            setSite(data);
        });
    }, []);

    console.log(site, "site");

    // get the route

    // log site data

    // get the site data from the database

    const sensors = useSensors(
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 300,
                tolerance: 5,
            },
        }),
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10, // 10px
            },
        })
    );
    return (
        // <EditorLayout>
        //   <EditorSideNav />
        //   <EditorTopNav />
        //   <ScrollArea className="pt-3 rounded-xl border bg-card text-card-foreground shadow p-4 drag-container">
        //     <div className="flex gap-4 flex-col">
        //       <NavbarOne />
        //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
        //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
        //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
        //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
        //     </div>
        //   </ScrollArea>
        // </EditorLayout>
        <DndContext
            collisionDetection={customCollisionDetection}
            sensors={sensors}
        >
            <EditorContextProvider>
                <EditorHandler />
            </EditorContextProvider>
        </DndContext>
    );
}
