import React from 'react'
// import { useDraggable } from '@dnd-kit/core'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function BaseDragComponent(
  { children, component }: {
    component: {
      id: string,
      type: string,
      name: string,
    },
    children?: React.ReactNode,
  }
) {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.id });



  return (
    <div
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={{
      transform: CSS.Transform.toString(transform),
      transition: transition
    }}
    >
      {children}
      {/* {component.name} */}
    </div>
  )
}
