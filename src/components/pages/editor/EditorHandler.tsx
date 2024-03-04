"use client";

import React, { useEffect } from "react";
import Editor from "@/components/layouts/Editor";
import { useState } from "react";

import {
  DndContext,
  DragEndEvent,
  closestCorners,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useDroppable,
  useDndMonitor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import BaseDragComponent from "@/components/editor-drag-components/BaseDragComponent";
import BaseDropComponent from "@/components/editor-drag-components/BaseDropComponent";

import {
  Component,
  UsedComponent,
  EditorHandlerState,
  EditorHandlerProps,
} from "editor";

import { testComponents, testUsedComponents } from "./testComponents";
import DragOverlayWrapper from "./DragOverlayWrapper";

import useEditor from "@/components/hooks/useEditor";

export default function EditorHandler() {
  const [sideNavOpen, setSideNavOpen] = useState(true);
  const {
    componentsInEditor,
    availableComponents,
    setComponents,
    setAvailableComponents,
    addComponent,
    removeComponent,
    updateComponent,
    selectedComponent,
    setSelectedComponent,
  } = useEditor();

  useEffect(() => {
    setComponents(testUsedComponents);
    setAvailableComponents(testComponents);
  }, [setComponents, setAvailableComponents]);
  // const reorderComponents = (e: DragEndEvent) => {
  //   if (!e.over) return;

  //   setUsingComponents((usingComponents) => {
  //     const oldIdx = usingComponents.findIndex(
  //       (component) => component.id === e.active.id
  //     );
  //     const newIdx = usingComponents.findIndex(
  //       (component) => component.id === e.over!.id.toString()
  //     );
  //     return arrayMove(usingComponents, oldIdx, newIdx);
  //   });
  // };

  const renderComponents = (component: UsedComponent) => {
    return (
      <BaseDragComponent key={component.id} id={component.id}>
        {component.component.type}
        {/* if compponent has children render those */}
        {component.children && (
          <SortableContext
            items={component.children.map((child) => child.id.toString())}
          >
            <BaseDropComponent
              id={component.id}
              accepts={component.component.allowedChildren}
            >
              {component.children.map((child) => {
                return renderComponents(child);
              })}
            </BaseDropComponent>
          </SortableContext>
        )}
      </BaseDragComponent>
    );
  };

  useDndMonitor({
    onDragStart: (event) => {
      console.log("drag start");
    },
    onDragCancel: () => {
      console.log("drag cancel");
    },
    onDragEnd: (event: DragEndEvent) => {
      console.log("drag end");
      if (!event.over || !event.active) return;

      const activeId = event.active.id;
      const overId = event.over.id;
      const overIndex = event.over.data?.current?.sortable?.index;
      console.log(event.over, overIndex);

      if (event.over?.data?.current?.isMainDropArea) {
        console.log("over main drop area");

        // find component
        const activeComponent = availableComponents.find(
          (c) => c.id === activeId
        );

        if (activeComponent) {
          addComponent(activeComponent, overIndex);
        }
      } else {
        console.log("over component");
        const overComponent = componentsInEditor.find((c) => {
          if (c.id === overId) return c.id === overId;
          // check if the id mayvbe a child of another component
          // if so return the parent component
          if (c.children.find((child) => child.id === overId)) return true;

          return false;
        });
        console.log(overId, overComponent);

        if (overComponent) {
          const activeComponent = componentsInEditor.find((c) => {
            if (c.id === activeId) return c.id === activeId;
            // check if the id mayvbe a child of another component
            // if so return the parent component
            if (c.children.find((child) => child.id === overId)) return true;
            return false;
          });
          console.log(activeId, activeComponent);

          if (activeComponent) {
            console.log("over component", overComponent);
            console.log("active component", activeComponent);
            addComponent(
              availableComponents.find((c) => c.id === activeId),
              overIndex
            );
          }
        }
      }
    },
  });

  const droppable = useDroppable({
    id: "droppable",
    data: {
      isMainDropArea: true,
    },
  });

  return (
    <Editor.Layout className={sideNavOpen ? "" : "sidebar-closed"}>
      <Editor.SideNav>
        {/* List of textComponents that can be dragged into sortable context */}
        {availableComponents.map((component) => (
          <BaseDragComponent key={component.id} id={component.id}>
            {component.name}
          </BaseDragComponent>
        ))}
        {/* </DndContext> */}
      </Editor.SideNav>
      <Editor.TopNav />
      {/* <DndContext sensors={sensors}> */}
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={availableComponents}
      >
        <div ref={droppable.setNodeRef} className="drag-container">
          {componentsInEditor.map((component) => {
            return renderComponents(component);
          })}
        </div>
      </SortableContext>

      <DragOverlayWrapper />
    </Editor.Layout>
  );
}
