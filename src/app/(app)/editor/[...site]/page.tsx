"use client";

import React from "react";
import EditorHandler from "@/components/pages/editor/EditorHandler";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  pointerWithin,
  rectIntersection,
  closestCenter,
  useSensor,
  useSensors,
  CollisionDetection,
  DroppableContainer,
  Active,
} from "@dnd-kit/core";
import { RectMap } from "@dnd-kit/core/dist/store";
import { Coordinates } from "@dnd-kit/utilities";

const allowedTypesInEditor = ["container", "carousel", "form"];
const allowedTypesInContainer = ["card", "image", "text", "button"];

import { testUsedComponents } from "@/components/pages/editor/testComponents";
import { NestedComponent } from "editor";
import useEditor from "@/components/hooks/useEditor";



export default function EditorPage() {
  const { componentsInEditor } = useEditor();

  const customCollisionDetection = ({
    droppableContainers,
    ...args
  }: {
    active: Active;
    collisionRect: ClientRect;
    droppableRects: RectMap;
    droppableContainers: DroppableContainer[];
    pointerCoordinates: Coordinates | null;
  }) => {
    const active = args.active.data.current;
    if (!active) return undefined;
  
    const navarea = droppableContainers.filter((container: any) =>
      ["sideNav"].includes(container.data.current?.dropArea)
    );
    const navCollision = pointerWithin({ ...args, droppableContainers: navarea });
    if (navCollision.length > 0) {
      return navCollision;
    }
  
    /**
     * If a component is being dragged from within the editor
     * only allow it to be dropped in the editor and its allowed containers
     * or the sideNav to remove it
     */
    if (active.isComponentInEditor) {
      if (allowedTypesInEditor.includes(active.type)) {
        droppableContainers = droppableContainers.filter((container: any) =>
          ["container", "sideNav"].includes(container.data.current?.dropArea)
        );
      }
  
      // the component is of a type that is allowed in a container
      if (allowedTypesInContainer.includes(active.type)) {
        // check if the collision is inside the parent container
        const containers = droppableContainers.filter((container: any) =>
          ["container"].includes(container.data.current?.dropArea)
        );
  
        // this should always be one if the collision is within the parent container
        const containerCollision = pointerWithin({
          ...args,
          droppableContainers: containers,
        });
  
        // if there are no collisions with a container return an empty array
        if (containerCollision.length <= 0) {
          return [];
        }
  
        // get the children of the container
        let children = componentsInEditor.find(
          (component) =>
            component.id ===
            containerCollision[0].data?.droppableContainer?.data?.current?.id
        )?.children;
  
        // if the container has no children return the container collision
        if (!children || children.length <= 0) {
          return containerCollision;
        }
  
        // TODO make it better for dragging into other container
        // check if the parent of the active component is the same as the parent of the container
        // if(containerCollision[0].data?.droppableContainer?.data?.current?.id === active.parent) {
        droppableContainers = droppableContainers.filter(
          (container: any) =>
            ["container-item"].includes(container.data.current?.dropArea) &&
            children.find(
              (child: NestedComponent) => child.id === container.data.current?.id
            )
        );
        // }
      }
    } else {
      if (allowedTypesInEditor.includes(active.type)) {
        droppableContainers = droppableContainers.filter((container: any) =>
          ["editor", "sideNav"].includes(container.data.current?.dropArea)
        );
      }
  
      if (allowedTypesInContainer.includes(active.type)) {
        if (allowedTypesInContainer.includes(active.type)) {
          // check if the collision is inside the parent container
          const containers = droppableContainers.filter((container: any) =>
            ["container"].includes(container.data.current?.dropArea)
          );
  
          // this should always be one if the collision is within the parent container
          const containerCollision = pointerWithin({
            ...args,
            droppableContainers: containers,
          });
  
          // if there are no collisions with a container return an empty array
          if (containerCollision.length <= 0) {
            return [];
          }
  
          // get the children of the container
          let children = componentsInEditor.find(
            (component) =>
              component.id ===
              containerCollision[0].data?.droppableContainer?.data?.current?.id
          )?.children;
  
          // if the container has no children return the container collision
          if (!children || children.length <= 0) {
            return containerCollision;
          }
          droppableContainers = droppableContainers.filter(
            (container: any) =>
              ["container-item"].includes(container.data.current?.dropArea) &&
              children.find(
                (child: NestedComponent) => child.id === container.data.current?.id
              )
          );
        }
      }
    }
  
    // first check if the pointer is over an element
    const pointerCollission = pointerWithin({ ...args, droppableContainers });
  
    if (pointerCollission.length > 0) {
      return pointerCollission;
    }
    droppableContainers = droppableContainers.filter(
      (container: any) => !container.data.current?.isSideNavDropArea
    );
  
    // find the closest element
    const closestCollision = closestCenter({ ...args, droppableContainers });
  
    return closestCollision;
  };

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
      collisionDetection={customCollisionDetection as CollisionDetection}
      sensors={sensors}
    >
      <EditorHandler />
    </DndContext>
  );
}
