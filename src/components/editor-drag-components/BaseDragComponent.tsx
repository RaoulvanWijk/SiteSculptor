import React from 'react'
// import { useDraggable } from '@dnd-kit/core'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Component,
  UsedComponent,
  EditorHandlerState,
  EditorHandlerProps,
} from "editor";

export default function BaseDragComponent(
  { children, id, data }:
  {
    id: number | string,
    children?: React.ReactNode,
    data?: any
  }
) {

  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({ 
    id: id,
    data: { id, ...data }
   });

  return (
    <div
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={{
      transform: CSS.Transform.toString(transform),
      transition: transition
    }}
    className={isOver ? "bg-gray-200" : "bg-white"}
    >
      {children}
    </div>
  )
}
