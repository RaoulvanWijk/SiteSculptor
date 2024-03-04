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
  { children, id }:
  {
    id: number | string,
    children?: React.ReactNode,
  }
) {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  return (
    <div
    className='w-fit border-2 h-fit'
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={{
      transform: CSS.Transform.toString(transform),
      transition: transition
    }}
    >
      {children}
    </div>
  )
}
