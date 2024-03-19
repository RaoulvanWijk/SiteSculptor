"use client";

import React, { use, useEffect, useState } from "react";
import EditorHandler from "@/components/pages/editor/EditorHandler";
import EditorContextProvider from "@/components/context/EditorContext";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export default function EditorPage() {
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
    <DndContext collisionDetection={closestCorners} sensors={sensors}>
      <EditorContextProvider>
        <EditorHandler />
      </EditorContextProvider>
    </DndContext>
  );
}
