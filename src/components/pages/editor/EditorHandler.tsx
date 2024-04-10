"use client";
//#region imports :2
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
  horizontalListSortingStrategy,
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
import { cn } from "@/lib/utils";
import TestDragComponent from "@/components/editor-drag-components/TestDragComponent";
import SideNav from "@/app/(app)/editor/_components/SideNav/SideNav";
import { SideNavContextProvider } from "@/components/context/SideNavContext";

//#endregion

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
  const [sComp, setSComp] = useState<any>(null);
  useEffect(() => {
    setComponents(testUsedComponents);
    setAvailableComponents(testComponents);
  }, [setComponents, setAvailableComponents]);

  const renderComponents = (components: UsedComponent[]) => {
    const len = components.length;
    let lastIndex = 0;
    return (
      <>
        {components.map((component, index) => {
          lastIndex = component.index;
          return (
            <div key={component.id}>
              <BaseDropComponent
                id={"droppable-" + component.id}
                data={{
                  isEditorDroppable: true,
                  index: component.index,
                }}
                accepts={["draggable-outside-editor"]}
              ></BaseDropComponent>
              <BaseDragComponent
                id={component.id}
                data={{
                  isComponentInEditor: true,
                  type: component.component.type,
                }}
              >
                <div
                  className={cn(
                    "w-full border-2",
                    component.component.type === "container" ? "h-48" : " h-16"
                  )}
                >
                  <p>
                    {component.id} - {component.component.name} -{" "}
                    {component.component.type}, index: {component.index}
                  </p>
                  {component.component.type === "container" && (
                    <div className="flex gap-4">
                      <SortableContext items={component.children}
                      strategy={horizontalListSortingStrategy}>
                        {component.children.map((child, index) => {
                          return (
                            <BaseDragComponent
                              key={child.id}
                              id={component.id}
                              data={{
                                isComponentInEditor: true,
                                type: component.component.type,
                              }}
                            >
                              <div className="w-1/2 border-2">
                                <p>
                                  {child.id} - {child.component.name} -{" "}
                                  {child.component.type}
                                </p>
                              </div>
                            </BaseDragComponent>
                          );
                        })}
                      </SortableContext>
                    </div>
                  )}
                </div>
              </BaseDragComponent>
            </div>
          );
        })}
        <BaseDropComponent
          id={"droppable-" + len}
          data={{
            isEditorDroppable: true,
            index: lastIndex + 1,
          }}
          // disabled={sComp?.isComponentInEditor}
          accepts={["draggable-outside-editor"]}
        ></BaseDropComponent>
      </>
    );
  };

  useDndMonitor({
    onDragStart: (event) => {
      setSComp(event.active.data.current);
    },
    onDragCancel: () => {
      console.log("drag cancel");
    },
    onDragEnd: (event: DragEndEvent) => {
      console.log("drag end");
      if (
        !event.over ||
        !event.active ||
        (!event.over.data.current?.isComponentInEditor &&
          !event.over.data.current?.isEditorDroppable)
      )
        return;
      // console.log("====================================");
      // console.log(event);
      // console.log('====================================');
      // console.log(event.active.data, event.over.data);
      // console.log('====================================');

      // // Sort the sortable components
      // console.log("====================================");
      // console.log(event.active.data.current, event.over.data.current);
      // console.log("====================================");

      // if the component is being dragged from inside the editor
      if (event.active.data?.current?.isComponentInEditor) {
        // get the old and new indexes of the components
        const oldIdx = componentsInEditor.findIndex(
          (component) => component.id === event.active.id
        );
        const newIdx = componentsInEditor.findIndex(
          (component) => component.id === event.over?.id
        );

        // TODO: Add support for dragging components into other components
        // set the new components array with the new indexes
        setComponents((prev) => {
          let newArr = arrayMove(prev, oldIdx, newIdx);
          // update all the indexes of the components in the editor
          newArr = newArr.map((component, index) => {
            component.index = index;
            return component;
          });

          return [...newArr];
        });
        return;
      }
      console.log("====================================");
      console.log(event.over.data.current?.index, event.active);
      console.log("====================================");
      // if the component is being dragged from the sidebar
      // get the component from the availableComponents array
      const component = availableComponents.find(
        (c) => c.id === event.active.id
      );

      // if the component is not found, return
      if (!component) return;

      // get the index of the component that the dragged component is being dropped into
      // const index = componentsInEditor.findIndex(
      //   (c) => c.id === event.over?.id
      // );
      const index = event.over.data.current?.index;
      console.log("====================================");
      console.log(component, index);
      console.log("====================================");
      // add the component to the components array
      addComponent(component, index);

      // setComponents(arrayMove(componentsInEditor, oldIdx, newIdx));
    },
  });

  const nav_droppable = useDroppable({
    id: "nav-droppable",
    data: {
      isSideNavDropArea: true,
    },
  });

  return (
    <Editor.Layout className={sideNavOpen ? "" : "sidebar-closed"}>
      <Editor.SideNav>
        <div
          ref={nav_droppable.setNodeRef}
          className={nav_droppable.isOver ? "border border-red-500 w-full" : ""}
        >
          <SideNav />
        </div>
      </Editor.SideNav>
      <Editor.TopNav />
      {/* <DndContext sensors={sensors}> */}
      <div className={cn("drag-container p-4 flex flex-col")}>
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={componentsInEditor}
        >
          {renderComponents(componentsInEditor)}
        </SortableContext>
        <DragOverlayWrapper />
      </div>
    </Editor.Layout>
  );
}
