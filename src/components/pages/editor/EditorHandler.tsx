"use strict";
"use client";

import React from "react";
import Editor from "@/components/layouts/Editor";
import { useState } from "react";

import { DndContext, DragEndEvent, closestCorners, useSensors, useSensor, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import BaseDragComponent from "@/components/editor-drag-components/BaseDragComponent";
import BaseDropComponent from "@/components/editor-drag-components/BaseDropComponent";

type DragComponent = {
  id: string;
  name: string;
  icon: string;
  type: string;
  childTypes?: string[];
  children?: DragComponent[];
};

type SelectedComponent = DragComponent & {
  parent?: string;
  children?: SelectedComponent[];
  props?: {
    [key: string]: string | string[];
  };
  styles?: {
    [key: string]: string | string[];
  };
  order?: number;
};

type EditorHandlerProps = {
  availableComponents: {
    [type: string]: DragComponent[];
  };
  selectedComponents: SelectedComponent[];
};

export default function EditorHandler() {
  const [sideNavOpen, setSideNavOpen] = useState(true);
  const [usingComponents, setUsingComponents] = useState<DragComponent[]>([{
    id: "1",
    name: "Container",
    icon: "box",
    type: "container",
    childTypes: ["text", "image"],
  },
  {
    id: "2",
    name: "Text",
    icon: "text",
    type: "text",
  },
  {
    id: "3",
    name: "Image",
    icon: "image",
    type: "image",
  },
  ]);

  const sensors = useSensors(
    useSensor(TouchSensor), useSensor(MouseSensor)
  );


  const reorderComponents = (e: DragEndEvent) => {
    if (!e.over) return;

    setUsingComponents((usingComponents) => {
      const oldIdx = usingComponents.findIndex((component) => component.id === e.active.id);
      const newIdx = usingComponents.findIndex((component) => component.id === e.over!.id.toString());
      return arrayMove(usingComponents, oldIdx, newIdx);
    });
  }

  return (
    <Editor.Layout className={sideNavOpen ? "" : "sidebar-closed"}>
      <DndContext onDragEnd={reorderComponents} collisionDetection={closestCorners} sensors={sensors}>
        <Editor.SideNav>
          <div>

          </div>
        </Editor.SideNav>
        <Editor.TopNav />
        <SortableContext items={usingComponents}>
          <div className="drag-container">
            <div className="flex flex-col m-8 gap-8">
              {usingComponents.map((component) => (
                <BaseDragComponent key={component.id} component={component}>
                  <div className="flex border border-dashed p-16">
                    {component.name}
                  </div>
                </BaseDragComponent>
              ))}
            </div>
          </div>
        </SortableContext>

      </DndContext>
    </Editor.Layout>
  );
}