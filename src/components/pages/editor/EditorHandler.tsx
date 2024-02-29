"use strict";
"use client";

import React from "react";
import Editor from "@/components/layouts/Editor";
import { useState } from "react";

import { DndContext } from "@dnd-kit/core";

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

  const demoComponent: DragComponent = {
    id: "1",
    name: "Container",
    icon: "box",
    type: "container",
    childTypes: ["text", "image"],
  };

  return (
    <Editor.Layout className={sideNavOpen ? "" : "sidebar-closed"}>
      <DndContext onDragEnd={handleDragEnd}>
        <Editor.SideNav />
        <Editor.TopNav />
        <div className="drag-container">
          <div className="flex flex-col">
            {/* <div className="flex flex-col"> */}
              <BaseDragComponent component={demoComponent}  />
            {/* </div> */}
            {/* <div className="flex flex-col"> */}
              <BaseDropComponent accepts={["container"]} />
            {/* </div> */}
          </div>
        </div>
      </DndContext>
    </Editor.Layout>
  );
}

function handleDragEnd(event: any) {
  const {active, over} = event;

  if (over && over.data.current.accepts.includes(active.data.current.type)) {
    console.log('Dropped', active.data.current.type, 'on', over.data.current.accepts);

    
  }
}
